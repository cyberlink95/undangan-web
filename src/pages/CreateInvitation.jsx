import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api';
import { Save, ArrowLeft } from 'lucide-react';

const Section = ({ title, children }) => (
  <div className="bg-white shadow-sm border border-slate-100 rounded-xl p-6 sm:p-8 mb-6">
    <h2 className="text-xl font-bold text-slate-800 mb-6 pb-2 border-b border-slate-100">{title}</h2>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const CreateInvitation = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    pria_nama_lengkap: '', pria_nama_panggilan: '', pria_ortu: '', pria_foto: '',
    wanita_nama_lengkap: '', wanita_nama_panggilan: '', wanita_ortu: '', wanita_foto: '',
    akad_tanggal: '', akad_jam: '', akad_lokasi: '', akad_alamat: '',
    resepsi_tanggal: '', resepsi_jam: '', resepsi_lokasi: '', resepsi_alamat: '',
    maps_embed: '', maps_url: '',
    cover: '', video: '', galeri: '',
    cerita_tahun_1: '', cerita_judul_1: '', cerita_deskripsi_1: '',
    cerita_tahun_2: '', cerita_judul_2: '', cerita_deskripsi_2: '',
    cerita_tahun_3: '', cerita_judul_3: '', cerita_deskripsi_3: '',
    cerita_tahun_4: '', cerita_judul_4: '', cerita_deskripsi_4: '',
    bank_1_nama: '', bank_1_rek: '', bank_1_an: '',
    bank_2_nama: '', bank_2_rek: '', bank_2_an: '',
    tema: 'elegant', musik: '', galeri_style: 'cards'
  });

  useEffect(() => {
    if (slug) {
      setIsEditMode(true);
      const fetchUndanganData = async () => {
        setLoading(true);
        try {
          const data = await api.getUndanganDetail(slug);
          if (data) {
            setFormData({
              pria_nama_lengkap: data.pria?.nama_lengkap || '', 
              pria_nama_panggilan: data.pria?.nama_panggilan || '', 
              pria_ortu: data.pria?.ortu || '', 
              pria_foto: data.pria?.foto || '',
              wanita_nama_lengkap: data.wanita?.nama_lengkap || '', 
              wanita_nama_panggilan: data.wanita?.nama_panggilan || '', 
              wanita_ortu: data.wanita?.ortu || '', 
              wanita_foto: data.wanita?.foto || '',
              akad_tanggal: data.acara?.akad?.tanggal || '', 
              akad_jam: data.acara?.akad?.jam || '', 
              akad_lokasi: data.acara?.akad?.lokasi || '', 
              akad_alamat: data.acara?.akad?.alamat || '',
              resepsi_tanggal: data.acara?.resepsi?.tanggal || '', 
              resepsi_jam: data.acara?.resepsi?.jam || '', 
              resepsi_lokasi: data.acara?.resepsi?.lokasi || '', 
              resepsi_alamat: data.acara?.resepsi?.alamat || '',
              maps_embed: data.maps_embed || '', 
              maps_url: data.maps_url || '',
              cover: data.cover || '', 
              video: data.video || '', 
              galeri: data.galeri ? data.galeri.join(', ') : '',
              cerita_tahun_1: data.cerita?.[0]?.tahun || '', 
              cerita_judul_1: data.cerita?.[0]?.judul || '', 
              cerita_deskripsi_1: data.cerita?.[0]?.deskripsi || '',
              cerita_tahun_2: data.cerita?.[1]?.tahun || '', 
              cerita_judul_2: data.cerita?.[1]?.judul || '', 
              cerita_deskripsi_2: data.cerita?.[1]?.deskripsi || '',
              cerita_tahun_3: data.cerita?.[2]?.tahun || '', 
              cerita_judul_3: data.cerita?.[2]?.judul || '', 
              cerita_deskripsi_3: data.cerita?.[2]?.deskripsi || '',
              cerita_tahun_4: data.cerita?.[3]?.tahun || '', 
              cerita_judul_4: data.cerita?.[3]?.judul || '', 
              cerita_deskripsi_4: data.cerita?.[3]?.deskripsi || '',
              bank_1_nama: data.hadiah?.[0]?.nama_bank || '', 
              bank_1_rek: data.hadiah?.[0]?.no_rek || '', 
              bank_1_an: data.hadiah?.[0]?.atas_nama || '',
              bank_2_nama: data.hadiah?.[1]?.nama_bank || '', 
              bank_2_rek: data.hadiah?.[1]?.no_rek || '', 
              bank_2_an: data.hadiah?.[1]?.atas_nama || '',
              tema: data.tema || 'elegant', 
              musik: data.musik || '',
              galeri_style: data.galeri_style || 'cards'
            });
          }
        } catch (error) {
          console.error("Failed to load invitation data", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUndanganData();
    }
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Helper to extract URL and fix Google Drive links
    const extractUrl = (val) => {
      if (!val) return '';
      let url = val.trim();
      
      // 1. Extract from iframe/HTML if present
      const match = url.match(/(?:src|href)\s*=\s*["']([^"']+)["']/i);
      if (match) url = match[1];

      // 2. Fix Google Drive Links (Convert to direct image link)
      const gdMatch = url.match(/(?:drive\.google\.com\/(?:file\/d\/|open\?id=))([a-zA-Z0-9_-]{25,})/);
      if (gdMatch && gdMatch[1]) {
        return `https://lh3.googleusercontent.com/d/${gdMatch[1]}`;
      }

      return url;
    };
    
    // Transform flat form data to nested API schema
    const submissionData = {
      pria: {
        nama_lengkap: formData.pria_nama_lengkap,
        nama_panggilan: formData.pria_nama_panggilan || 'Pria',
        ortu: formData.pria_ortu,
        foto: extractUrl(formData.pria_foto) || 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=400&fit=crop'
      },
      wanita: {
        nama_lengkap: formData.wanita_nama_lengkap,
        nama_panggilan: formData.wanita_nama_panggilan || 'Wanita',
        ortu: formData.wanita_ortu,
        foto: extractUrl(formData.wanita_foto) || 'https://images.unsplash.com/photo-1621217646633-89689531edbb?q=80&w=400&fit=crop'
      },
      acara: {
        akad: {
          tanggal: formData.akad_tanggal,
          jam: formData.akad_jam,
          lokasi: formData.akad_lokasi,
          alamat: formData.akad_alamat
        },
        resepsi: {
          tanggal: formData.resepsi_tanggal,
          jam: formData.resepsi_jam,
          lokasi: formData.resepsi_lokasi,
          alamat: formData.resepsi_alamat
        }
      },
      maps_embed: extractUrl(formData.maps_embed),
      maps_url: extractUrl(formData.maps_url),
      cover: extractUrl(formData.cover) || 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&fit=crop',
      video: extractUrl(formData.video),
      galeri: formData.galeri.split(',').map(s => extractUrl(s.trim())).filter(Boolean),
      cerita: [
        { tahun: formData.cerita_tahun_1, judul: formData.cerita_judul_1, deskripsi: formData.cerita_deskripsi_1 },
        { tahun: formData.cerita_tahun_2, judul: formData.cerita_judul_2, deskripsi: formData.cerita_deskripsi_2 },
        { tahun: formData.cerita_tahun_3, judul: formData.cerita_judul_3, deskripsi: formData.cerita_deskripsi_3 },
        { tahun: formData.cerita_tahun_4, judul: formData.cerita_judul_4, deskripsi: formData.cerita_deskripsi_4 }
      ].filter(c => c.tahun),
      hadiah: [
        { nama_bank: formData.bank_1_nama, no_rek: formData.bank_1_rek, atas_nama: formData.bank_1_an },
        { nama_bank: formData.bank_2_nama, no_rek: formData.bank_2_rek, atas_nama: formData.bank_2_an }
      ].filter(h => h.nama_bank),
      tema: formData.tema,
      musik: formData.musik || 'https://dl.espressomedia.com/sample_music.mp3',
      galeri_style: formData.galeri_style || 'cards'
    };

    try {
      if (!submissionData.galeri.length) {
        submissionData.galeri = [
          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&fit=crop',
          'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&fit=crop'
        ];
      }
      if (isEditMode) {
        await api.updateUndangan(slug, submissionData);
      } else {
        await api.createUndangan(submissionData);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-slate-800">{isEditMode ? 'Edit Undangan' : 'Buat Undangan Pro'}</h1>
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-4 py-2 rounded-lg transition-colors">
            <ArrowLeft size={18} /> Kembali
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Section 1: Mempelai */}
          <Section title="Data Mempelai Pria">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                <input required name="pria_nama_lengkap" value={formData.pria_nama_lengkap} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Panggilan</label>
                <input required name="pria_nama_panggilan" value={formData.pria_nama_panggilan} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Orang Tua</label>
                <input required name="pria_ortu" value={formData.pria_ortu} placeholder="Putra dari Bapak X & Ibu Y" onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">URL Foto Profil</label>
                <input type="url" name="pria_foto" value={formData.pria_foto} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-teal-500" />
              </div>
            </div>
          </Section>

          <Section title="Data Mempelai Wanita">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                <input required name="wanita_nama_lengkap" value={formData.wanita_nama_lengkap} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Panggilan</label>
                <input required name="wanita_nama_panggilan" value={formData.wanita_nama_panggilan} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Orang Tua</label>
                <input required name="wanita_ortu" value={formData.wanita_ortu} placeholder="Putri dari Bapak A & Ibu B" onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">URL Foto Profil</label>
                <input type="url" name="wanita_foto" value={formData.wanita_foto} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-teal-500" />
              </div>
            </div>
          </Section>

          {/* Section 2: Acara */}
          <Section title="Rangkaian Acara">
            <h3 className="font-semibold text-teal-700 mb-2 mt-4">Akad Nikah</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required type="date" name="akad_tanggal" value={formData.akad_tanggal} onChange={handleChange} className="px-4 py-2 rounded-lg border border-slate-200" />
              <input required placeholder="Jam (Misal: 08:00 - 10:00)" name="akad_jam" value={formData.akad_jam} onChange={handleChange} className="px-4 py-2 rounded-lg border border-slate-200" />
              <input required placeholder="Lokasi (Nama Tempat)" name="akad_lokasi" value={formData.akad_lokasi} onChange={handleChange} className="px-4 py-2 rounded-lg border border-slate-200" />
              <input required placeholder="Alamat Detail" name="akad_alamat" value={formData.akad_alamat} onChange={handleChange} className="px-4 py-2 rounded-lg border border-slate-200" />
            </div>

            <h3 className="font-semibold text-teal-700 mb-2 mt-6">Resepsi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required type="date" name="resepsi_tanggal" value={formData.resepsi_tanggal} onChange={handleChange} className="px-4 py-2 rounded-lg border border-slate-200" />
              <input required placeholder="Jam (Misal: 11:00 - Selesai)" name="resepsi_jam" value={formData.resepsi_jam} onChange={handleChange} className="px-4 py-2 rounded-lg border border-slate-200" />
              <input required placeholder="Lokasi (Nama Tempat)" name="resepsi_lokasi" value={formData.resepsi_lokasi} onChange={handleChange} className="px-4 py-2 rounded-lg border border-slate-200" />
              <input required placeholder="Alamat Detail" name="resepsi_alamat" value={formData.resepsi_alamat} onChange={handleChange} className="px-4 py-2 rounded-lg border border-slate-200" />
            </div>

            <h3 className="font-semibold text-teal-700 mb-2 mt-6">Peta Lokasi (Google Maps)</h3>
            <div className="grid grid-cols-1 gap-4">
              <input required placeholder="URL Embed Iframe (src)" name="maps_embed" value={formData.maps_embed} onChange={handleChange} className="px-4 py-2 rounded-lg border border-slate-200 w-full" />
              <input required placeholder="URL Link Buka Maps" name="maps_url" value={formData.maps_url} onChange={handleChange} className="px-4 py-2 rounded-lg border border-slate-200 w-full" />
            </div>
          </Section>

          {/* Section 3: Media & Pengaturan */}
          <Section title="Media & Pengaturan (Theme & Music)">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tema Undangan</label>
                <select name="tema" value={formData.tema} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200">
                  <option value="elegant">Elegant (Gold & Black)</option>
                  <option value="minimal">Minimal (Clean White)</option>
                  <option value="floral">Floral (Botanical)</option>
                  <option value="modern">Modern (Dark Mode)</option>
                  <option value="newspaper">Newspaper (Aged & Classic)</option>
                  <option value="amplop">Amplop (Vintage Mailing)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Style Penampil Galeri</label>
                <select name="galeri_style" value={formData.galeri_style} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200">
                  <option value="cards">Cards (Tumpukan Kartu)</option>
                  <option value="slide">Slide (Geser Standar)</option>
                  <option value="fade">Fade (Memudar Halus)</option>
                  <option value="grid">Masonry (Estetik Minimalis)</option>
                </select>
              </div>
              <input placeholder="URL Foto Cover Utama" name="cover" value={formData.cover} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200" />
              <input placeholder="URL Musik MP3 (Pastikan berakhiran .mp3)" name="musik" value={formData.musik} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200" />
              <input placeholder="URL Embed Video (YouTube)" name="video" value={formData.video} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200" />
              <textarea placeholder="URL Foto Galeri (Pisahkan dengan koma)" name="galeri" value={formData.galeri} onChange={handleChange} rows="2" className="w-full px-4 py-2 rounded-lg border border-slate-200"></textarea>
            </div>
          </Section>

          {/* Section 4: Hadiah & Cerita */}
          <Section title="Hadiah & Kisah Cinta (Opsional)">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-bold text-slate-600 mb-2">Rekening 1</h3>
                <input placeholder="Nama Bank / E-Wallet" name="bank_1_nama" value={formData.bank_1_nama} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 mb-2" />
                <input placeholder="Nomor Rekening" name="bank_1_rek" value={formData.bank_1_rek} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 mb-2" />
                <input placeholder="Atas Nama" name="bank_1_an" value={formData.bank_1_an} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-600 mb-2">Rekening 2</h3>
                <input placeholder="Nama Bank / E-Wallet" name="bank_2_nama" value={formData.bank_2_nama} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 mb-2" />
                <input placeholder="Nomor Rekening" name="bank_2_rek" value={formData.bank_2_rek} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 mb-2" />
                <input placeholder="Atas Nama" name="bank_2_an" value={formData.bank_2_an} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200" />
              </div>
            </div>

            <h3 className="font-semibold text-teal-700 mb-2 mt-6">Timeline Kisah Cinta</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
               <input placeholder="Tahun (e.g. 2021)" name="cerita_tahun_1" value={formData.cerita_tahun_1} onChange={handleChange} className="px-4 py-2 rounded-lg border border-slate-200" />
               <input placeholder="Judul" name="cerita_judul_1" value={formData.cerita_judul_1} onChange={handleChange} className="px-4 py-2 rounded-lg border border-slate-200" />
               <input placeholder="Deskripsi pendek" name="cerita_deskripsi_1" value={formData.cerita_deskripsi_1} onChange={handleChange} className="px-4 py-2 rounded-lg border border-slate-200" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
               <input placeholder="Tahun (e.g. 2022)" name="cerita_tahun_2" value={formData.cerita_tahun_2} onChange={handleChange} className="px-4 py-2 rounded-lg border border-slate-200" />
               <input placeholder="Judul" name="cerita_judul_2" value={formData.cerita_judul_2} onChange={handleChange} className="px-4 py-2 rounded-lg border border-slate-200" />
               <input placeholder="Deskripsi pendek" name="cerita_deskripsi_2" value={formData.cerita_deskripsi_2} onChange={handleChange} className="px-4 py-2 rounded-lg border border-slate-200" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
               <input placeholder="Tahun (e.g. 2023)" name="cerita_tahun_3" value={formData.cerita_tahun_3} onChange={handleChange} className="px-4 py-2 rounded-lg border border-slate-200" />
               <input placeholder="Judul" name="cerita_judul_3" value={formData.cerita_judul_3} onChange={handleChange} className="px-4 py-2 rounded-lg border border-slate-200" />
               <input placeholder="Deskripsi pendek" name="cerita_deskripsi_3" value={formData.cerita_deskripsi_3} onChange={handleChange} className="px-4 py-2 rounded-lg border border-slate-200" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
               <input placeholder="Tahun (e.g. 2024)" name="cerita_tahun_4" value={formData.cerita_tahun_4} onChange={handleChange} className="px-4 py-2 rounded-lg border border-slate-200" />
               <input placeholder="Judul" name="cerita_judul_4" value={formData.cerita_judul_4} onChange={handleChange} className="px-4 py-2 rounded-lg border border-slate-200" />
               <input placeholder="Deskripsi pendek" name="cerita_deskripsi_4" value={formData.cerita_deskripsi_4} onChange={handleChange} className="px-4 py-2 rounded-lg border border-slate-200" />
            </div>
          </Section>

          <button disabled={loading} type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl py-4 mt-2 mb-12 shadow-md transition-all flex items-center justify-center gap-2 text-lg">
            {loading ? <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full block"></span> : <><Save size={24} /> {isEditMode ? 'Simpan Perubahan' : 'Simpan & Generate URL'}</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateInvitation;
