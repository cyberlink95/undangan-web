import React, { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import NewspaperTheme from '../components/themes/NewspaperTheme';
import EnvelopeTheme from '../components/themes/EnvelopeTheme';
import StandardTheme from '../components/themes/StandardTheme';

const Invitation = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const guestName = searchParams.get('to') || 'Tamu Undangan';

  const [invData, setInvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const [feed, setFeed] = useState([]);
  const [rsvpForm, setRsvpForm] = useState({ nama: guestName !== 'Tamu Undangan' ? guestName : '', hadir: 'Hadir', pesan: '' });
  const [rsvpStatus, setRsvpStatus] = useState(null);

  const [envStage, setEnvStage] = useState('closed');

  useEffect(() => {
    const fetchInv = async () => {
      const data = await api.getUndanganDetail(slug);
      setInvData(data);
      if (data) {
        const rsvps = await api.getRSVP(slug);
        setFeed(rsvps);
      }
      setLoading(false);
    };
    fetchInv();
  }, [slug]);

  // Memastikan musik tetap menyala setelah transisi (karena elemen audio bisa ter-remount saat rendering kondisional)
  useEffect(() => {
    if (isPlaying && opened && audioRef.current) {
      audioRef.current.play().catch((e) => {
        console.warn('Audio play failed:', e);
        setIsPlaying(false);
      });
    }
  }, [opened, isPlaying]);

  const handleOpen = () => {
    setOpened(true);
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  };

  const handleEnvelopeOpen = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
    setEnvStage('opening');
    setTimeout(() => {
      setOpened(true);
    }, 2000);
  };

  const handleRSVP = async (e) => {
    e.preventDefault();
    setRsvpStatus('loading');
    await api.submitRSVP({
      undangan_slug: invData.slug,
      ...rsvpForm
    });
    setRsvpStatus('success');
    const updated = await api.getRSVP(slug);
    setFeed(updated);
    setRsvpForm({ ...rsvpForm, pesan: '' });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-stone-900 text-white">Menyiapkan Undangan...</div>;
  if (!invData) return <div className="min-h-screen flex items-center justify-center bg-stone-900 text-red-500">Undangan tidak ditemukan</div>;

  const isNewspaper = invData.tema === 'newspaper';
  const isEnvelope = invData.tema === 'amplop';

  const commonProps = {
    invData,
    guestName,
    feed,
    rsvpForm,
    setRsvpForm,
    handleRSVP,
    rsvpStatus,
    isPlaying,
    toggleAudio,
    opened
  };

  return (
    <>
      <audio ref={audioRef} src={invData.musik} loop />
      
      {isNewspaper && opened ? (
        <NewspaperTheme {...commonProps} />
      ) : isEnvelope ? (
        <EnvelopeTheme
          {...commonProps}
          envStage={envStage}
          handleEnvelopeOpen={handleEnvelopeOpen}
        />
      ) : (
        <StandardTheme
          {...commonProps}
          handleOpen={handleOpen}
        />
      )}
    </>
  );
};

export default Invitation;
