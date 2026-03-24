"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ChevronLeft, Save, UploadCloud, Image as ImageIcon, 
  Plus, Trash2, GripVertical, CheckCircle2, DollarSign, 
  Layers, FileText, Globe, Eye, ArrowLeft, AlertCircle
} from "lucide-react";

import { updateProduct, deleteProduct } from "@/app/actions/product";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EditProductClient({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false); 
  const [isDeleting, setIsDeleting] = useState(false); 
  
  // State Form Data
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    price: initialData.price?.toString() || "",
    discountPrice: initialData.discountPrice?.toString() || "",
    description: initialData.description || "",
    category: initialData.category || "E-book",
    status: initialData.status || "active", 
  });

  const [features, setFeatures] = useState<string[]>(
    initialData.features?.length > 0 ? initialData.features : [""]
  );

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file)); 
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        discountPrice: formData.discountPrice ? Number(formData.discountPrice) : null,
        category: formData.category,
        status: formData.status,
        features: features.filter(f => f.trim() !== ""),
      };

      const response = await updateProduct(initialData.id, payload);

      if (response && response.success) {
        alert("✅ Perubahan berhasil disimpan!");
        router.push("/dashboard/products");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      alert("❌ Gagal menyimpan perubahan.");
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if(confirm("Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak bisa dibatalkan.")) {
       setIsDeleting(true);
       try {
         const response = await deleteProduct(initialData.id);
         if (response && response.success) {
           alert("🗑️ Produk berhasil dihapus.");
           router.push("/dashboard/products");
           router.refresh();
         }
       } catch (error) {
         console.error(error);
         alert("Gagal menghapus produk.");
         setIsDeleting(false);
       }
    }
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
              <p className="text-xs text-slate-500 font-mono">ID: {initialData.id.slice(0, 8)}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link 
               href={`/p/${initialData.id}`} 
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
                    max="2000000000"
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
                    max="2000000000"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-500 line-through font-medium"
                    value={formData.discountPrice}
                    onChange={(e) => setFormData({...formData, discountPrice: e.target.value})}
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Kosongkan jika tidak ada diskon.</p>
              </div>
            </div>
          </div>

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
          
          <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-4">Media Produk</h3>
            
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Cover / Thumbnail</label>
              
              <label className="aspect-video relative overflow-hidden rounded-2xl border-2 border-dashed border-purple-500/30 bg-slate-50 dark:bg-[#1a1a1a] hover:bg-slate-100 dark:hover:bg-[#252525] transition-colors cursor-pointer flex flex-col items-center justify-center text-center group">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageSelect}
                />

                {previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={previewUrl} alt="Preview Thumbnail" className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                    📘
                  </div>
                )}
                
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <UploadCloud className="w-8 h-8 text-white mb-2" />
                    <span className="text-white text-xs font-bold">Ganti Gambar</span>
                </div>
              </label>
              <p className="text-[10px] text-slate-400 mt-2">Format: PNG, JPG. Maks 2MB.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">File Produk Digital</label>
              <div className="rounded-2xl border border-green-500/30 bg-green-50 dark:bg-green-900/10 p-4 flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs font-bold truncate text-slate-700 dark:text-white">File Tersimpan</p>
                  <p className="text-[10px] text-slate-500">PDF, ZIP, MP4</p>
                </div>
                <button type="button" className="text-xs font-bold text-slate-500 hover:text-red-500 transition-colors">
                   <Trash2 className="w-4 h-4"/>
                </button>
              </div>
              <button type="button" className="w-full mt-3 py-2 text-xs font-bold text-purple-600 dark:text-purple-400 border border-dashed border-purple-500/30 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                 Upload File Baru
              </button>
            </div>
          </div>

          {/* 2. Pengaturan (DI SINI "JASA" DIUBAH JADI "ASET DESIGN") */}
          <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-4">Pengaturan</h3>
            
            <div className="space-y-4">
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
                    {/* 👇 INI YANG KITA UBAH! */}
                    <option value="Aset Design">Aset Design</option>
                  </select>
                </div>
              </div>

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
               disabled={isDeleting}
               className="w-full py-2.5 bg-white dark:bg-red-950 border border-red-200 dark:border-red-900 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50"
             >
                {isDeleting ? "Menghapus..." : "Hapus Produk Ini"}
             </button>
          </div>

        </div>

      </div>
    </form>
  );
}