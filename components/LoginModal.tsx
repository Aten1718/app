
import React, { useState } from 'react';
import { User, ArrowRight, X, UserPlus, LogIn, AlertCircle } from 'lucide-react';
import { UserAccount } from '../types';

interface LoginModalProps {
  onLogin: (user: UserAccount) => void;
  onClose?: () => void;
  showClose?: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onClose, showClose = false }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const usersDb: UserAccount[] = JSON.parse(localStorage.getItem('berryguard_db_users') || '[]');

    if (mode === 'login') {
      const foundUser = usersDb.find(u => u.username === username && u.password === password);
      
      if (foundUser) {
        onLogin(foundUser);
      } else {
        setError('Username atau Password salah. Silakan coba lagi.');
      }
    } else {
      // Logika Register Dasar
      const exists = usersDb.some(u => u.username === username);
      if (exists) {
        setError('Username sudah digunakan.');
        return;
      }

      const newUser: UserAccount = {
        username,
        password,
        name: username, // Default name is username for new registrations
        role: 'user'
      };

      const updatedDb = [...usersDb, newUser];
      localStorage.setItem('berryguard_db_users', JSON.stringify(updatedDb));
      onLogin(newUser);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 relative animate-in zoom-in-95 duration-300 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-100 rounded-full blur-3xl opacity-50"></div>
        
        {showClose && onClose && (
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all z-10"
          >
            <X size={20} />
          </button>
        )}

        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
              {mode === 'login' ? <LogIn size={32} /> : <UserPlus size={32} />}
            </div>
            <h2 className="text-2xl font-bold text-slate-800">
              {mode === 'login' ? 'Masuk ke Akun' : 'Daftar Baru'}
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              {mode === 'login' 
                ? 'Gunakan akun standar untuk mencoba sistem.' 
                : 'Bergabung untuk akses fitur premium.'}
            </p>
          </div>

          <div className="flex p-1 bg-slate-100 rounded-2xl mb-6">
            <button
              onClick={() => { setMode('login'); setError(null); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl font-bold text-xs transition-all ${
                mode === 'login' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              Masuk
            </button>
            <button
              onClick={() => { setMode('register'); setError(null); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl font-bold text-xs transition-all ${
                mode === 'register' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              Daftar
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-xs font-medium flex items-center gap-3 animate-pulse">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 ml-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="cth: admin / petani"
                className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all text-sm text-slate-800"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 ml-1">Kata Sandi</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="cth: admin123 / petani123"
                className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all text-sm text-slate-800"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-rose-600 text-white font-bold rounded-2xl shadow-xl shadow-rose-200 hover:bg-rose-700 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 mt-4"
            >
              {mode === 'login' ? 'Masuk Sekarang' : 'Daftar Akun'}
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <div className="bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-200">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Akun Demo Standar:</p>
              <div className="flex justify-between text-[10px] text-slate-500">
                <p>Admin: <span className="font-mono text-rose-600">admin / admin123</span></p>
                <p>Petani: <span className="font-mono text-emerald-600">petani / petani123</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
