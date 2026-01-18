
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Thermometer, Droplets, Sun, AlertTriangle, TrendingUp } from 'lucide-react';

const mockData = [
  { time: '06:00', temp: 18, humidity: 85 },
  { time: '09:00', temp: 22, humidity: 75 },
  { time: '12:00', temp: 26, humidity: 60 },
  { time: '15:00', temp: 25, humidity: 65 },
  { time: '18:00', temp: 21, humidity: 80 },
  { time: '21:00', temp: 19, humidity: 88 },
];

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string, subValue: string, color: string }> = ({ icon, label, value, subValue, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <div className={`p-3 rounded-xl ${color}`}>
        {icon}
      </div>
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</span>
    </div>
    <div>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      <p className="text-sm text-slate-500">{subValue}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Thermometer className="text-orange-600" />} 
          label="Suhu" 
          value="24°C" 
          subValue="Optimal: 18-25°C"
          color="bg-orange-50"
        />
        <StatCard 
          icon={<Droplets className="text-blue-600" />} 
          label="Kelembaban" 
          value="72%" 
          subValue="Target: 60-80%"
          color="bg-blue-50"
        />
        <StatCard 
          icon={<Sun className="text-yellow-600" />} 
          label="Intensitas Cahaya" 
          value="450 Lux" 
          subValue="Matahari Cerah"
          color="bg-yellow-50"
        />
        <StatCard 
          icon={<TrendingUp className="text-emerald-600" />} 
          label="Prediksi Panen" 
          value="12 Hari" 
          subValue="+2kg dari bulan lalu"
          color="bg-emerald-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Tren Kondisi Lingkungan (24 Jam Terakhir)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="temp" stroke="#f97316" fillOpacity={1} fill="url(#colorTemp)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="text-rose-600" />
            <h3 className="text-lg font-bold text-rose-900">Peringatan Dini</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-rose-500">
              <p className="text-sm font-bold text-slate-800 mb-1">Kelembaban Tinggi Terdeteksi</p>
              <p className="text-xs text-slate-600">Risiko jamur meningkat. Pastikan ventilasi terbuka di area Green House B.</p>
              <p className="text-[10px] text-slate-400 mt-2 font-mono">Baru saja</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-amber-500 opacity-75">
              <p className="text-sm font-bold text-slate-800 mb-1">Jadwal Pemupukan Kalsium</p>
              <p className="text-xs text-slate-600">Kurangnya kalsium dapat menyebabkan ujung daun terbakar (tip burn).</p>
              <p className="text-[10px] text-slate-400 mt-2 font-mono">2 jam yang lalu</p>
            </div>
          </div>
          <button className="w-full mt-6 py-3 bg-white border border-rose-200 text-rose-600 font-semibold rounded-xl hover:bg-rose-100 transition-colors">
            Lihat Semua Riwayat
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
