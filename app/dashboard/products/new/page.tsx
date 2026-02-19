"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ChevronLeft, Save, UploadCloud, Image as ImageIcon, 
  Plus, Trash2, GripVertical, CheckCircle2, DollarSign, 
  Layers, FileText, Globe, Eye
} from "lucide-react";

export default function AddProductPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  // State Form Data
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    discountPrice: "",
    description: "",
    category: "E-book",
    status: "draft", // active, draft, archived
  });

  // State Dynamic Features (Keunggulan Produk)
  const [features, setFeatures] = useState([""]); 

  // Handlers
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addFeature = () => setFeatures([...features, ""]);
  
  const removeFeature = (index: number) => {
    if (features.length > 1) {
      setFeatures(features.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulasi API Call
    setTimeout(() => {
      setIsLoading(false);
      alert("Produk berhasil disimpan!");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 pb-20">
      
      {/* --- HEADER STICKY --- */}
      <div className="sticky top-0 z-30 bg-slate-50/80 dark:bg-[#09090b]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard/products"
              className="p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-slate-500" />
            </Link>
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">Tambah Produk Baru</h1>
              <p className="text-xs text-slate-500">Lengkapi detail produk digital Anda.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              type="button" 
              className="hidden sm:flex px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-medium hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            >
              Simpan Draft
            </button>
            <button 
              type="submit" 
              disabled={isLoading}
              className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-full text-sm shadow-lg flex items-center gap-2 hover:opacity-90 transition-all disabled:opacity-70"
            >
              {isLoading ? "Menyimpan..." : <><Save className="w-4 h-4" /> Terbitkan</>}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- KOLOM KIRI (Main Content) --- */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. Informasi Dasar */}
          <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 lg:p-8 shadow-sm">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-500" /> Informasi Produk
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nama Produk</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: E-book Panduan Belajar React"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all font-medium"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Deskripsi Lengkap</label>
                <textarea 
                  rows={6}
                  placeholder="Jelaskan apa yang akan didapatkan pembeli..."
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none leading-relaxed"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
                <p className="text-xs text-slate-400 mt-2 text-right">Markdown supported.</p>
              </div>
            </div>
          </div>

          {/* 2. Harga */}
          <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 lg:p-8 shadow-sm">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-500" /> Harga Jual
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Harga Normal (Rp)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                  <input 
                    type="number" 
                    required
                    placeholder="0"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all font-bold text-lg"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Harga Coret (Opsional)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                  <input 
                    type="number" 
                    placeholder="0"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-500 line-through"
                    value={formData.discountPrice}
                    onChange={(e) => setFormData({...formData, discountPrice: e.target.value})}
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Isi jika ingin menampilkan diskon.</p>
              </div>
            </div>
          </div>

          {/* 3. Fitur / Keunggulan */}
          <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 lg:p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-500" /> Poin Keunggulan
              </h3>
              <button 
                type="button"
                onClick={addFeature}
                className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Tambah Baris
              </button>
            </div>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-3 group">
                  <div className="pt-3 text-slate-300 cursor-grab active:cursor-grabbing">
                    <GripVertical className="w-5 h-5" />
                  </div>
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      placeholder={`Keunggulan produk ${index + 1}`}
                      className="w-full pl-4 pr-10 py-3 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all text-sm"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                    />
                    {features.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* --- KOLOM KANAN (Sidebar Settings) --- */}
        <div className="space-y-8">
          
          {/* 1. Media Upload */}
          <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-4">Media Produk</h3>
            
            {/* Cover Image */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Cover / Thumbnail</label>
              <div className="aspect-video rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#1a1a1a] hover:bg-slate-100 dark:hover:bg-[#252525] transition-colors cursor-pointer flex flex-col items-center justify-center text-center p-4 group">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <p className="text-xs text-slate-500 font-medium">Klik untuk upload gambar</p>
                <p className="text-[10px] text-slate-400 mt-1">PNG, JPG (Max. 2MB)</p>
              </div>
            </div>

            {/* File Product */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">File Produk Digital</label>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#1a1a1a] p-4 flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs font-bold truncate text-slate-700 dark:text-white">Belum ada file</p>
                  <p className="text-[10px] text-slate-500">PDF, ZIP, MP4</p>
                </div>
                <button type="button" className="text-xs font-bold text-purple-600 hover:underline">Upload</button>
              </div>
            </div>
          </div>

          {/* 2. Pengaturan */}
          <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-4">Pengaturan</h3>
            
            <div className="space-y-4">
              {/* Kategori */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Kategori</label>
                <div className="relative">
                  <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select 
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-purple-500 appearance-none"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option>E-book</option>
                    <option>Course</option>
                    <option>Template</option>
                    <option>Software</option>
                    <option>Jasa</option>
                  </select>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Status Publikasi</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select 
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-purple-500 appearance-none"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="active">Publik (Aktif)</option>
                    <option value="draft">Draft (Disembunyikan)</option>
                    <option value="archived">Arsip</option>
                  </select>
                </div>
              </div>

              {/* Tombol Preview */}
              <div className="pt-2">
                <button type="button" className="w-full py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1a1a1a] flex items-center justify-center gap-2 transition-colors">
                  <Eye className="w-3 h-3" /> Lihat Preview Halaman
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </form>
  );
}  