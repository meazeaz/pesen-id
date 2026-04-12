"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { 
  ChevronLeft, Save, Image as ImageIcon, 
  Plus, Trash2, GripVertical, CheckCircle2, DollarSign, 
  Layers, FileText, Globe
} from "lucide-react";

import { createProduct } from "@/app/actions/product";
import { UploadDropzone } from "@/utils/uploadthing"; 

export default function AddProductPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); 
  
  // State Form Data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "E-book",
    status: "active",
    imageUrl: "", 
    fileUrl: "",
    fileSize: 0,  
  });

  // 👇 FITUR BARU: State terpisah untuk tampilan Harga (Format Rupiah)
  const [priceDisplay, setPriceDisplay] = useState("");
  const [discountDisplay, setDiscountDisplay] = useState("");

  const [features, setFeatures] = useState([""]); 
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // 👇 FITUR BARU: Fungsi untuk memformat angka otomatis pakai titik (100.000)
  const handlePriceFormat = (value: string, setter: (val: string) => void) => {
    const rawValue = value.replace(/[^0-9]/g, ""); // Buang semua huruf & titik
    if (rawValue) {
      setter(new Intl.NumberFormat("id-ID").format(parseInt(rawValue)));
    } else {
      setter("");
    }
  };

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

  // --- FUNGSI SUBMIT (SIMPAN DATA) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) return alert("Mohon upload gambar cover produk dulu ya!");
    if (!formData.fileUrl) return alert("Mohon upload file digital (PDF/ZIP) produknya!");

    setIsLoading(true);

    try {
      // 👇 Bersihkan titik dari harga sebelum dikirim ke database
      const rawPrice = parseInt(priceDisplay.replace(/[^0-9]/g, "")) || 0;
      const rawDiscount = discountDisplay ? parseInt(discountDisplay.replace(/[^0-9]/g, "")) : null;

      const payload = {
        title: formData.title,
        description: formData.description,
        price: rawPrice, 
        discountPrice: rawDiscount,
        category: formData.category,
        status: formData.status,
        features: features.filter(f => f.trim() !== ""),
        imageUrl: formData.imageUrl,
        fileUrl: formData.fileUrl,
        fileSize: formData.fileSize,
      };

      const response = await createProduct(payload);

      if (response && response.success) {
        alert("🎉 Hore! Produk berhasil diterbitkan ke database.");
        router.push("/dashboard/products");
        router.refresh(); 
      } else {
        alert(`❌ Gagal: ${response.message}`);
      }

    } catch (error) {
      console.error(error);
      alert("❌ Gagal menyimpan produk. Silakan coba lagi.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 pb-20 animate-in fade-in duration-500">
      
      {/* --- HEADER STICKY --- */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard/products"
              className="p-2 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group"
            >
              <ChevronLeft className="w-5 h-5 text-slate-500 group-hover:text-purple-600 transition-colors" />
            </Link>
            <div>
              <h1 className="text-xl font-black flex items-center gap-2">Jual Produk Baru</h1>
              <p className="text-xs text-slate-500 font-medium">Lengkapi etalase digital Anda.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              type="submit" 
              disabled={isLoading}
              className="px-8 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl text-sm shadow-lg shadow-purple-500/30 flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:hover:scale-100"
            >
              {isLoading ? "Menyimpan..." : <><Save className="w-4 h-4" /> Terbitkan Produk</>}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- KOLOM KIRI (Main Content) --- */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. Informasi Dasar */}
          <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 lg:p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <FileText className="w-5 h-5 text-purple-500" /> Informasi Produk
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Nama Produk / Judul</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: E-book Panduan Belajar React"
                  className="w-full px-4 py-3.5 bg-slate-50 dark:bg-black border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all font-black text-lg text-slate-900 dark:text-white"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Deskripsi Lengkap</label>
                <textarea 
                  rows={6}
                  required
                  placeholder="Jelaskan apa yang akan didapatkan pembeli..."
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-black border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none leading-relaxed text-sm font-medium"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* 2. Harga */}
          <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 lg:p-8 shadow-sm">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <DollarSign className="w-5 h-5 text-green-500 bg-green-100 dark:bg-green-900/30 rounded-full p-0.5" /> Harga Jual
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Harga Normal (Rp)</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-purple-500 transition-colors">Rp</span>
                  <input 
                    type="text" 
                    required
                    placeholder="0"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-black border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all font-black text-xl text-slate-900 dark:text-white"
                    value={priceDisplay}
                    onChange={(e) => handlePriceFormat(e.target.value, setPriceDisplay)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Harga Coret (Opsional)</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-purple-500 transition-colors">Rp</span>
                  <input 
                    type="text" 
                    placeholder="0"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-black border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-500 line-through font-bold text-lg"
                    value={discountDisplay}
                    onChange={(e) => handlePriceFormat(e.target.value, setDiscountDisplay)}
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2 ml-1">Untuk efek diskon palsu</p>
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
                className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors"
              >
                <Plus className="w-4 h-4" /> Tambah Poin
              </button>
            </div>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-3 group items-center">
                  <div className="text-slate-300 hover:text-purple-500 cursor-grab active:cursor-grabbing transition-colors">
                    <GripVertical className="w-5 h-5" />
                  </div>
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      placeholder={`Contoh: Mendapatkan 5 Template Premium`}
                      className="w-full pl-4 pr-10 py-3 bg-slate-50 dark:bg-black border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all text-sm font-medium"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                    />
                    {features.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
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
          
          {/* 1. Media Upload (Gambar & File) */}
          <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <h3 className="font-black text-sm text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-6 border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Media File
            </h3>
            
            {/* Upload Gambar */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Cover Thumbnail</label>
              
              {previewUrl ? (
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md group">
                   <img src={previewUrl} alt="Cover" className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
                      <ImageIcon className="w-8 h-8 text-white/50 mb-2" />
                      <button type="button" onClick={() => { setFormData({...formData, imageUrl: ""}); setPreviewUrl(null); }} className="px-4 py-2 bg-red-500 text-white font-bold rounded-xl text-xs hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30">Hapus Cover</button>
                   </div>
                </div>
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res: any) => {
                    setFormData({...formData, imageUrl: res[0].url});
                    setPreviewUrl(res[0].url);
                  }}
                  onUploadError={(error: any) => alert(`ERROR! ${error.message}`)}
                  className="border-dashed border-2 border-slate-300 dark:border-slate-700 rounded-2xl p-8 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all ut-label:text-purple-500 ut-button:bg-purple-600 ut-button:ut-readying:bg-purple-500/50"
                />
              )}
            </div>

            {/* Upload File Digital */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">File Rahasia (Yang Dijual)</label>
              
              {formData.fileUrl ? (
                <div className="rounded-2xl border border-green-500/30 bg-green-50 dark:bg-green-900/10 p-4 flex flex-col gap-3 transition-colors shadow-inner">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-green-100 dark:bg-green-900/50 text-green-600 rounded-xl">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-xs font-black truncate text-green-700 dark:text-green-400">Tersimpan di Cloud!</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono line-clamp-1 mt-0.5">{formData.fileUrl}</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => setFormData({...formData, fileUrl: ""})} className="w-full py-2 bg-white dark:bg-black text-xs font-bold text-red-500 border border-red-200 dark:border-red-900/50 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">Ganti File</button>
                </div>
              ) : (
                <div className="bg-slate-50 dark:bg-black border border-slate-200 dark:border-slate-800 rounded-2xl p-2 relative">
                   <div className="absolute top-2 right-2 flex items-center gap-1 text-[9px] font-black text-amber-600 bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded-full z-10 uppercase tracking-widest"><Globe className="w-3 h-3" /> Wajib</div>
                   <UploadDropzone
                     endpoint="productFileUploader"
                     onClientUploadComplete={(res: any) => {
                       const uploadedSize = Number(res[0]?.file?.size ?? res[0]?.size ?? 0);
                       setFormData({...formData, fileUrl: res[0].url, fileSize: uploadedSize});
                     }}
                     onUploadError={(error: any) => alert(`ERROR! ${error.message}`)}
                     className="border-dashed border-2 border-slate-300 dark:border-slate-700 rounded-xl p-6 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all ut-label:text-blue-500 ut-button:bg-blue-600 m-0"
                   />
                </div>
              )}
            </div>
          </div>

          {/* 2. Pengaturan */}
          <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <h3 className="font-black text-sm text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-6 border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
              <Layers className="w-4 h-4" /> Kategori & Visibilitas
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Jenis Produk</label>
                <div className="relative">
                  <select 
                    className="w-full pl-4 pr-10 py-3 bg-slate-50 dark:bg-black border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500 appearance-none font-bold text-slate-900 dark:text-white cursor-pointer transition-colors hover:border-purple-300"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="E-book">📚 E-book & Tulisan</option>
                    <option value="Course">🎓 Video Course</option>
                    <option value="Template">🧩 Template (Notion/Excel)</option>
                    <option value="Software">💻 Software / Source Code</option>
                    <option value="Aset Design">🎨 Aset Desain (Figma/PSD)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Status Penjualan</label>
                <div className="relative">
                  <select 
                    className="w-full pl-4 pr-10 py-3 bg-slate-50 dark:bg-black border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500 appearance-none font-bold text-slate-900 dark:text-white cursor-pointer transition-colors hover:border-purple-300"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="active">🟢 Publik (Bisa Dibeli)</option>
                    <option value="draft">🟡 Draft (Sembunyikan)</option>
                    <option value="archived">🔴 Arsip (Tutup Penjualan)</option>
                  </select>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </form>
  );
}