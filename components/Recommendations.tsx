
import React, { useState } from 'react';
import { Sprout, Beaker, ShieldAlert, ChevronRight, Star, Info } from 'lucide-react';
import { RecommendationItem } from '../types';

const recommendations: RecommendationItem[] = [
  {
    id: '1',
    type: 'seed',
    name: 'Sweet Charlie',
    description: 'Varietas unggul yang sangat manis dan tahan terhadap penyakit antraknosa.',
    tags: ['Genjah', 'Tahan Hama', 'Manis'],
    benefit: 'Hasil panen stabil di dataran rendah maupun tinggi.'
  },
  {
    id: '2',
    type: 'seed',
    name: 'Albion',
    description: 'Bentuk buah besar, rasa konsisten, dan tahan lama setelah dipetik.',
    tags: ['Premium', 'Ukuran Besar'],
    benefit: 'Sangat diminati pasar supermarket karena daya simpan tinggi.'
  },
  {
    id: '3',
    type: 'fertilizer',
    name: 'NPK Mutiara 16-16-16',
    description: 'Pupuk seimbang untuk pertumbuhan vegetatif yang kuat dan pembungaan maksimal.',
    tags: ['Fase Awal', 'Fase Bunga'],
    benefit: 'Mempercepat pertumbuhan akar dan batang stroberi.'
  },
  {
    id: '4',
    type: 'fertilizer',
    name: 'Calnit (Kalsium Nitrat)',
    description: 'Mencegah busuk ujung buah (tip burn) dan meningkatkan kualitas kulit buah.',
    tags: ['Pencegah Busuk', 'Kualitas'],
    benefit: 'Membuat buah lebih berkilau dan tekstur lebih renyah.'
  },
  {
    id: '5',
    type: 'pesticide',
    name: 'Antracol 70WP',
    description: 'Fungisida kontak untuk mencegah jamur bercak daun dan antraknosa.',
    tags: ['Fungisida', 'Pencegahan'],
    benefit: 'Melindungi tanaman dari serangan jamur di musim hujan.'
  },
  {
    id: '6',
    type: 'pesticide',
    name: 'Abacel 18EC',
    description: 'Efektif membasmi hama Thrips dan Tungau (Mite) yang sering menyerang pucuk.',
    tags: ['Insektisida', 'Hama Pucuk'],
    benefit: 'Tanaman bebas dari daun keriting akibat serangan thrips.'
  }
];

const Recommendations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'seed' | 'fertilizer' | 'pesticide'>('all');

  const filtered = activeTab === 'all' 
    ? recommendations 
    : recommendations.filter(item => item.type === activeTab);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Panduan Kebutuhan Tani</h2>
          <p className="text-slate-500 mt-2">Pilihan bibit, nutrisi, dan proteksi terbaik rekomendasi pakar.</p>
        </div>
        
        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'all' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Semua
          </button>
          <button 
            onClick={() => setActiveTab('seed')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'seed' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Bibit
          </button>
          <button 
            onClick={() => setActiveTab('fertilizer')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'fertilizer' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Pupuk
          </button>
          <button 
            onClick={() => setActiveTab('pesticide')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'pesticide' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Obat
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div key={item.id} className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-rose-100 transition-all p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-4 rounded-2xl ${
                item.type === 'seed' ? 'bg-emerald-50 text-emerald-600' :
                item.type === 'fertilizer' ? 'bg-blue-50 text-blue-600' :
                'bg-rose-50 text-rose-600'
              }`}>
                {item.type === 'seed' ? <Sprout size={24} /> :
                 item.type === 'fertilizer' ? <Beaker size={24} /> :
                 <ShieldAlert size={24} />}
              </div>
              <div className="flex text-amber-400">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-2">{item.name}</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {item.tags.map((tag, i) => (
                <span key={i} className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded-lg">
                  {tag}
                </span>
              ))}
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <div className="flex items-center gap-2 mb-1">
                <Info size={14} className="text-rose-500" />
                <span className="text-[10px] font-bold text-slate-700 uppercase">Manfaat Utama</span>
              </div>
              <p className="text-xs text-slate-600">{item.benefit}</p>
            </div>

            <button className="w-full mt-6 py-3 bg-white border-2 border-slate-100 text-slate-600 group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600 font-bold rounded-xl transition-all flex items-center justify-center gap-2">
              Lihat Detail Penggunaan
              <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>
      
      <div className="bg-rose-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-rose-200">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">Butuh Penjelasan Lebih Lanjut?</h3>
            <p className="text-rose-100 leading-relaxed">
              Konsultasikan kondisi lahan Anda dengan Pakar AI kami untuk mendapatkan dosis pemupukan yang presisi sesuai dengan fase pertumbuhan tanaman Anda.
            </p>
            <button className="mt-8 px-8 py-4 bg-white text-rose-600 font-bold rounded-2xl hover:bg-rose-50 transition-all shadow-lg">
              Konsultasi Dosis Sekarang
            </button>
          </div>
          <div className="hidden lg:flex justify-center">
            <div className="w-48 h-48 bg-rose-500 rounded-full flex items-center justify-center border-4 border-rose-400">
              <Beaker size={80} className="text-white opacity-80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
