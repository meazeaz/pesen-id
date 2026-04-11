"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { deleteProduct } from "@/app/actions/product"; 
import { 
  Plus, Search, Package, Tag, BarChart3, ArrowUpRight, 
  Pencil, Trash2, Eye, FileText, ChevronLeft, ChevronRight
} from "lucide-react";

type Product = {
  id: string;
  title: string;
  category: string;
  price: number;
  status: string;
  sales: number; 
  image: string; 
};

export default function ProductListClient({ initialProducts }: { initialProducts: Product[] }) {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const filteredProducts = initialProducts.filter(product => {
    const matchesStatus = filterStatus === "all" || product.status === filterStatus;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(number);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus "${title}"?`)) {
      startTransition(async () => {
        await deleteProduct(id);
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-6 lg:p-8 space-y-8">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-3">
              Produk Digital 
              <span className="bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300 text-sm px-2.5 py-0.5 rounded-full">
                {initialProducts.length} Total
              </span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Kelola katalog produk, harga, dan stok Anda di sini.</p>
          </div>
          <Link href="/dashboard/products/new" className="px-5 py-3 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-full text-sm shadow-lg flex items-center gap-2 hover:opacity-90 transition-all">
            <Plus className="w-4 h-4" /> Tambah Produk
          </Link>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden flex flex-col">
           
           {/* Toolbar (Filter & Search) */}
           <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-white/5">
              <div className="flex bg-slate-200 dark:bg-black/40 p-1 rounded-xl w-full md:w-auto">
                 {["all", "active", "draft", "archived"].map((status) => (
                    <button key={status} onClick={() => setFilterStatus(status)} className={`flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded-lg capitalize transition-all ${filterStatus === status ? "bg-white dark:bg-[#121212] text-slate-900 dark:text-white shadow-sm" : "text-slate-500"}`}>
                       {status === "all" ? "Semua" : status}
                    </button>
                 ))}
              </div>
              <div className="relative w-full md:w-80 group">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input type="text" placeholder="Cari nama produk..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-black/40 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500/50 outline-none" />
              </div>
           </div>

           {/* Table */}
           <div className="overflow-x-auto min-h-[400px]">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-xs uppercase text-slate-500 bg-white dark:bg-[#121212]">
                       <th className="px-6 py-4 font-bold">Info Produk</th>
                       <th className="px-6 py-4 font-bold">Kategori</th>
                       <th className="px-6 py-4 font-bold">Harga</th>
                       <th className="px-6 py-4 font-bold">Status</th>
                       <th className="px-6 py-4 font-bold text-right">Aksi</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-[#121212]">
                    {filteredProducts.length > 0 ? (
                       filteredProducts.map((product) => (
                          <tr key={product.id} className="group hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                             <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                   <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-xl">{product.image}</div>
                                   <div>
                                      <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{product.title}</h4>
                                      <p className="text-[10px] text-slate-500 font-mono">ID: #{product.id.slice(0, 6)}</p>
                                   </div>
                                </div>
                             </td>
                             <td className="px-6 py-4 text-xs font-medium text-slate-600 dark:text-slate-300"><Tag className="w-3 h-3 inline mr-1 text-slate-400" />{product.category}</td>
                             <td className="px-6 py-4 text-sm font-bold font-mono">{formatRupiah(product.price)}</td>
                             <td className="px-6 py-4">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${product.status === "active" ? "bg-green-50 text-green-600 border-green-200" : "bg-yellow-50 text-yellow-600 border-yellow-200"}`}>
                                   {product.status}
                                </span>
                             </td>
                             <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                   <Link href={`/p/${product.id}`} target="_blank" className="p-2 text-slate-400 hover:text-purple-600 rounded-lg"><Eye className="w-4 h-4" /></Link>
                                   <Link href={`/dashboard/products/${product.id}`} className="p-2 text-slate-400 hover:text-blue-600 rounded-lg"><Pencil className="w-4 h-4" /></Link>
                                   <button onClick={() => handleDelete(product.id, product.title)} disabled={isPending} className="p-2 text-slate-400 hover:text-red-600 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                                </div>
                             </td>
                          </tr>
                       ))
                    ) : (
                       <tr><td colSpan={5} className="text-center py-20 text-slate-500 text-sm">Produk tidak ditemukan.</td></tr>
                    )}
                 </tbody>
              </table>
           </div>
        </div>

      </div>
    </div>
  );
}