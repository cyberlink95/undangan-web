import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, MessageCircle, Mail, MapPin, Send, Phone } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    
    // Construct mailto link
    const mailtoLink = `mailto:ideinvitation@gmail.com?subject=${encodeURIComponent(subject || 'Tanya Layanan Undangan')}&body=${encodeURIComponent(
      `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`
    )}`;
    
    window.location.href = mailtoLink;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Hubungi Kami</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Punya pertanyaan seputar layanan kami atau butuh bantuan teknis? Kami siap membantu mewujudkan undangan digital impian Anda.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Cards */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5 transition-all"
            >
              <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
                <Instagram size={28} />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Instagram</p>
                <a href="https://instagram.com/ideinvitation" target="_blank" rel="noreferrer" className="text-lg font-bold text-slate-800 hover:text-teal-600">@ideinvitation</a>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5 transition-all"
            >
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                <MessageCircle size={28} />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">WhatsApp</p>
                <a href="https://wa.me/6285338773260" target="_blank" rel="noreferrer" className="text-lg font-bold text-slate-800 hover:text-green-600">+62 853-3877-3260</a>
              </div>
            </motion.div>

          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-teal-500 transition-all placeholder:text-slate-400"
                    placeholder="Masukkan nama Anda"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Alamat Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-teal-500 transition-all placeholder:text-slate-400"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Subjek</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-teal-500 transition-all placeholder:text-slate-400"
                  placeholder="Topik pembicaraan"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Pesan</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-teal-500 transition-all placeholder:text-slate-400 resize-none"
                  placeholder="Tuliskan pesan Anda di sini..."
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-3 text-lg group">
                Kirim Pesan
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
