"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ChevronLeft, Save, UploadCloud, Image as ImageIcon, 
  Plus, Trash2, GripVertical, CheckCircle2, DollarSign, 
  Layers, FileText, Globe, Eye, ArrowLeft, Loader2, AlertCircle
} from "lucide-react";

// Tipe Data Params (Next.js 15)
type Props = {
  params: Promise<{ id: string }>;
};

export default function EditProductPage({ params }: Props) {
  // Unwrapping params (Next.js 15 requirement)
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  
  const router = useRouter();
  const [isLoadingData, setIsLoadingData] = useState(true); // Loading awal fetch data
  const [isSaving, setIsSaving] = useState(false); // Loading saat simpan
  
  // State Form Data
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    discountPrice: "",
    description: "",
    category: "",
    status: "", 
  });

  // State Dynamic Features
  const [features, setFeatures] = useState<string[]>([]);

  // --- 1. SIMULASI FETCH DATA DARI DATABASE ---
  useEffect(() => {
    // Ceritanya kita request ke API backend cari produk by ID
    const fetchData = () => {
      setTimeout(() => {
        // Data Dummy (Seolah-olah dari DB)
        setFormData({
          title: "E-book Belajar Next.js 14 Pemula sampai Mahir",
          price: "150000",
          discountPrice: "99000",
          description: "Panduan lengkap mempelajari Next.js App Router, Server Actions, dan Prisma. Cocok untuk pemula yang ingin menjadi Fullstack Developer.\n\nApa yang akan Anda pelajari?\n- Dasar React\n- Routing System\n- Deployment",
          category: "E-book",
          status: "active",
        });
        setFeatures([
          "150+ Halaman PDF High Quality",
          "Source Code Project Lengkap",
          "Akses Update Gratis Selamanya",
          "Grup Diskusi Premium"
        ]);
        setIsLoadingData(false);
      }, 1000); // Delay 1 detik biar kerasa loading-nya
    };

    fetchData();
  }, [productId]);

  // --- HANDLERS ---
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulasi Update
    setTimeout(() => {
      setIsSaving(false);
      alert("Perubahan berhasil disimpan!");
      router.push("/dashboard/products"); // Redirect balik ke list
    }, 1500);
  };

  const handleDelete = () => {
    if(confirm("Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak bisa dibatalkan.")) {
       // Logic hapus disini
       alert("Produk dihapus.");
       router.push("/dashboard/products");
    }
  }

  // --- TAMPILAN LOADING AWAL ---
  if (isLoadingData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#09090b] text-slate-500">
        <Loader2 className="w-10 h-10 animate-spin text-purple-600 mb-4" />
        <p>Memuat data produk...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="min-h-screen bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 pb-20">
      
      {/* --- HEADER STICKY --- */}
      <div className="sticky top-0 z-30 bg-slate-50/80 dark:bg-[#09090b]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard/products"
              className="p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-500" />
            </Link>
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">Edit Produk</h1>
              <p className="text-xs text-slate-500 font-mono">ID: {productId}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link 
               href={`/${productId}`} // Simulasi link preview publik
               target="_blank"
               className="hidden sm:flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-medium hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-600 dark:text-slate-300"
            >
              <Eye className="w-4 h-4" /> Preview
            </Link>
            <button 
              type="submit" 
              disabled={isSaving}
              className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-full text-sm shadow-lg flex items-center gap-2 hover:opacity-90 transition-all disabled:opacity-70"
            >
              {isSaving ? "Menyimpan..." : <><Save className="w-4 h-4" /> Simpan Perubahan</>}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- KOLOM KIRI (Main Content) --- */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. Informasi Dasar */}
          <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 lg:p-8 shadow-sm">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
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
                  rows={8}
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
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
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
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Harga Coret (Diskon)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                  <input 
                    type="number" 
                    placeholder="0"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-500 line-through font-medium"
                    value={formData.discountPrice}
                    onChange={(e) => setFormData({...formData, discountPrice: e.target.value})}
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Kosongkan jika tidak ada diskon.</p>
              </div>
            </div>
          </div>

          {/* 3. Fitur / Keunggulan */}
          <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 lg:p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-500" /> Poin Keunggulan
              </h3>
              <button 
                type="button"
                onClick={addFeature}
                className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Tambah Baris
              </button>
            </div>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-3 group animate-in slide-in-from-bottom-2">
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
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
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
          
          {/* 1. Media Upload (Dengan Preview) */}
          <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-4">Media Produk</h3>
            
            {/* Cover Image Preview */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Cover / Thumbnail</label>
              
              {/* Simulasi Image Preview */}
              <div className="relative group">
                 <div className="aspect-video rounded-2xl border-2 border-dashed border-purple-500/30 bg-slate-50 dark:bg-[#1a1a1a] overflow-hidden relative">
                    {/* Placeholder Image (Ceritanya sudah ada gambar) */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                       📘
                    </div>
                    
                    {/* Overlay Edit */}
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <UploadCloud className="w-8 h-8 text-white mb-2" />
                        <span className="text-white text-xs font-bold">Ganti Gambar</span>
                    </div>
                 </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-2">Format: PNG, JPG. Maks 2MB.</p>
            </div>

            {/* File Product */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">File Produk Digital</label>
              <div className="rounded-2xl border border-green-500/30 bg-green-50 dark:bg-green-900/10 p-4 flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs font-bold truncate text-slate-700 dark:text-white">ebook-nextjs-v1.pdf</p>
                  <p className="text-[10px] text-slate-500">25.4 MB • PDF</p>
                </div>
                <button type="button" className="text-xs font-bold text-slate-500 hover:text-red-500 transition-colors">
                   <Trash2 className="w-4 h-4"/>
                </button>
              </div>
              <button className="w-full mt-3 py-2 text-xs font-bold text-purple-600 dark:text-purple-400 border border-dashed border-purple-500/30 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                 Upload File Baru
              </button>
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
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-purple-500 appearance-none font-medium"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="E-book">E-book</option>
                    <option value="Course">Course</option>
                    <option value="Template">Template</option>
                    <option value="Software">Software</option>
                    <option value="Jasa">Jasa</option>
                  </select>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Status Publikasi</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select 
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-purple-500 appearance-none font-medium"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="active">Publik (Aktif)</option>
                    <option value="draft">Draft (Disembunyikan)</option>
                    <option value="archived">Arsip</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Danger Zone */}
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-3xl p-6 shadow-sm">
             <h3 className="font-bold text-sm text-red-600 dark:text-red-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Zona Berbahaya
             </h3>
             <p className="text-xs text-red-500/80 mb-4 leading-relaxed">
                Menghapus produk akan menghilangkan data penjualan dan statistik terkait secara permanen.
             </p>
             <button 
               type="button" 
               onClick={handleDelete}
               className="w-full py-2.5 bg-white dark:bg-red-950 border border-red-200 dark:border-red-900 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
             >
                Hapus Produk Ini
             </button>
          </div>

        </div>

      </div>
    </form>
  );
}