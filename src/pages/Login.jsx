import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { LogIn, Heart } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  React.useEffect(() => {
    if (localStorage.getItem('adminToken')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.login(email, password);
      if (res.success) {
        localStorage.setItem('adminToken', res.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Email atau password salah.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left abstract side */}
      <div className="hidden md:flex w-1/2 bg-teal-900 justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <svg className="absolute left-0 top-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon fill="currentColor" className="text-teal-800" points="0,100 100,0 100,100" />
          </svg>
        </div>
        <div className="relative z-10 text-white max-w-md">
          <Heart className="mb-6 opacity-80" size={48} />
          <h1 className="text-4xl font-serif font-bold mb-4">Ide-Invitation Admin</h1>
          <p className="text-teal-100 text-lg">Kelola undangan digital dengan mudah dan elegan. Masuk untuk mengatur konten klien Anda.</p>
        </div>
      </div>

      {/* Right form side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-10 block md:hidden">
            <h1 className="text-3xl font-serif font-bold text-teal-900 flex items-center gap-2">
              <Heart className="text-teal-600" size={28} />
              DigiInvite
            </h1>
          </div>

          <h2 className="text-3xl font-bold mb-2 text-slate-800">Selamat Datang</h2>
          <p className="text-slate-500 mb-8">Silakan masuk ke akun admin Anda.</p>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-slate-700 text-sm font-medium mb-2">Email Address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                type="text"
                placeholder="username"
                required
              />
            </div>
            <div>
              <label className="block text-slate-700 text-sm font-medium mb-2">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-xl flex justify-center items-center gap-2 transition-colors disabled:opacity-70 mt-4"
            >
              {loading ? <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full block"></span> : (
                <>
                  <LogIn size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
