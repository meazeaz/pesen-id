"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Plus, Search, Filter, MoreHorizontal, Package, 
  Tag, BarChart3, ArrowUpRight, Pencil, Trash2, 
  ExternalLink, Eye, MoreVertical, FileText, Sparkles, ChevronLeft, ChevronRight
} from "lucide-react";

// --- DUMMY DATA ---
const PRODUCTS = [
  { 
    id: 1, 
    title: "E-book Belajar Next.js 14", 
    category: "E-book", 
    price: 150000, 
    sales: 124, 
    status: "active", 
    image: "📘" 
  },
  { 
    id: 2, 
    title: "Template Notion Productivity", 
    category: "Template", 
    price: 99000, 
    sales: 85, 
    status: "active", 
    image: "📝" 
  },
  { 
    id: 3, 
    title: "Preset Lightroom Moody", 
    category: "Preset", 
    price: 49000, 
    sales: 12, 
    status: "draft", 
    image: "🎨" 
  },
  { 
    id: 4, 
    title: "Jasa Konsultasi Coding (1 Jam)", 
    category: "Jasa", 
    price: 250000, 
    sales: 5, 
    status: "active", 
    image: "☕" 
  },
  { 
    id: 5, 
    title: "Source Code Landing Page SaaS", 
    category: "Source Code", 
    price: 500000, 
    sales: 0, 
    status: "archived", 
    image: "💻" 
  },
  { 
    id: 6, 
    title: "UI Kit Mobile App", 
    category: "UI Design", 
    price: 350000, 
    sales: 42, 
    status: "active", 
    image: "📱" 
  },
];

