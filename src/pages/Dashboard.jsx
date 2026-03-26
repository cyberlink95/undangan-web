import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Plus, Edit, Trash2, Eye, LogOut, Users, Share2, Copy } from 'lucide-react';

const Dashboard = () => {
  const [invitations, setInvitations] = useState([]);
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      navigate('/login');
    }

    const fetchData = async () => {
      const data = await api.getUndangan();
      setInvitations(data);

      const statsObj = {};
      for (const inv of data) {
        statsObj[inv.slug] = await api.getRSVPStats(inv.slug);
      }
      setStats(statsObj);
    };
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const handleDelete = async (slug) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus undangan ini?')) {
      try {
        await api.deleteUndangan(slug);
        setInvitations(prev => prev.filter(inv => inv.slug !== slug));
        alert('Undangan berhasil dihapus.');
      } catch (error) {
        console.error("Failed to delete", error);
        alert('Gagal menghapus undangan.');
      }
    }
  };

  const copyLink = (slug) => {
    const url = `${window.location.origin}/undangan/${slug}`;
    navigator.clipboard.writeText(url);
    alert('Link undangan berhasil disalin!');
  };

  const shareWA = (slug) => {
    const url = `${window.location.origin}/undangan/${slug}`;
    const text = encodeURIComponent(`Berikut adalah undangan pernikahan kami: ${url}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-slate-800">Dashboard Admin</h1>
          <div className="flex gap-4">
            <Link to="/dashboard/create" className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Plus size={18} />
              <span className="hidden sm:inline">Buat Undangan</span>
            </Link>
            <button onClick={handleLogout} className="bg-white border text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <LogOut size={18} />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-slate-100">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Mempelai</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Tanggal & Tema</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Statistik RSVP</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Share</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invitations.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-slate-900 text-lg">{inv.wanita} & {inv.pria}</div>
                      <div className="text-sm text-slate-500">/{inv.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-700">{inv.tanggal}</div>
                      <span className="mt-1 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-purple-100 text-purple-800 capitalize">
                        Tema: {inv.theme}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {stats[inv.slug] ? (
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg">
                            <span className="text-green-600 font-bold">{stats[inv.slug].hadir}</span>
                            <span className="text-xs">Hadir</span>
                          </div>
                          <div className="flex flex-col items-center p-2 bg-red-50 rounded-lg">
                            <span className="text-red-500 font-bold">{stats[inv.slug].tidakHadir}</span>
                            <span className="text-xs">Tidak</span>
                          </div>
                        </div>
                      ) : 'Loading...'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => shareWA(inv.slug)} className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md transition-colors text-xs font-medium">
                          <Share2 size={14} /> WA
                        </button>
                        <button onClick={() => copyLink(inv.slug)} className="flex items-center gap-1 bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded-md transition-colors text-xs font-medium">
                          <Copy size={14} /> Link
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3 text-slate-400">
                        <Link to={`/undangan/${inv.slug}`} className="hover:text-teal-600 transition-colors" title="Lihat Undangan">
                          <Eye size={18} />
                        </Link>
                        <Link to={`/dashboard/edit/${inv.slug}`} className="hover:text-blue-600 transition-colors" title="Edit">
                          <Edit size={18} />
                        </Link>
                        <button onClick={() => handleDelete(inv.slug)} className="hover:text-red-600 transition-colors" title="Hapus">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {invitations.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                      Belum ada undangan digital yang dibuat.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
