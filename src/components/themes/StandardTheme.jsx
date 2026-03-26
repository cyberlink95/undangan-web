import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { EffectCards, EffectFade, Autoplay, Pagination } from 'swiper/modules';
import Countdown from 'react-countdown';
import { MapPin, Calendar, Gift, Heart, Copy, Music, VolumeX, Send, ArrowDownCircle } from 'lucide-react';
import { copyToClipboard } from '../../utils/helpers';

export const standardThemesConfig = {
  elegant: { bg: 'bg-zinc-950', text: 'text-zinc-200', accent: 'text-amber-500', border: 'border-amber-500/30', card: 'bg-zinc-950/50', btn: 'bg-amber-600 hover:bg-amber-700 text-white', heading: 'font-script text-6xl md:text-7xl font-normal normal-case tracking-normal', title: 'font-script normal-case tracking-normal font-normal', sub: 'font-script normal-case tracking-normal text-4xl font-normal' },
  minimal: { bg: 'bg-slate-50', text: 'text-slate-800', accent: 'text-slate-900', border: 'border-slate-300', card: 'bg-white', btn: 'bg-slate-900 hover:bg-slate-800 text-white', heading: 'font-minimal text-3xl md:text-4xl uppercase tracking-[0.2em] font-light', title: 'font-minimal uppercase tracking-[0.2em] font-light', sub: 'font-minimal uppercase tracking-widest font-bold' },
  floral: { bg: 'bg-rose-50', text: 'text-rose-900', accent: 'text-rose-600', border: 'border-rose-300', card: 'bg-white/80', btn: 'bg-rose-500 hover:bg-rose-600 text-white', heading: 'font-floral text-6xl md:text-7xl normal-case tracking-normal', title: 'font-floral normal-case tracking-normal font-normal', sub: 'font-serif uppercase tracking-widest font-bold' },
  modern: { bg: 'bg-slate-900', text: 'text-slate-200', accent: 'text-teal-400', border: 'border-teal-500/30', card: 'bg-slate-800/80', btn: 'bg-teal-500 text-slate-900 font-bold hover:bg-teal-400', heading: 'font-modern text-3xl md:text-4xl uppercase tracking-widest font-black', title: 'font-modern uppercase tracking-widest font-black', sub: 'font-modern uppercase tracking-widest font-bold' },
  newspaper: { bg: 'bg-paper-200', text: 'text-ink-900', accent: 'text-ink-900', border: 'border-ink-900/40', card: 'bg-paper-100 bg-paper-texture', btn: 'bg-ink-900 hover:bg-ink-800 text-paper-50 transition-colors', heading: 'font-newspaper text-4xl normal-case tracking-normal', title: 'font-newspaper normal-case tracking-normal font-normal', sub: 'font-serif uppercase tracking-widest font-bold' }
};

