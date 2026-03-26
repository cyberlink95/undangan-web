import React, { useEffect, useState } from 'react';
import CardInvitation from '../components/CardInvitation';
import { api } from '../services/api';
import { Loader2 } from 'lucide-react';

const Home = () => {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUndangan = async () => {
      try {
        const data = await api.getUndangan();
        setInvitations(data);
      } catch (error) {
        console.error("Failed to fetch invitations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUndangan();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-teal-900 mb-4 tracking-tight">Galeri Undangan Digital</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Jelajahi berbagai undangan digital elegan yang pernah kami ciptakan.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-teal-600" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {invitations.map((inv) => (
              <CardInvitation key={inv.id} data={inv} />
            ))}
            {invitations.length === 0 && (
              <div className="col-span-full justify-center text-center text-slate-500 py-12">
                Belum ada undangan yang dibuat.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
