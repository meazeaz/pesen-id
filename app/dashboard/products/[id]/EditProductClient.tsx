"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ChevronLeft, Save, UploadCloud, Image as ImageIcon, 
  Plus, Trash2, GripVertical, CheckCircle2, DollarSign, 
  Layers, FileText, Globe, Eye, AlertCircle, FileArchive
} from "lucide-react";

import { updateProduct, deleteProduct } from "@/app/actions/product";
import { UploadDropzone } from "@/utils/uploadthing"; // 👈 KITA IMPORT MESIN UPLOADNYA

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EditProductClient({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false); 
  const [isDeleting, setIsDeleting] = useState(false); 
  
  // State Form Data (Tarik dari database)
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    price: initialData.price?.toString() || "",
    discountPrice: initialData.discountPrice?.toString() || "",
    description: initialData.description || "",
    category: initialData.category || "E-book",
    status: initialData.status || "active",
    imageUrl: initialData.imageUrl || "", // 👈 Tarik Link Gambar Lama
    fileUrl: initialData.fileUrl || "",   // 👈 Tarik Link File Lama
  });

  const [features, setFeatures] = useState<string[]>(
    initialData.features?.length > 0 ? initialData.features : [""]
  );

  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData.imageUrl || null);

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) return alert("Mohon upload gambar cover produk dulu ya!");
    if (!formData.fileUrl) return alert("Mohon upload file digital (PDF/ZIP) produknya!");

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
        imageUrl: formData.imageUrl,
        fileUrl: formData.fileUrl,
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
              <ChevronLeft className="w-5 h-5 text-slate-500" />
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
          
          {/* UPLOAD MEDIA */}
          <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col sm:flex-row gap-8">
             
             {/* 1. Upload Cover Image */}
             <div className="flex-1">
                <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2"><ImageIcon className="w-4 h-4"/> Cover Produk</h3>
                {formData.imageUrl ? (
                   <div className="relative aspect-square sm:aspect-video rounded-2xl overflow-hidden border border-slate-200 group">
                      <img src={formData.imageUrl} alt="Cover" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <button type="button" onClick={() => { setFormData({...formData, imageUrl: ""}); setPreviewUrl(null); }} className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg text-xs">Hapus Cover</button>
                      </div>
                   </div>
                ) : (
                   <UploadDropzone
                      endpoint="imageUploader"
                      onClientUploadComplete={(res: any) => {
                        setFormData({...formData, imageUrl: res[0].url});
                        setPreviewUrl(res[0].url);
                        alert("Gambar berhasil diupload!");
                      }}
                      onUploadError={(error: any) => {
                        alert(`ERROR! ${error.message}`);
                      }}
                      className="border-dashed border-2 border-slate-300 dark:border-slate-700 rounded-2xl p-8 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors"
                    />
                )}
             </div>

             {/* 2. Upload File Digital */}
             <div className="flex-1">
                <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2"><FileArchive className="w-4 h-4"/> File Digital (PDF/ZIP)</h3>
                {formData.fileUrl ? (
                   <div className="h-full flex flex-col items-center justify-center bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-2xl p-6 text-center transition-colors">
                      <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
                         <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-bold text-green-700 dark:text-green-500 mb-1">File Tersimpan!</p>
                      <p className="text-xs text-slate-500 line-clamp-1 mb-4">{formData.fileUrl}</p>
                      <button type="button" onClick={() => setFormData({...formData, fileUrl: ""})} className="text-xs font-bold text-red-500 hover:underline">Ganti File</button>
                   </div>
                ) : (
                   <UploadDropzone
                      endpoint="productFileUploader"
                      onClientUploadComplete={(res: any) => {
                        setFormData({...formData, fileUrl: res[0].url});
                        alert("File digital berhasil disimpan!");
                      }}
                      onUploadError={(error: any) => {
                        alert(`ERROR! ${error.message}`);
                      }}
                      className="border-dashed border-2 border-slate-300 dark:border-slate-700 rounded-2xl p-8 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors ut-label:text-blue-500 ut-button:bg-blue-600"
                    />
                )}
             </div>
          </div>

          <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 lg:p-8 shadow-sm">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <FileText className="w-5 h-5 text-purple-500" /> Informasi Dasar
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
                  required
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
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-500" /> Poin Keunggulan
              </h3>
              <button 
                type="button"
                onClick={addFeature}
                className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 hover:underline"
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
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 transition-colors p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
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
             <h3 className="font-bold text-lg mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
               <DollarSign className="w-5 h-5 text-green-500" /> Harga & Diskon
             </h3>
             <div className="space-y-5">
               <div>
                 <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Harga Jual (Rp)</label>
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
                 <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Harga Coret (Diskon)</label>
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

          <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">Pengaturan Toko</h3>
            
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