export default function ProductsPage() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Logic Filter: Client Side Filtering (Cepat & Instan)
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesStatus = filterStatus === "all" || product.status === filterStatus;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Helper Format Rupiah
  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(number);
  };

  return (
    // Container Utama dengan Spacing yang Lega
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      
      {/* Wrapper agar konten tidak terlalu lebar di layar besar (Max Width 7xl) */}
      <div className="max-w-7xl mx-auto p-6 lg:p-8 space-y-8">

        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-3">
              Produk Digital 
              <span className="bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300 text-sm px-2.5 py-0.5 rounded-full border border-slate-300 dark:border-white/10">
                {PRODUCTS.length} Total
              </span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Kelola katalog produk, harga, dan stok Anda di sini.
            </p>
          </div>
          
          <Link 
            href="/dashboard/products/new" 
            className="px-5 py-3 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-full text-sm shadow-lg shadow-purple-500/10 flex items-center gap-2 hover:opacity-90 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" /> Tambah Produk
          </Link>
        </div>

        {/* --- STATS CARD (Mini Dashboard) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
           <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:border-purple-500/30 transition-colors group">
              <div className="p-3.5 bg-blue-50 dark:bg-blue-900/10 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform">
                 <Package className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Total Produk</p>
                 <h4 className="text-2xl font-bold mt-0.5">12</h4>
              </div>
           </div>
           <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:border-green-500/30 transition-colors group">
              <div className="p-3.5 bg-green-50 dark:bg-green-900/10 text-green-600 rounded-2xl group-hover:scale-110 transition-transform">
                 <ArrowUpRight className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Terjual</p>
                 <h4 className="text-2xl font-bold mt-0.5">226</h4>
              </div>
           </div>
           <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:border-purple-500/30 transition-colors group">
              <div className="p-3.5 bg-purple-50 dark:bg-purple-900/10 text-purple-600 rounded-2xl group-hover:scale-110 transition-transform">
                 <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Conversion</p>
                 <h4 className="text-2xl font-bold mt-0.5">4.2%</h4>
              </div>
           </div>
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden flex flex-col">
           
           {/* Toolbar (Filter & Search) */}
           <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-white/5">
              
              {/* Tabs Filter Status */}
              <div className="flex bg-slate-200 dark:bg-black/40 p-1 rounded-xl w-full md:w-auto">
                 {["all", "active", "draft", "archived"].map((status) => (
                    <button
                       key={status}
                       onClick={() => setFilterStatus(status)}
                       className={`flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded-lg capitalize transition-all ${
                          filterStatus === status 
                             ? "bg-white dark:bg-[#121212] text-slate-900 dark:text-white shadow-sm" 
                             : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                       }`}
                    >
                       {status === "all" ? "Semua" : status}
                    </button>
                 ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80 group">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                 <input 
                    type="text" 
                    placeholder="Cari nama produk..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-black/40 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-slate-400"
                 />
              </div>
           </div>

           {/* Table List (Responsive) */}
           <div className="overflow-x-auto min-h-[400px]">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-xs uppercase text-slate-500 dark:text-slate-400 bg-white dark:bg-[#121212]">
                       <th className="px-6 py-4 font-bold tracking-wider">Info Produk</th>
                       <th className="px-6 py-4 font-bold tracking-wider">Kategori</th>
                       <th className="px-6 py-4 font-bold tracking-wider">Harga</th>
                       <th className="px-6 py-4 font-bold tracking-wider">Penjualan</th>
                       <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                       <th className="px-6 py-4 font-bold tracking-wider text-right">Aksi</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-[#121212]">
                    {filteredProducts.length > 0 ? (
                       filteredProducts.map((product) => (
                          <tr key={product.id} className="group hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors duration-200">
                             
                             {/* Produk */}
                             <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                   <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-2xl shadow-sm border border-slate-200 dark:border-slate-700 group-hover:scale-105 transition-transform">
                                      {product.image}
                                   </div>
                                   <div>
                                      <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">{product.title}</h4>
                                      <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1 font-mono">
                                        ID: #{product.id}
                                      </p>
                                   </div>
                                </div>
                             </td>

                             {/* Kategori */}
                             <td className="px-6 py-4">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-white/5 text-xs font-medium text-slate-600 dark:text-slate-300">
                                   <Tag className="w-3 h-3 text-slate-400" /> {product.category}
                                </div>
                             </td>

                             {/* Harga */}
                             <td className="px-6 py-4">
                                <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                                   {formatRupiah(product.price)}
                                </span>
                             </td>

                             {/* Penjualan */}
                             <td className="px-6 py-4">
                                <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                                   <BarChart3 className="w-4 h-4 text-slate-400" /> 
                                   <span className="font-semibold">{product.sales}</span>
                                </div>
                             </td>

                             {/* Status Badge */}
                             <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                                   product.status === "active" 
                                      ? "bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30" 
                                      : product.status === "draft"
                                      ? "bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900/30"
                                      : "bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
                                }`}>
                                   <span className={`w-1.5 h-1.5 rounded-full ${
                                      product.status === "active" ? "bg-green-500 animate-pulse" : product.status === "draft" ? "bg-yellow-500" : "bg-slate-500"
                                   }`}></span>
                                   {product.status}
                                </span>
                             </td>

                             {/* Action Buttons */}
                             <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                   <button className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors" title="Lihat Detail">
                                      <Eye className="w-4 h-4" />
                                   </button>
                                   <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="Edit">
                                      <Pencil className="w-4 h-4" />
                                   </button>
                                   <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Hapus">
                                      <Trash2 className="w-4 h-4" />
                                   </button>
                                </div>
                             </td>

                          </tr>
                       ))
                    ) : (
                       <tr>
                          <td colSpan={6} className="px-6 py-20 text-center">
                             <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
                                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-slate-200 dark:border-slate-700">
                                   <FileText className="w-8 h-8 text-slate-300 dark:text-slate-500" />
                                </div>
                                <h3 className="text-slate-900 dark:text-white font-bold mb-1 text-lg">Produk tidak ditemukan</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
                                   Coba ubah kata kunci pencarian atau filter status produk Anda.
                                </p>
                                <button 
                                  onClick={() => {setSearchQuery(""); setFilterStatus("all")}}
                                  className="mt-4 text-sm font-bold text-purple-600 hover:underline"
                                >
                                  Reset Filter
                                </button>
                             </div>
                          </td>
                       </tr>
                    )}
                 </tbody>
              </table>
           </div>

           {/* Pagination (Footer Table) */}
           <div className="p-5 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500 bg-slate-50/50 dark:bg-white/5">
              <span>Menampilkan 1-6 dari 12 produk</span>
              <div className="flex gap-2">
                 <button disabled className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg disabled:opacity-50 cursor-not-allowed flex items-center gap-1 hover:bg-white dark:hover:bg-slate-800 transition">
                    <ChevronLeft className="w-3 h-3" /> Sebelumnya
                 </button>
                 <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition flex items-center gap-1">
                    Berikutnya <ChevronRight className="w-3 h-3" />
                 </button>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}