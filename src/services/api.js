const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw2CpnR8AyFTKgi85_-O-zO2Nkp8PvSankSW7WyY_r3gQc5zHdNSVG_JmdegqKqnhzT/exec';

export const api = {
  getUndangan: async () => {
    try {
      const res = await fetch(`${SCRIPT_URL}?action=getUndangan`);
      const data = await res.json();
      return data.map(u => ({
        id: u.id || u.slug, slug: u.slug,
        pria: u.pria?.nama_panggilan || 'Pria', wanita: u.wanita?.nama_panggilan || 'Wanita',
        tanggal: u.acara?.resepsi?.tanggal || '-', lokasi: u.acara?.resepsi?.lokasi || '-',
        cover: u.cover, status: u.status || 'Aktif', theme: u.tema || 'elegant'
      }));
    } catch (error) {
      console.error("Gagal memuat undangan", error);
      return [];
    }
  },

  getUndanganDetail: async (slug) => {
    try {
      const res = await fetch(`${SCRIPT_URL}?action=getUndangan`);
      const data = await res.json();
      return data.find(u => u.slug === slug);
    } catch (error) {
      console.error("Gagal memuat detail undangan", error);
      return null;
    }
  },

  createUndangan: async (data) => {
    try {
      // Create safe slug
      let slug = `${data.wanita.nama_panggilan}-${data.pria.nama_panggilan}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const newUndangan = { slug, ...data, status: 'Aktif' };

      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'createUndangan', data: newUndangan })
      });
      return await res.json();
    } catch (error) {
      console.error("Gagal membuat undangan", error);
      throw error;
    }
  },

  updateUndangan: async (slug, data) => {
    try {
      const updatedUndangan = { slug, ...data, status: 'Aktif' };
      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'updateUndangan', data: updatedUndangan })
      });
      return await res.json();
    } catch (error) {
      console.error("Gagal mengupdate undangan", error);
      throw error;
    }
  },

  deleteUndangan: async (slug) => {
    try {
      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'deleteUndangan', data: { slug } })
      });
      return await res.json();
    } catch (error) {
      console.error("Gagal menghapus undangan", error);
      throw error;
    }
  },

  submitRSVP: async (data) => {
    try {
      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'submitRSVP', data })
      });
      return await res.json();
    } catch (error) {
      console.error("Gagal mengirim RSVP", error);
      throw error;
    }
  },

  getRSVP: async (slug) => {
    try {
      const res = await fetch(`${SCRIPT_URL}?action=getRSVP&slug=${slug}`);
      return await res.json();
    } catch (error) {
      console.error("Gagal memuat RSVP", error);
      return [];
    }
  },

  getRSVPStats: async (slug) => {
    try {
      const res = await fetch(`${SCRIPT_URL}?action=getRSVP&slug=${slug}`);
      const related = await res.json();
      const hadir = related.filter(r => r.hadir === 'Hadir').length;
      const tidakHadir = related.filter(r => r.hadir === 'Tidak Hadir').length;
      return { total: related.length, hadir, tidakHadir };
    } catch (error) {
      console.error("Gagal memuat statistik RSVP", error);
      return { total: 0, hadir: 0, tidakHadir: 0 };
    }
  },

  login: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    if (email === 'Admin95' && password === 'id121295') {
      return { success: true, token: 'mock-jwt-token-123' };
    }
    throw new Error('Invalid credentials');
  }
};
