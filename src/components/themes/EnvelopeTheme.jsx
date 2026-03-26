import React from 'react';
import { motion } from 'framer-motion';
import Countdown from 'react-countdown';
import { Music, VolumeX, MapPin, Gift, Copy, Send, Heart } from 'lucide-react';
import { formatDateSunda, copyToClipboard } from '../../utils/helpers';

const EnvelopeTheme = ({
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
  envStage,
  handleEnvelopeOpen
}) => {
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
            <div key={item.label} className="flex flex-col items-center justify-center w-20 h-20 rounded-xl bg-[#fdfbf7] border border-stone-300 backdrop-blur-md shadow-lg">
              <span className="text-2xl font-bold text-[#8b0000]">{item.val}</span>
              <span className="text-[10px] tracking-widest uppercase opacity-70">{item.label}</span>
            </div>
          ))}
        </div>
      );
    }
  };

  if (opened) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`min-h-screen text-stone-800 antialiased font-serif selection:bg-[#8b0000]/20 pb-20`}
      >
        <button onClick={toggleAudio} className={`fixed bottom-6 right-6 z-40 p-3 rounded-full shadow-lg border border-[#d6c7a1] bg-[#fdfbf7] text-[#8b0000] hover:bg-[#8b0000] hover:text-[#fdfbf7] transition-all`}>
          {isPlaying ? <Music className="animate-spin-slow" size={20} /> : <VolumeX size={20} />}
        </button>

        <div className="max-w-[700px] mx-auto bg-[#fdfbf7] shadow-xl min-h-screen border-airmail px-6 sm:px-12 py-16">
          <motion.section variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <p className="italic text-lg mb-4 text-[#8b0000]">Assalamu'alaikum Warahmatullahi Wabarakatuh</p>
            <p className="opacity-80 leading-relaxed max-w-lg mx-auto">Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan resepsi pernikahan putra-putri kami:</p>
          </motion.section>

          <motion.section variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-20 relative before:absolute before:inset-0 before:w-px before:bg-linear-to-b before:from-transparent before:via-[#d6c7a1] before:to-transparent before:mx-auto">
            <div className="relative z-10 bg-[#fdfbf7] py-4">
              <div className="mb-10">
                <div className="w-40 h-48 md:w-48 md:h-56 mx-auto bg-[#fdfbf7] p-2 shadow-md mb-6 border-2 border-[#d6c7a1] border-dashed group hover:border-[#8b0000] transition-all duration-500 relative -rotate-2 hover:rotate-0">
                  <div className="w-full h-full border border-[#d6c7a1] relative overflow-hidden bg-white p-1">
                    <img src={invData.wanita.foto} alt="Bride" className="w-full h-full object-cover filter sepia-[0.2] group-hover:sepia-0 group-hover:scale-110 transition-all duration-700" />
                  </div>
                </div>
                <h2 className="font-serif text-4xl sm:text-5xl font-black mb-3 text-[#8b0000] tracking-wider">{invData.wanita.nama_lengkap}</h2>
                <p className="text-sm italic opacity-80 text-stone-700">{invData.wanita.ortu}</p>
                {invData.wanita.instagram && <p className="text-xs font-bold mt-2 text-stone-500">@{invData.wanita.instagram}</p>}
              </div>

              <div className="text-2xl italic text-[#d6c7a1] mb-10 font-light">dengan</div>

              <div className="mb-4">
                <div className="w-40 h-48 md:w-48 md:h-56 mx-auto bg-[#fdfbf7] p-2 shadow-md mb-6 border-2 border-[#d6c7a1] border-dashed group hover:border-[#8b0000] transition-all duration-500 relative rotate-2 hover:rotate-0">
                  <div className="w-full h-full border border-[#d6c7a1] relative overflow-hidden bg-white p-1">
                    <img src={invData.pria.foto} alt="Groom" className="w-full h-full object-cover filter sepia-[0.2] group-hover:sepia-0 group-hover:scale-110 transition-all duration-700" />
                  </div>
                </div>
                <h2 className="font-serif text-4xl sm:text-5xl font-black mb-3 text-[#8b0000] tracking-wider">{invData.pria.nama_lengkap}</h2>
                <p className="text-sm italic opacity-80 text-stone-700">{invData.pria.ortu}</p>
                {invData.pria.instagram && <p className="text-xs font-bold mt-2 text-stone-500">@{invData.pria.instagram}</p>}
              </div>

              <div className="flex justify-center items-center mt-12">
                <div className="h-px w-16 bg-[#d6c7a1]"></div>
                <Heart size={16} className="mx-4 text-[#8b0000] fill-current opacity-80" />
                <div className="h-px w-16 bg-[#d6c7a1]"></div>
              </div>
            </div>
          </motion.section>

          <motion.section variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20">
            <h3 className="font-serif font-black text-2xl text-center mb-10 text-[#8b0000] uppercase tracking-widest border-b border-[#d6c7a1] pb-4">Waktu & Tempat</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 border border-[#d6c7a1] bg-white shadow-sm text-center rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 left-0 h-1 bg-[#8b0000]"></div>
                <h4 className="font-serif font-bold text-xl mb-4 italic text-[#8b0000]">Akad Nikah</h4>
                <div className="flex flex-col items-center gap-1 mb-4 opacity-90 border-b border-dashed border-[#d6c7a1] pb-4">
                  <span className="font-bold">{formatDateSunda(invData.acara.akad.tanggal)}</span>
                  <span className="text-sm">Pukul {invData.acara.akad.jam} Waktu Setempat</span>
                </div>
                <p className="font-bold text-lg mb-1">{invData.acara.akad.lokasi}</p>
                <p className="opacity-70 text-sm font-light italic">{invData.acara.akad.alamat}</p>
              </div>

              <div className="p-8 border border-[#d6c7a1] bg-white shadow-sm text-center rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 left-0 h-1 bg-[#8b0000]"></div>
                <h4 className="font-serif font-bold text-xl mb-4 italic text-[#8b0000]">Resepsi</h4>
                <div className="flex flex-col items-center gap-1 mb-4 opacity-90 border-b border-dashed border-[#d6c7a1] pb-4">
                  <span className="font-bold">{formatDateSunda(invData.acara.resepsi.tanggal)}</span>
                  <span className="text-sm">Pukul {invData.acara.resepsi.jam} Waktu Setempat</span>
                </div>
                <p className="font-bold text-lg mb-1">{invData.acara.resepsi.lokasi}</p>
                <p className="opacity-70 text-sm font-light italic">{invData.acara.resepsi.alamat}</p>
              </div>
            </div>
            <div className="mt-12 text-center p-8 bg-[#f5f1e6] rounded-xl border border-[#d6c7a1]">
              <h4 className="font-serif font-bold text-lg mb-4 text-[#8b0000] tracking-widest">Menuju Hari Bahagia</h4>
              <Countdown date={new Date(`${invData.acara.akad.tanggal}T08:00:00`)} renderer={renderer} />
            </div>
          </motion.section>

          {invData.maps_embed && (
            <motion.section variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20 text-center">
              <h3 className="font-serif font-black flex items-center justify-center gap-2 text-xl mb-8 uppercase tracking-widest text-[#8b0000]"><MapPin size={24} /> Peta Lokasi</h3>
              <div className="p-2 border border-[#d6c7a1] bg-white rounded-xl shadow-sm mb-6">
                <iframe src={invData.maps_embed} width="100%" height="300" className="rounded-lg" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
              </div>
              {invData.maps_url && (
                <a href={invData.maps_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-[#8b0000] text-[#8b0000] rounded-full hover:bg-[#8b0000] hover:text-white transition-colors uppercase tracking-widest font-bold text-sm shadow-sm"><MapPin size={16} /> Buka di Google Maps</a>
              )}
            </motion.section>
          )}

          {invData.cerita?.length > 0 && (
            <motion.section variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20">
              <h3 className="font-serif font-black text-2xl text-center mb-10 text-[#8b0000] uppercase tracking-widest border-b border-[#d6c7a1] pb-4">Kisah Cinta</h3>
              <div className="relative">
                <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-px border-l-2 border-dashed border-[#d6c7a1] md:-translate-x-px z-0"></div>
                <div className="space-y-8 relative z-10">
                  {invData.cerita.map((item, idx) => (
                    <div key={idx} className={`relative flex flex-col md:flex-row items-start md:items-center justify-between w-full ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-[#8b0000] shadow-[0_0_0_6px_#fdfbf7] -translate-x-[7px] md:-translate-x-[7px] top-[30px] md:top-1/2 md:-translate-y-1/2 z-20"></div>
                      <div className="hidden md:block w-[45%]"></div>
                      <div className="w-full md:w-[45%] pl-12 md:pl-0">
                        <div className={`p-6 bg-white border border-[#d6c7a1] rounded-xl shadow-sm relative group hover:border-[#8b0000] transition-colors ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                          <h4 className="font-bold text-xl text-[#8b0000] mb-2">{item.tahun}</h4>
                          <p className="text-sm opacity-80 leading-relaxed font-light text-stone-700">{item.deskripsi}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {(invData.galeri?.length > 0 || invData.video) && (
            <motion.section variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20">
              <h3 className="font-serif font-black text-2xl text-center mb-10 text-[#8b0000] uppercase tracking-widest border-b border-[#d6c7a1] pb-4">Potret Kebahagiaan</h3>
              {invData.galeri?.length > 0 && (
                <div className="columns-2 sm:columns-3 gap-4 space-y-4 mb-8">
                  {invData.galeri.map((img, idx) => (
                    <div key={idx} className="break-inside-avoid border border-[#d6c7a1] p-1 bg-white shadow-sm hover:scale-105 transition-transform duration-500 rounded-lg overflow-hidden group">
                      <img src={img} alt="Gallery" className="w-full h-auto object-cover rounded filter sepia-[.1] group-hover:sepia-0 transition-all duration-500" />
                    </div>
                  ))}
                </div>
              )}
              {invData.video && (
                <div className="border border-[#d6c7a1] p-2 bg-white rounded-xl shadow-sm aspect-video">
                  <iframe width="100%" height="100%" src={invData.video} title="Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
              )}
            </motion.section>
          )}

          {invData.hadiah?.length > 0 && (
            <motion.section variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20">
              <div className="border-y-2 border-dashed border-[#d6c7a1] py-12 text-center">
                <h3 className="font-serif font-black text-2xl mb-4 text-[#8b0000] uppercase tracking-widest flex justify-center items-center gap-2"><Gift size={24} /> Tanda Kasih</h3>
                <p className="opacity-80 text-sm mb-8 leading-relaxed max-w-lg mx-auto">Kehadiran dan doa restu Anda adalah anugerah terindah bagi kami. Namun apabila Anda hendak memberikan tanda kasih, dapat disalurkan melalui:</p>

                <div className="flex flex-col gap-6 max-w-md mx-auto">
                  {invData.hadiah.map((bank, idx) => (
                    <div key={idx} className="bg-white border border-[#d6c7a1] p-6 rounded-xl shadow-sm text-center">
                      <h4 className="font-bold text-xl text-[#8b0000] uppercase">{bank.nama_bank}</h4>
                      <p className="text-2xl font-mono my-3 tracking-widest">{bank.no_rek}</p>
                      <p className="opacity-70 text-sm mb-4">a.n. {bank.atas_nama}</p>
                      <button onClick={() => copyToClipboard(bank.no_rek)} className="bg-[#f5f1e6] border border-[#d6c7a1] hover:bg-[#d6c7a1] text-[#8b0000] w-full py-2 rounded-lg font-bold uppercase text-xs tracking-wider transition-colors inline-flex justify-center items-center gap-2"><Copy size={16} /> Salin Rekening</button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          <motion.section variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20">
            <h3 className="font-serif font-black text-2xl text-center mb-8 text-[#8b0000] uppercase tracking-widest border-b border-[#d6c7a1] pb-4">Buku Tamu & Kehadiran</h3>
            <div className="bg-white border border-[#d6c7a1] p-6 sm:p-10 rounded-2xl shadow-sm">
              {rsvpStatus === 'success' && (
                <div className="bg-green-50 text-green-800 p-4 border border-green-200 rounded-lg text-center mb-6">Pesan Anda berhasil terkirim. Terima kasih!</div>
              )}
              <form onSubmit={handleRSVP} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-[#8b0000] mb-1">Nama / Instansi</label>
                  <input required value={rsvpForm.nama} onChange={e => setRsvpForm({ ...rsvpForm, nama: e.target.value })} className="w-full bg-[#fdfbf7] border border-[#d6c7a1] rounded-lg px-4 py-3 focus:outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000] transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#8b0000] mb-1">Konfirmasi Kehadiran</label>
                  <select value={rsvpForm.hadir} onChange={e => setRsvpForm({ ...rsvpForm, hadir: e.target.value })} className="w-full bg-[#fdfbf7] border border-[#d6c7a1] rounded-lg px-4 py-3 focus:outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000] transition-all">
                    <option value="Hadir">Ya, Saya Akan Hadir</option>
                    <option value="Tidak Hadir">Maaf, Saya Tidak Bisa Hadir</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#8b0000] mb-1">Pesan / Doa Restu</label>
                  <textarea required value={rsvpForm.pesan} onChange={e => setRsvpForm({ ...rsvpForm, pesan: e.target.value })} className="w-full bg-[#fdfbf7] border border-[#d6c7a1] rounded-lg px-4 py-3 focus:outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000] transition-all resize-none" rows="4"></textarea>
                </div>
                <button disabled={rsvpStatus === 'loading'} className="w-full bg-[#8b0000] hover:bg-red-900 text-white rounded-lg py-4 font-bold uppercase tracking-widest shadow-md flex justify-center items-center gap-2 transition-colors">
                  {rsvpStatus === 'loading' ? 'Mengirim...' : <><Send size={18} /> Kirim Ucapan</>}
                </button>
              </form>

              {feed.length > 0 && (
                <div className="mt-12 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar space-y-4 rounded-xl">
                  {feed.map((item, idx) => (
                    <div key={idx} className="p-4 bg-[#fdfbf7] border border-[#d6c7a1] rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-bold text-[#8b0000]">{item.nama}</div>
                        <div className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border ${item.hadir === 'Hadir' ? 'border-green-600 text-green-700 bg-green-50' : 'border-red-300 text-red-500 bg-red-50'}`}>{item.hadir}</div>
                      </div>
                      <p className="text-sm italic opacity-90 leading-relaxed text-stone-700">"{item.pesan}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.section>

          <motion.section variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mt-20">
            <p className="opacity-80 leading-relaxed max-w-lg mx-auto mb-10">Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.</p>
            <p className="italic text-lg mb-8 text-[#8b0000]">Wassalamu'alaikum Warahmatullahi Wabarakatuh</p>
            <p className="font-script text-4xl text-[#d6c7a1] mt-8 mb-4">{invData.wanita.nama_panggilan} & {invData.pria.nama_panggilan}</p>
          </motion.section>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-serif bg-[#f5f1e6]">
      <div className="relative w-[90%] md:w-[500px] aspect-4/3 max-w-lg mb-16 z-10" style={{ perspective: '1000px' }}>
        <motion.div
          className="absolute inset-[4px] bg-[#fdfbf7] border border-[#d6c7a1] shadow-inner p-4 md:p-6 flex flex-col items-center z-10"
          initial={{ y: 0 }}
          animate={envStage === 'opening' ? { y: '-80%', opacity: 0 } : { y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
        >
          <div className="border-2 border-[#d6c7a1] border-double w-full h-full p-2 md:p-4 flex flex-col items-center justify-center text-center">
            <p className="italic text-[10px] md:text-xs text-[#8b0000] mb-1 md:mb-2 font-bold uppercase tracking-widest">Pernikahan</p>
            <h2 className="text-2xl md:text-3xl font-script text-stone-800 leading-tight">{invData.wanita.nama_panggilan} <span className="text-base md:text-xl">&</span> {invData.pria.nama_panggilan}</h2>
          </div>
        </motion.div>

        <div className="absolute inset-0 bg-[#f9f9f9] border-airmail-sm shadow-lg z-0"></div>

        <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-white rounded-b-lg border-t border-slate-200 z-20 shadow-[0_-2px_15px_rgba(0,0,0,0.02)]" style={{ clipPath: 'polygon(0 100%, 50% 15%, 100% 100%)' }}></div>

        <div className="absolute top-0 left-0 h-full w-[55%] bg-[#fcfcfc] z-15 shadow-[2px_0_10px_rgba(0,0,0,0.02)] rounded-l-lg border-r border-slate-100" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}></div>
        <div className="absolute top-0 right-0 h-full w-[55%] bg-[#fcfcfc] z-15 shadow-[-2px_0_10px_rgba(0,0,0,0.02)] rounded-r-lg border-l border-slate-100" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}></div>

        <motion.div
          className="absolute top-0 left-0 w-full h-[52%] bg-white z-30 origin-top drop-shadow-[0_4px_10px_rgba(0,0,0,0.05)] border-b border-slate-200"
          style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
          initial={{ rotateX: 0 }}
          animate={envStage === 'opening' ? { rotateX: 180, zIndex: 5 } : { rotateX: 0, zIndex: 30 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
        ></motion.div>

        <motion.div
          className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-[#8b0000] rounded-full flex items-center justify-center shadow-lg border-2 border-[#5a0000] z-35"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, #a61a1a, #8b0000)' }}
          initial={{ scale: 1, opacity: 1 }}
          animate={envStage === 'opening' ? { scale: 1.5, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-10 h-10 md:w-14 md:h-14 border border-[#6b0000]/50 rounded-full flex items-center justify-center">
            <span className="text-[#f5f1e6] font-serif italic text-xl md:text-2xl font-black drop-shadow-sm">{invData.wanita.nama_panggilan[0]}&{invData.pria.nama_panggilan[0]}</span>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-4 right-4 md:right-6 z-25 bg-[#fdfbf7] p-1 shadow-sm rotate-[-8deg] border border-slate-200 border-dashed"
          initial={{ opacity: 1 }}
          animate={envStage === 'opening' ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-10 h-12 md:w-12 md:h-14 border border-slate-300 relative overflow-hidden bg-white p-0.5">
            <img src={invData.cover} alt="stamp" className="w-full h-full object-cover filter grayscale sepia-[0.2]" />
            <div className="absolute inset-0 flex items-center justify-center mix-blend-multiply opacity-60">
              <div className="w-8 h-8 border-[1.5px] border-slate-800 rounded-full flex items-center justify-center -rotate-12">
                <span className="text-[4px] font-black text-slate-800 leading-none text-center">WEDDING<br />POST</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-3 md:bottom-6 left-0 right-0 z-40 flex flex-col justify-end items-center px-4"
          initial={{ opacity: 1 }}
          animate={envStage === 'opening' ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-[9px] md:text-[10px] tracking-widest uppercase opacity-60 mb-0.5 md:mb-1 font-bold text-slate-700">Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <p className="text-lg md:text-xl font-black text-slate-800 mb-2 md:mb-4 font-serif">{guestName}</p>
          <button
            onClick={(e) => { e.stopPropagation(); handleEnvelopeOpen(); }}
            className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 md:px-8 md:py-3 rounded-full uppercase tracking-widest font-black text-[9px] md:text-[10px] shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl flex items-center gap-2"
          >
            Buka Undangan
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default EnvelopeTheme;
