
import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Bell, Plus, Trash2, Power, CheckCircle2 } from 'lucide-react';
import { WateringAlarm } from '../types';

const Scheduler: React.FC = () => {
  const [alarms, setAlarms] = useState<WateringAlarm[]>(() => {
    const saved = localStorage.getItem('berryguard_alarms');
    return saved ? JSON.parse(saved) : [
      { id: '1', time: '07:00', days: ['Senin', 'Rabu', 'Jumat'], isActive: true, label: 'Penyiraman Pagi' },
      { id: '2', time: '16:30', days: ['Selasa', 'Kamis', 'Sabtu'], isActive: false, label: 'Penyiraman Sore' }
    ];
  });

  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  useEffect(() => {
    localStorage.setItem('berryguard_alarms', JSON.stringify(alarms));
  }, [alarms]);

  const toggleAlarm = (id: string) => {
    setAlarms(prev => prev.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a));
  };

  const deleteAlarm = (id: string) => {
    setAlarms(prev => prev.filter(a => a.id !== id));
  };

  const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const monthDays = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Penjadwalan Otomatis</h2>
          <p className="text-slate-500 mt-2">Atur waktu penyiraman agar tanaman tetap terhidrasi dengan baik.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-2xl font-bold shadow-lg shadow-rose-200 hover:bg-rose-700 transition-all">
          <Plus size={20} />
          Tambah Jadwal Baru
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar View */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                  <CalendarIcon size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Kalender Aktivitas</h3>
                  <p className="text-xs text-slate-400">Oktober 2023</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">{'<'}</button>
                <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">{'>'}</button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {days.map(d => (
                <div key={d} className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest py-2">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-3">
              {monthDays.map(d => {
                const isToday = d === new Date().getDate();
                const hasTask = [3, 7, 10, 15, 20, 25].includes(d);
                return (
                  <button 
                    key={d} 
                    onClick={() => setSelectedDay(d)}
                    className={`aspect-square rounded-2xl flex flex-col items-center justify-center relative transition-all border ${
                      isToday 
                        ? 'bg-rose-600 text-white border-rose-600 shadow-lg shadow-rose-100' 
                        : selectedDay === d
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-white text-slate-600 border-slate-50 hover:border-slate-200'
                    }`}
                  >
                    <span className="text-sm font-bold">{d}</span>
                    {hasTask && !isToday && (
                      <div className="absolute bottom-2 w-1 h-1 bg-rose-400 rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-emerald-50 rounded-[2.5rem] p-8 border border-emerald-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-200">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h4 className="font-bold text-emerald-900 mb-1">Tips Hari Ini</h4>
                <p className="text-sm text-emerald-700 leading-relaxed">
                  Suhu hari ini cukup terik (28°C), pertimbangkan untuk menyiram ekstra 10% dari volume biasanya pada sore hari untuk mencegah penguapan berlebih.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Alarm List */}
        <div className="space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 h-full">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <Bell size={20} />
              </div>
              <h3 className="font-bold text-slate-800">Alarm Penyiraman</h3>
            </div>

            <div className="space-y-4">
              {alarms.map((alarm) => (
                <div 
                  key={alarm.id} 
                  className={`p-5 rounded-3xl border transition-all ${
                    alarm.isActive 
                      ? 'bg-rose-50/50 border-rose-100' 
                      : 'bg-slate-50 border-slate-100 opacity-60'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <Clock size={16} className={alarm.isActive ? 'text-rose-500' : 'text-slate-400'} />
                      <span className={`text-2xl font-black ${alarm.isActive ? 'text-slate-800' : 'text-slate-400'}`}>
                        {alarm.time}
                      </span>
                    </div>
                    <button 
                      onClick={() => toggleAlarm(alarm.id)}
                      className={`p-2 rounded-xl transition-colors ${
                        alarm.isActive ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      <Power size={14} />
                    </button>
                  </div>
                  
                  <p className="text-xs font-bold text-slate-700 mb-2">{alarm.label}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {alarm.days.map(day => (
                      <span key={day} className="text-[10px] bg-white px-2 py-0.5 rounded-md border border-slate-100 text-slate-500">
                        {day}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-end pt-3 border-t border-slate-100/50">
                    <button 
                      onClick={() => deleteAlarm(alarm.id)}
                      className="text-slate-300 hover:text-rose-500 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {alarms.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-3xl">
                  <p className="text-sm text-slate-400 italic">Belum ada alarm diatur</p>
                </div>
              )}
            </div>

            <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Notifikasi Aktif</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <p className="text-xs text-slate-600">Terhubung dengan Speaker Kebun B</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
