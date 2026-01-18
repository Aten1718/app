
import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Stethoscope, MessageSquare, Info, Leaf, LogOut, User as UserIcon, ShieldCheck, ShoppingBag, CalendarClock } from 'lucide-react';

const SidebarItem: React.FC<{ to: string, icon: React.ReactNode, label: string }> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        isActive 
          ? 'bg-rose-600 text-white shadow-lg shadow-rose-200' 
          : 'text-slate-600 hover:bg-rose-50 hover:text-rose-600'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
};

interface LayoutProps {
  children: React.ReactNode;
  userName: string | null;
  userRole: 'admin' | 'user' | null;
  onLogout: () => void;
  onOpenLogin: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, userName, userRole, onLogout, onOpenLogin }) => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-2 mb-8">
          <div className="bg-rose-500 p-2 rounded-lg">
            <Leaf className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-slate-800">BerryGuard <span className="text-rose-600">AI</span></h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto pb-8">
          <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Menu Utama</p>
          <SidebarItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <SidebarItem to="/diagnose" icon={<Stethoscope size={20} />} label="Diagnosa AI" />
          <SidebarItem to="/consult" icon={<MessageSquare size={20} />} label="Konsultasi Pakar" />
          
          <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6 mb-2">Kebutuhan Tani</p>
          <SidebarItem to="/recommendations" icon={<ShoppingBag size={20} />} label="Produk Pilihan" />
          <SidebarItem to="/scheduler" icon={<CalendarClock size={20} />} label="Jadwal Siram" />
          
          <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6 mb-2">Sistem</p>
          <SidebarItem to="/about" icon={<Info size={20} />} label="Informasi" />
        </nav>

        <div className="p-4 m-4 bg-emerald-50 rounded-2xl border border-emerald-100">
          <p className="text-xs font-semibold text-emerald-700 uppercase mb-1">Status Sistem</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <p className="text-sm text-emerald-800 font-medium">Semua Sistem OK</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="text-slate-800 font-bold text-lg">
                Halo, <span className="text-rose-600">{userName || 'Petani'}</span>
              </h2>
              {userRole === 'admin' && (
                <span className="flex items-center gap-1 px-2 py-0.5 bg-rose-100 text-rose-600 rounded-md text-[10px] font-bold border border-rose-200 uppercase">
                  <ShieldCheck size={10} />
                  Admin
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">Mencegah gagal panen dengan kecerdasan buatan.</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-800">Lembang, Jawa Barat</p>
              <p className="text-xs text-slate-500">24°C • Berawan</p>
            </div>
            
            <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
              {userName ? (
                <div className="flex items-center gap-3 group cursor-pointer" onClick={onOpenLogin}>
                  <div className="w-10 h-10 rounded-full bg-rose-50 border-2 border-rose-200 flex items-center justify-center text-rose-600 font-bold shadow-sm transition-transform group-hover:scale-105">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onLogout(); }}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                    title="Keluar"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={onOpenLogin}
                  className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-rose-200 hover:bg-rose-700 transition-all"
                >
                  <UserIcon size={16} />
                  Login
                </button>
              )}
            </div>
          </div>
        </header>
        
        <div className="p-8">
          {children}
        </div>
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-3 z-50">
        <Link to="/" className="p-2 text-slate-500 hover:text-rose-600"><LayoutDashboard size={24} /></Link>
        <Link to="/diagnose" className="p-2 text-slate-500 hover:text-rose-600"><Stethoscope size={24} /></Link>
        <Link to="/scheduler" className="p-2 text-slate-500 hover:text-rose-600"><CalendarClock size={24} /></Link>
        <Link to="/consult" className="p-2 text-slate-500 hover:text-rose-600"><MessageSquare size={24} /></Link>
      </nav>
    </div>
  );
};

export default Layout;
