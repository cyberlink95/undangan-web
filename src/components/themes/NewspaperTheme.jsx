import React from 'react';
import Countdown from 'react-countdown';
import { Music, VolumeX, MapPin, Copy } from 'lucide-react';
import { formatDateSunda, copyToClipboard } from '../../utils/helpers';

const NewspaperTheme = ({
  invData,
  guestName,
  feed,
  rsvpForm,
  setRsvpForm,
  handleRSVP,
  rsvpStatus,
  isPlaying,
  toggleAudio
}) => {
  const fontBody = 'font-lora text-[15px] leading-relaxed tracking-[0.01em]';

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <div className="text-xl font-bold mt-4">Acara sedang berlangsung!</div>;
    } else {
      return (
        <div className="flex justify-center gap-4 mt-4">
          {[
            { label: 'Hari', val: days }, { label: 'Jam', val: hours },
            { label: 'Menit', val: minutes }, { label: 'Detik', val: seconds }
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center justify-center w-16 h-16 border-2 border-double border-ink-900/40 rounded-none bg-transparent shadow-none">
              <span className="text-xl font-serif text-ink-900">{item.val}</span>
              <span className="text-[10px] tracking-widest uppercase text-ink-900">{item.label}</span>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className={`min-h-screen ${fontBody} bg-paper-200 text-ink-900 antialiased selection:bg-ink-900/20 pb-20`}>
      <button onClick={toggleAudio} className="fixed bottom-6 right-6 z-40 p-3 rounded-full shadow-lg border-2 border-ink-900 bg-paper-100 text-ink-900 hover:bg-ink-900 hover:text-paper-100 transition-all">
        {isPlaying ? <Music className="animate-spin-slow" size={20} /> : <VolumeX size={20} />}
      </button>

      <div className="max-w-5xl mx-auto bg-paper-100 bg-paper-texture shadow-[0_0_40px_rgba(0,0,0,0.1)] min-h-screen border-x-8 border-double border-ink-900/20 px-4 sm:px-8 py-8 md:py-12">
        <header className="text-center mb-8 border-b-4 border-ink-900 pb-6 relative">
          <h1 className="font-newspaper text-6xl md:text-8xl mb-2 tracking-tight">The Wedding News</h1>
          <div className="flex flex-col md:flex-row justify-between items-center border-t-2 border-b-2 border-ink-900 py-2 mt-4 text-xs md:text-sm font-serif uppercase tracking-widest font-bold">
            <span>Edisi Spesial Pernikahan</span>
            <span>{formatDateSunda(invData.acara?.akad?.tanggal || invData.tanggal)}</span>
            <span>{invData.acara?.akad?.lokasi || 'Kabar Bahagia'}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <article>
              <h2 className="font-serif text-4xl md:text-5xl font-black mb-4 leading-tight tracking-tight border-b-2 border-ink-900/30 pb-4">
                PERNIKAHAN <br className="hidden md:block" /> {invData.wanita.nama_panggilan.toUpperCase()} & {invData.pria.nama_panggilan.toUpperCase()}
              </h2>

              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="md:w-1/2 shrink-0">
                  <figure className="border-4 border-double border-ink-900 p-1 bg-paper-50 shadow-sm relative -rotate-1">
                    <img src={invData.cover} alt="Mempelai" className="w-full h-auto object-cover aspect-4/3 filter contrast-125 sepia-[.3]" />
                    <figcaption className="text-[10px] font-serif uppercase tracking-wider text-right mt-1 border-t border-ink-900 pt-1">Dokumentasi Prewedding</figcaption>
                  </figure>
                </div>

                <div className="md:w-1/2 text-justify drop-cap columns-1">
                  <p className="mb-4">
                    Kabar bahagia datang dari keluarga besar {invData.wanita.ortu} dan {invData.pria.ortu}. Kedua keluarga sepakat untuk melangsungkan pernikahan putra-putri mereka pada hari yang penuh berkah ini.
                  </p>
                  {invData.cerita && invData.cerita.length > 0 && (
                    <p>
                      Setelah melalui berbagai kisah dan mengarungi manis pahitnya hubungan asmara, mereka akhirnya memutuskan untuk mengikat janji suci di hadapan keluarga dan kerabat terdekat.
                    </p>
                  )}
                </div>
              </div>
            </article>

            {invData.cerita && invData.cerita.length > 0 && (
              <article className="border-t-2 border-ink-900/30 pt-6">
                <h3 className="font-newspaper text-3xl mb-6 text-center">Rekam Jejak Kasih</h3>
                <div className="border-l-2 border-ink-900 ml-4 md:ml-6 pl-6 space-y-6 relative before:absolute before:inset-y-0 before:-left-[2px] before:w-0.5 before:bg-ink-900">
                  {invData.cerita.map((item, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute w-3 h-3 bg-ink-900 rounded-full -left-[31px] top-1.5 shadow-[0_0_0_4px_#f5f5f4]"></div>
                      <h4 className="font-serif font-black text-xl">{item.tahun}</h4>
                      {item.judul && <h5 className="font-bold text-sm mb-1 uppercase tracking-widest">{item.judul}</h5>}
                      <p className="text-sm text-justify italic">{item.deskripsi}</p>
                    </div>
                  ))}
                </div>
              </article>
            )}

            <div className="border-t-4 border-double border-ink-900 my-4"></div>

            <article>
              <h3 className="font-newspaper text-4xl mb-6 text-center">Pengumuman Resmi</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border border-ink-900 p-6 bg-paper-50/50 relative">
                  <div className="absolute top-0 right-0 bg-ink-900 text-paper-100 text-[10px] font-bold px-2 py-1 uppercase tracking-widest">Akad</div>
                  <h4 className="font-serif font-black text-2xl mb-4 border-b border-ink-900/30 pb-2">Ikrar Suci</h4>
                  <p className="font-bold mb-1">{formatDateSunda(invData.acara.akad.tanggal)}</p>
                  <p className="mb-4 text-sm">{invData.acara.akad.jam} Waktu Setempat</p>
                  <p className="font-serif font-bold text-lg leading-tight mb-2">{invData.acara.akad.lokasi}</p>
                  <p className="text-sm italic">{invData.acara.akad.alamat}</p>
                </div>

                <div className="border border-ink-900 p-6 bg-paper-50/50 relative">
                  <div className="absolute top-0 right-0 bg-ink-900 text-paper-100 text-[10px] font-bold px-2 py-1 uppercase tracking-widest">Resepsi</div>
                  <h4 className="font-serif font-black text-2xl mb-4 border-b border-ink-900/30 pb-2">Syukuran</h4>
                  <p className="font-bold mb-1">{formatDateSunda(invData.acara.resepsi.tanggal)}</p>
                  <p className="mb-4 text-sm">{invData.acara.resepsi.jam} Waktu Setempat</p>
                  <p className="font-serif font-bold text-lg leading-tight mb-2">{invData.acara.resepsi.lokasi}</p>
                  <p className="text-sm italic">{invData.acara.resepsi.alamat}</p>
                </div>
              </div>

              <div className="mt-8 text-center p-6 border-2 border-ink-900 border-dashed">
                <h4 className="font-serif font-bold text-xl mb-4 uppercase tracking-widest">Menghitung Waktu</h4>
                <Countdown date={new Date(`${invData.acara.akad.tanggal}T08:00:00`)} renderer={renderer} />
              </div>
            </article>

            {invData.maps_embed && (
              <article className="mt-4">
                <h3 className="font-serif font-black flex items-center gap-2 text-xl mb-4 uppercase tracking-widest border-b-2 border-ink-900 pb-2"><MapPin size={24} /> Peta Penunjuk Arah</h3>
                <div className="border-4 border-double border-ink-900 p-1">
                  <iframe src={invData.maps_embed} width="100%" height="300" style={{ border: 0, filter: 'grayscale(100%) contrast(120%)' }} allowFullScreen="" loading="lazy"></iframe>
                </div>
                {invData.maps_url && (
                  <div className="text-center mt-4">
                    <a href={invData.maps_url} target="_blank" rel="noreferrer" className="inline-block border-2 border-ink-900 text-ink-900 px-6 py-2 font-black uppercase tracking-widest hover:bg-ink-900 hover:text-paper-100 transition-colors text-sm">Buka di Aplikasi Maps</a>
                  </div>
                )}
              </article>
            )}
          </div>

          <aside className="lg:col-span-4 flex flex-col gap-8 lg:border-l-2 lg:border-ink-900/30 lg:pl-8">
            <div className="border border-ink-900 p-6 shadow-[2px_2px_0_0_rgba(26,24,21,1)]">
              <h3 className="font-newspaper text-3xl mb-6 text-center border-b border-ink-900/40 pb-4">Profil Singkat</h3>

              <div className="mb-8 text-center">
                <img src={invData.wanita.foto} alt="Bride" className="w-32 h-32 mx-auto rounded-full object-cover border-2 border-ink-900 p-1 mb-4 filter grayscale sepia-[.2]" />
                <h4 className="font-serif font-bold text-xl">{invData.wanita.nama_lengkap}</h4>
                <p className="text-sm italic opacity-80 mt-1">{invData.wanita.ortu}</p>
                {invData.wanita.instagram && <p className="text-xs font-bold mt-2">@{invData.wanita.instagram}</p>}
              </div>

              <div className="text-center font-newspaper text-3xl opacity-50 mb-8">&</div>

              <div className="text-center">
                <img src={invData.pria.foto} alt="Groom" className="w-32 h-32 mx-auto rounded-full object-cover border-2 border-ink-900 p-1 mb-4 filter grayscale sepia-[.2]" />
                <h4 className="font-serif font-bold text-xl">{invData.pria.nama_lengkap}</h4>
                <p className="text-sm italic opacity-80 mt-1">{invData.pria.ortu}</p>
                {invData.pria.instagram && <p className="text-xs font-bold mt-2">@{invData.pria.instagram}</p>}
              </div>
            </div>

            {invData.hadiah?.length > 0 && (
              <div className="border border-ink-900 p-6 bg-paper-200">
                <h3 className="font-serif font-black text-xl mb-4 uppercase tracking-widest text-center">Titik Kasih</h3>
                <p className="text-xs text-justify mb-6 italic opacity-90">Bagi kerabat yang ingin memberikan tanda kasih secara digital, dapat disalurkan melalui rekening di bawah ini:</p>

                <div className="space-y-4">
                  {invData.hadiah.map((bank, idx) => (
                    <div key={idx} className="border border-ink-900/50 p-4 text-center bg-paper-50">
                      <div className="font-black text-lg mb-1">{bank.nama_bank}</div>
                      <div className="font-mono text-xl tracking-widest mb-1">{bank.no_rek}</div>
                      <div className="text-xs uppercase">a.n. {bank.atas_nama}</div>
                      <button onClick={() => copyToClipboard(bank.no_rek)} className="mt-3 w-full bg-ink-900 text-paper-100 py-2 text-xs font-bold uppercase hover:bg-ink-800 flex items-center justify-center gap-2"><Copy size={14} /> Salin No. Rek</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-4 border-ink-900 p-6">
              <h3 className="font-newspaper text-3xl mb-4 text-center">Kolom Pembaca</h3>
              <p className="text-xs text-center italic mb-4 border-b border-ink-900/30 pb-4">Silakan konfirmasi kehadiran dan tuliskan pesan istimewa Anda.</p>

              {rsvpStatus === 'success' && (
                <div className="bg-ink-900 text-paper-100 p-3 text-center text-sm font-bold mb-4">Pesan Anda Telah Dimuat!</div>
              )}

              <form onSubmit={handleRSVP} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1">Nama / Instansi</label>
                  <input required value={rsvpForm.nama} onChange={e => setRsvpForm({ ...rsvpForm, nama: e.target.value })} className="w-full bg-transparent border-b border-ink-900 py-2 focus:outline-none focus:border-b-2 font-serif text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1">Kehadiran</label>
                  <select value={rsvpForm.hadir} onChange={e => setRsvpForm({ ...rsvpForm, hadir: e.target.value })} className="w-full bg-transparent border-b border-ink-900 py-2 focus:outline-none focus:border-b-2 font-serif text-sm">
                    <option value="Hadir">Hadir</option>
                    <option value="Tidak Hadir">Berhalangan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1">Pesan / Doa</label>
                  <textarea required value={rsvpForm.pesan} onChange={e => setRsvpForm({ ...rsvpForm, pesan: e.target.value })} className="w-full bg-transparent border-b border-ink-900 py-2 focus:outline-none focus:border-b-2 font-serif text-sm resize-none" rows="3"></textarea>
                </div>
                <button disabled={rsvpStatus === 'loading'} className="w-full border-2 border-ink-900 text-ink-900 p-3 font-black uppercase tracking-widest hover:bg-ink-900 hover:text-paper-100 transition-colors mt-2">
                  {rsvpStatus === 'loading' ? 'MENGIRIM...' : 'KIRIM PESAN'}
                </button>
              </form>

              {feed.length > 0 && (
                <div className="mt-8 border-t-2 border-ink-900 border-dashed pt-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                  <h4 className="font-serif font-bold text-sm uppercase tracking-widest mb-4">Pesan Terbaru:</h4>
                  <div className="space-y-4">
                    {feed.map((item, idx) => (
                      <div key={idx} className="border-b border-ink-900/20 pb-4">
                        <div className="flex justify-between items-baseline mb-1">
                          <div className="font-black font-serif">{item.nama}</div>
                          <div className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border ${item.hadir === 'Hadir' ? 'border-ink-900 text-ink-900' : 'border-ink-900/50 text-ink-900/50 line-through'}`}>{item.hadir}</div>
                        </div>
                        <p className="text-sm italic leading-relaxed text-justify">"{item.pesan}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>

        <footer className="mt-12 text-center text-[10px] sm:text-xs font-bold uppercase tracking-widest border-t-4 border-ink-900 pt-6">
          Diterbitkan oleh Keluarga Besar Kedua Mempelai &copy; {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
};

export default NewspaperTheme;