const StandardTheme = ({
  invData,
  guestName,
  feed,
  rsvpForm,
  setRsvpForm,
  handleRSVP,
  rsvpStatus,
  isPlaying,
  toggleAudio,
  opened,
  handleOpen
}) => {
  const t = standardThemesConfig[invData.tema] || standardThemesConfig.minimal;
  const isDark = ['elegant', 'modern'].includes(invData.tema);
  const fontTitle = t.title;
  const fontHeading = t.sub;
  const fontBody = 'font-sans';

  const fadeInUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <div className="text-xl font-bold mt-4">Acara sedang berlangsung!</div>;
    } else {
      return (
        <div className="flex justify-center gap-4 mt-8">
          {[
            { label: 'Hari', val: days }, { label: 'Jam', val: hours },
            { label: 'Menit', val: minutes }, { label: 'Detik', val: seconds }
          ].map((item) => (
            <div key={item.label} className={`flex flex-col items-center justify-center w-20 h-20 rounded-xl ${t.card} border ${t.border} backdrop-blur-md shadow-lg`}>
              <span className={`text-2xl font-bold ${t.accent}`}>{item.val}</span>
              <span className={`text-[10px] tracking-widest uppercase opacity-70`}>{item.label}</span>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className={`min-h-screen ${fontBody} ${t.bg} ${t.text} antialiased relative selection:bg-teal-500/30`}>
      {opened && (
        <button
          onClick={toggleAudio}
          className={`fixed bottom-6 right-6 z-40 p-3 rounded-full shadow-2xl backdrop-blur-md border ${t.border} ${isDark ? 'bg-black/50 text-white' : 'bg-white/50 text-black'} transition-all hover:scale-110`}
        >
          {isPlaying ? <Music className="animate-spin-slow" size={24} /> : <VolumeX size={24} />}
        </button>
      )}

      <AnimatePresence>
        {!opened && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 z-0">
              <img src={invData.cover} alt="Cover" className="w-full h-full object-cover scale-105 filter blur-sm brightness-50" />
            </div>
            <div className={`relative z-10 text-center p-8 w-full max-w-sm border ${t.border} backdrop-blur-md rounded-3xl ${t.card} shadow-2xl`}>
              <h2 className={`${fontTitle} text-5xl md:text-6xl mb-8 ${t.accent}`}>{invData.wanita.nama_panggilan} <span className="text-3xl">&</span> {invData.pria.nama_panggilan}</h2>
              <div className="mb-8">
                <p className="text-sm tracking-widest uppercase opacity-70 mb-2">Kepada Yth. Bapak/Ibu/Saudara/i</p>
                <p className="text-2xl font-bold">{guestName}</p>
                <p className="text-xs opacity-50 mt-2">Mohon maaf bila ada kesalahan penulisan nama/gelar</p>
              </div>
              <button
                onClick={handleOpen}
                className={`w-full py-4 rounded-xl flex justify-center items-center gap-2 font-bold tracking-widest uppercase transition-transform hover:scale-105 shadow-xl ${t.btn}`}
              >
                <Heart size={20} />
                Buka Undangan
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`${!opened ? 'h-screen overflow-hidden' : ''} max-w-md mx-auto shadow-2xl relative bg-inherit`}>
        <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden">
          <motion.img
            initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 5, ease: "easeOut" }}
            src={invData.cover} className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/40"></div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}
            className="relative z-10 text-white px-6 w-full"
          >
            <p className="tracking-[0.3em] uppercase text-xs mb-6 text-white/90 font-bold drop-shadow-md">The Wedding Of</p>
            <h1 className={`${fontTitle} text-6xl md:text-7xl mb-6 drop-shadow-xl text-paper-50`}>{invData.wanita.nama_panggilan} <span className={`block text-4xl my-2 ${t.accent || 'text-rose-400'}`}>&</span> {invData.pria.nama_panggilan}</h1>
            <p className="text-lg tracking-widest font-light">{invData.acara?.resepsi?.tanggal || invData.tanggal}</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 z-10 text-white/70 flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-widest">Scroll kebawah</span>
            <ArrowDownCircle size={24} />
          </motion.div>
        </section>

        <section className={`py-20 px-6 text-center border-t ${t.border}`}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
            <h2 className={`${t.heading} mb-12 ${t.accent}`}>
              {t.scriptDeco && <span className={t.scriptDeco}>Mempelai</span>}
              Mempelai
            </h2>

            <div className="mb-16">
              <div className={`w-48 h-48 mx-auto rounded-full overflow-hidden border-4 ${t.border} shadow-2xl mb-6 relative group`}>
                <img src={invData.wanita.foto} alt="Bride" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <h3 className={`${fontHeading} text-3xl md:text-5xl mb-2`}>{invData.wanita.nama_lengkap}</h3>
              <p className="opacity-70 font-light">{invData.wanita.ortu}</p>
              {invData.wanita.instagram && (
                <a href={`https://instagram.com/${invData.wanita.instagram}`} target="_blank" rel="noreferrer" className={`inline-block mt-3 text-sm ${t.accent} hover:underline`}>@{invData.wanita.instagram}</a>
              )}
            </div>

            <div className={`${fontTitle} text-6xl opacity-40 mb-16 ${t.accent}`}>&</div>

            <div className="mb-8">
              <div className={`w-48 h-48 mx-auto rounded-full overflow-hidden border-4 ${t.border} shadow-2xl mb-6 relative group`}>
                <img src={invData.pria.foto} alt="Groom" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <h3 className={`${fontHeading} text-3xl md:text-5xl mb-2`}>{invData.pria.nama_lengkap}</h3>
              <p className="opacity-70 font-light">{invData.pria.ortu}</p>
              {invData.pria.instagram && (
                <a href={`https://instagram.com/${invData.pria.instagram}`} target="_blank" rel="noreferrer" className={`inline-block mt-3 text-sm ${t.accent} hover:underline`}>@{invData.pria.instagram}</a>
              )}
            </div>
          </motion.div>
        </section>

        <section className={`py-20 px-6 border-t ${t.border} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/5 z-0"></div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="relative z-10">
            <h2 className={`${t.heading} mb-12 text-center border-b-2 pb-4 ${t.border} ${t.accent}`}>
              {t.scriptDeco && <span className={t.scriptDeco}>Informasi Acara</span>}
              Informasi Acara
            </h2>

            <div className="flex flex-col gap-8">
              <div className={`p-8 rounded-3xl ${t.card} border ${t.border} shadow-xl text-center relative overflow-hidden`}>
                <div className={`absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-transparent to-${t.accent.split('-')[1]}-500/20 rounded-bl-full pointer-events-none`}></div>
                <h3 className={`${fontHeading} text-2xl mb-6`}>Akad Nikah</h3>
                <div className="flex justify-center items-center gap-3 mb-4 opacity-80 border-b border-dashed pb-4">
                  <Calendar size={20} className={t.accent} />
                  <span>{new Date(invData.acara.akad.tanggal).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="opacity-90 font-bold tracking-wider mb-6">{invData.acara.akad.jam}</div>
                <div className="mb-2 font-bold text-lg">{invData.acara.akad.lokasi}</div>
                <div className="opacity-70 text-sm font-light leading-relaxed">{invData.acara.akad.alamat}</div>
              </div>

              <div className={`p-8 rounded-3xl ${t.card} border ${t.border} shadow-xl text-center`}>
                <h3 className={`${fontHeading} text-2xl mb-6`}>Resepsi</h3>
                <div className="flex justify-center items-center gap-3 mb-4 opacity-80 border-b border-dashed pb-4">
                  <Calendar size={20} className={t.accent} />
                  <span>{new Date(invData.acara.resepsi.tanggal).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="opacity-90 font-bold tracking-wider mb-6">{invData.acara.resepsi.jam}</div>
                <div className="mb-2 font-bold text-lg">{invData.acara.resepsi.lokasi}</div>
                <div className="opacity-70 text-sm font-light leading-relaxed">{invData.acara.resepsi.alamat}</div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <h3 className="uppercase tracking-widest text-sm mb-4 opacity-70">Menuju Hari Bahagia</h3>
              <Countdown date={new Date(`${invData.acara.akad.tanggal}T08:00:00`)} renderer={renderer} />
            </div>

            {invData.maps_embed && (
              <div className="mt-16 text-center">
                <h3 className={`${fontHeading} text-2xl mb-6`}>Peta Lokasi</h3>
                <div className={`rounded-2xl overflow-hidden shadow-2xl border-4 ${t.border} h-64`}>
                  <iframe src={invData.maps_embed} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
                </div>
                {invData.maps_url && (
                  <a href={invData.maps_url} target="_blank" rel="noreferrer" className={`mt-6 inline-flex items-center gap-2 py-3 px-8 rounded-full ${t.btn} font-bold tracking-wide transition-all shadow-lg`}>
                    <MapPin size={20} />
                    Buka di Google Maps
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </section>

        {(invData.galeri?.length > 0 || invData.video) && (
          <section className={`py-20 px-6 text-center border-t ${t.border}`}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
              <h2 className={`${t.heading} mb-12 text-center ${t.accent}`}>
                {t.scriptDeco && <span className={t.scriptDeco}>Momen Bahagia</span>}
                Momen Bahagia
              </h2>

              {invData.galeri?.length > 0 && (
                <div className="mb-12">
                  {invData.galeri_style === 'grid' ? (
                    <div className="columns-2 gap-4 space-y-4">
                      {invData.galeri.map((img, idx) => (
                        <div key={`gallery-${idx}`} className={`break-inside-avoid rounded-2xl border-2 ${t.border} shadow-lg overflow-hidden mb-4`}>
                          <img src={img} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500 block" alt="Gallery" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Swiper
                      effect={invData.galeri_style === 'fade' ? 'fade' : (invData.galeri_style === 'cards' ? 'cards' : 'slide')}
                      grabCursor={true}
                      centeredSlides={true}
                      loop={true}
                      pagination={invData.galeri_style !== 'cards' ? { clickable: true } : false}
                      modules={[EffectCards, EffectFade, Autoplay, Pagination]}
                      autoplay={{ delay: 3000, disableOnInteraction: false }}
                      className={`${invData.galeri_style === 'cards' ? 'w-64 h-96' : 'w-full h-80 sm:h-96'}`}
                    >
                      {invData.galeri.map((img, idx) => (
                        <SwiperSlide key={`gallery-${idx}`} className={`rounded-2xl border-4 ${t.border} shadow-2xl overflow-hidden`}>
                          <img src={img} className="w-full h-full object-cover" alt="Gallery" />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )}
                </div>
              )}

              {invData.video && (
                <div className={`rounded-2xl overflow-hidden shadow-2xl border-4 ${t.border} aspect-video`}>
                  <iframe width="100%" height="100%" src={invData.video} title="Video Prewedding" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
              )}
            </motion.div>
          </section>
        )}

        {invData.cerita?.length > 0 && (
          <section className={`py-20 px-6 border-t ${t.border}`}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
              <h2 className={`${t.heading} mb-12 text-center ${t.accent}`}>
                {t.scriptDeco && <span className={t.scriptDeco}>Kisah Cinta</span>}
                Kisah Cinta
              </h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                {invData.cerita.map((item, idx) => (
                  <div key={`cerita-${idx}`} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 ${t.card} shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10 ${t.border}`}>
                      <Heart size={16} className={t.accent} />
                    </div>
                    <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl ${t.card} border ${t.border} shadow-lg`}>
                      <div className={`font-bold ${t.accent} text-lg mb-1`}>{item.tahun}</div>
                      <h4 className="font-bold text-xl mb-2">{item.judul}</h4>
                      <p className="opacity-70 text-sm leading-relaxed font-light">{item.deskripsi}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {invData.hadiah?.length > 0 && (
          <section className={`py-20 px-6 text-center border-t ${t.border}`}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
              <h2 className={`${t.heading} mb-6 text-center ${t.accent}`}>
                {t.scriptDeco && <span className={t.scriptDeco}>Digital Gift</span>}
                Digital Gift
              </h2>
              <p className="opacity-70 mb-12 font-light leading-relaxed">Tanpa mengurangi rasa hormat, apabila Bapak/Ibu/Saudara/i ingin memberikan tanda kasih untuk kami, dapat melalui:</p>

              <div className="space-y-6">
                {invData.hadiah.map((bank, idx) => (
                  <div key={`bank-${idx}`} className={`p-6 rounded-3xl ${t.card} border ${t.border} shadow-xl flex flex-col items-center gap-4`}>
                    <div className={`p-4 rounded-full ${t.bg} border ${t.border}`}>
                      <Gift size={32} className={t.accent} />
                    </div>
                    <div>
                      <h4 className="font-bold text-2xl tracking-widest">{bank.nama_bank}</h4>
                      <p className="text-xl my-2 font-mono bg-black/10 px-4 py-2 rounded-lg">{bank.no_rek}</p>
                      <p className="opacity-70 uppercase tracking-wider text-sm">a.n. {bank.atas_nama}</p>
                    </div>
                    <button onClick={() => copyToClipboard(bank.no_rek)} className={`mt-2 flex items-center gap-2 px-6 py-2 rounded-full border ${t.border} hover:bg-black/5 transition-colors text-sm font-bold uppercase tracking-wider`}>
                      <Copy size={16} /> Salin Nomor Rekening
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        <section className={`py-20 px-6 border-t ${t.border} pb-32`}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
            <h2 className={`${t.heading} mb-12 text-center ${t.accent}`}>
              {t.scriptDeco && <span className={t.scriptDeco}>RSVP & Ucapan</span>}
              RSVP & Ucapan
            </h2>

            <div className={`p-8 rounded-3xl ${t.card} border ${t.border} shadow-2xl mb-12`}>
              {rsvpStatus === 'success' && (
                <div className="bg-green-500/20 text-green-700 p-4 rounded-xl text-center mb-6 border border-green-500/30">
                  Terima kasih atas RSVP dan ucapan Anda!
                </div>
              )}

              <form onSubmit={handleRSVP} className="space-y-6">
                <div>
                  <input required value={rsvpForm.nama} onChange={e => setRsvpForm({ ...rsvpForm, nama: e.target.value })} className={`w-full bg-transparent border-b-2 border-inherit py-3 focus:outline-none focus:border-opacity-100 transition-colors opacity-80 focus:opacity-100 placeholder:opacity-50`} placeholder="Nama Anda" />
                </div>
                <div>
                  <select value={rsvpForm.hadir} onChange={e => setRsvpForm({ ...rsvpForm, hadir: e.target.value })} className={`w-full bg-transparent border-b-2 border-inherit py-3 focus:outline-none focus:border-opacity-100 transition-colors opacity-80 focus:opacity-100 ${isDark ? 'text-white' : 'text-black'}`}>
                    <option className="text-black" value="Hadir">Ya, Saya akan hadir</option>
                    <option className="text-black" value="Tidak Hadir">Maaf, saya tidak bisa hadir</option>
                  </select>
                </div>
                <div>
                  <textarea required value={rsvpForm.pesan} onChange={e => setRsvpForm({ ...rsvpForm, pesan: e.target.value })} className={`w-full bg-transparent border-b-2 border-inherit py-3 focus:outline-none focus:border-opacity-100 transition-colors opacity-80 focus:opacity-100 placeholder:opacity-50 mt-2`} placeholder="Tulis ucapan dan doa" rows="3"></textarea>
                </div>
                <button disabled={rsvpStatus === 'loading'} className={`w-full ${t.btn} py-4 rounded-xl uppercase tracking-widest font-bold shadow-lg transition-transform hover:-translate-y-1 mt-4 flex justify-center items-center gap-2`}>
                  {rsvpStatus === 'loading' ? <span className="animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full block"></span> : <><Send size={18} /> Kirim Ucapan</>}
                </button>
              </form>
            </div>

            {feed.length > 0 && (
              <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {feed.map((item, idx) => (
                  <div key={item.id || idx} className={`p-4 rounded-2xl ${t.card} border ${t.border} shadow-sm`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-bold">{item.nama}</div>
                      <div className={`text-xs px-2 py-1 rounded-full border ${t.border} ${item.hadir === 'Hadir' ? 'text-green-500' : 'text-red-500'}`}>{item.hadir}</div>
                    </div>
                    <p className="text-sm opacity-80 font-light leading-relaxed">{item.pesan}</p>
                    <div className="text-xs opacity-40 mt-3 text-right">
                      {new Date(item.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default StandardTheme;
