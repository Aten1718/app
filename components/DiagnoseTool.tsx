
import React, { useState, useRef } from 'react';
import { Camera, Upload, RefreshCcw, CheckCircle2, AlertCircle } from 'lucide-react';
import { getDiagnosisFromImage } from '../services/geminiService';
import { DiagnosisResult } from '../types';

const DiagnoseTool: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setError(null);
    try {
      const base64 = selectedImage.split(',')[1];
      const diagnosis = await getDiagnosisFromImage(base64);
      setResult(diagnosis);
    } catch (err) {
      setError('Gagal menganalisis gambar. Pastikan koneksi internet stabil dan coba lagi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSelectedImage(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Diagnosa Pakar AI</h2>
          <p className="text-slate-500">Unggah foto daun atau buah stroberi Anda untuk mendapatkan diagnosa instan.</p>
        </div>

        {!selectedImage ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-rose-300 hover:bg-rose-50 transition-all group"
          >
            <div className="p-4 bg-rose-100 text-rose-600 rounded-2xl group-hover:scale-110 transition-transform">
              <Camera size={32} />
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-slate-700">Klik untuk unggah foto</p>
              <p className="text-sm text-slate-500">Format JPG, PNG (Maks 5MB)</p>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200">
              <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
              {!loading && !result && (
                <button 
                  onClick={reset}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-lg text-rose-600 shadow-lg hover:bg-white"
                >
                  Ganti Gambar
                </button>
              )}
            </div>

            {!result && !loading && (
              <button 
                onClick={analyzeImage}
                className="w-full py-4 bg-rose-600 text-white font-bold rounded-2xl shadow-xl shadow-rose-200 hover:bg-rose-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                Mulai Analisis Sekarang
              </button>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <RefreshCcw className="text-rose-600 animate-spin" size={48} />
                <p className="font-medium text-slate-600">Pakar AI sedang memeriksa tanaman Anda...</p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 flex items-center gap-3">
                <AlertCircle />
                <span>{error}</span>
              </div>
            )}

            {result && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
                <div className="flex items-center justify-between p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">{result.diseaseName}</h3>
                    <p className="text-emerald-700 font-medium">Tingkat Keyakinan: {(result.confidence * 100).toFixed(0)}%</p>
                  </div>
                  <CheckCircle2 className="text-emerald-600 w-12 h-12" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                      Gejala Terdeteksi
                    </h4>
                    <ul className="space-y-2">
                      {result.symptoms.map((s, i) => (
                        <li key={i} className="text-slate-600 text-sm flex gap-2">
                          <span className="text-rose-500">•</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      Tindakan Pengobatan
                    </h4>
                    <ul className="space-y-2">
                      {result.treatments.map((t, i) => (
                        <li key={i} className="text-slate-600 text-sm flex gap-2">
                          <span className="text-emerald-500">✓</span> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-800 mb-3">Langkah Pencegahan Kedepannya</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {result.preventions.map((p, i) => (
                      <li key={i} className="bg-white p-3 rounded-lg border border-slate-100 text-xs text-slate-600 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1 shrink-0"></span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={reset}
                  className="w-full py-3 border-2 border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-colors"
                >
                  Diagnosa Tanaman Lain
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnoseTool;
