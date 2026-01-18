
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import DiagnoseTool from './components/DiagnoseTool';
import ChatInterface from './components/ChatInterface';
import LoginModal from './components/LoginModal';
import Recommendations from './components/Recommendations';
import Scheduler from './components/Scheduler';
import { UserAccount } from './types';

const AboutPage: React.FC = () => (
  <div className="max-w-4xl mx-auto space-y-8">
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Tentang BerryGuard AI</h2>
      <div className="prose prose-slate max-w-none space-y-4">
        <p className="text-slate-600 leading-relaxed">
          BerryGuard AI adalah platform sistem pakar canggih yang dirancang khusus untuk petani stroberi. 
          Menggunakan teknologi visi komputer dan model bahasa besar (LLM) dari Google Gemini, 
          kami bertujuan untuk mendemokratisasi akses ke keahlian agronomi.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-rose-600 mb-2">Visi Kami</h4>
            <p className="text-sm text-slate-600">Menjadi pendamping digital utama bagi petani untuk memastikan kemandirian pangan dan kesejahteraan petani melalui teknologi AI.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-emerald-600 mb-2">Misi Kami</h4>
            <p className="text-sm text-slate-600">Menyediakan alat diagnostik yang cepat, akurat, dan mudah digunakan untuk mencegah kerugian akibat hama dan penyakit tanaman.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // 1. Inisialisasi Database User di LocalStorage
    const usersDb = localStorage.getItem('berryguard_db_users');
    if (!usersDb) {
      const initialUsers: UserAccount[] = [
        { username: 'admin', password: 'admin123', name: 'Administrator', role: 'admin' },
        { username: 'petani', password: 'petani123', name: 'Bapak Ahmad', role: 'user' }
      ];
      localStorage.setItem('berryguard_db_users', JSON.stringify(initialUsers));
    }

    // 2. Cek Sesi Login
    const session = localStorage.getItem('berryguard_session');
    if (session) {
      setCurrentUser(JSON.parse(session));
    } else {
      setShowLogin(true);
    }
  }, []);

  const handleLogin = (user: UserAccount) => {
    setCurrentUser(user);
    localStorage.setItem('berryguard_session', JSON.stringify(user));
    setShowLogin(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('berryguard_session');
    setShowLogin(true);
  };

  return (
    <Router>
      <Layout 
        userName={currentUser?.name || null} 
        userRole={currentUser?.role || null}
        onLogout={handleLogout} 
        onOpenLogin={() => setShowLogin(true)}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/diagnose" element={<DiagnoseTool />} />
          <Route path="/consult" element={<ChatInterface />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/scheduler" element={<Scheduler />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Layout>

      {showLogin && (
        <LoginModal 
          onLogin={handleLogin} 
          onClose={() => setShowLogin(false)} 
          showClose={!!currentUser} 
        />
      )}
    </Router>
  );
};

export default App;
