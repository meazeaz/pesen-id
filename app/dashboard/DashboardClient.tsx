"use client";

import Link from "next/link";
import { 
  ArrowUpRight, Wallet, ShoppingBag, 
  TrendingUp, Package, Clock, CheckCircle2, XCircle
} from "lucide-react";

// Tipe Data untuk Ringkasan Dashboard
type DashboardStats = {
  totalSaldo: number;
  totalPenjualan: number;
  totalProdukAktif: number;
  chartHeights: number[]; // Array 7 angka untuk tinggi bar (0-100)
  rawChartAmounts: number[]; // Array nominal asli untuk tooltip
  recentActivities: Array<{
    id: string;
    type: "order" | "withdrawal" | "review";
    title: string;
    description: string;
    time: string;
    amount?: number;
    amountType?: "plus" | "minus";
  }>;
};

export default function DashboardClient({ stats }: { stats: DashboardStats }) {
  // Helper Format Rupiah
  const formatRupiah = (num: number) => {
    if (num === 0) return "Rp 0";
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);
  };

  // Helper untuk tooltip chart (menyingkat Rupiah)
  const formatShortRupiah = (num: number) => {
    if (num === 0) return "Rp 0";
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", notation: "compact", maximumFractionDigits: 1 }).format(num);
  };

  return (
    <div className="min-h-full w-full bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-slate-100 p-6 lg:p-8 font-sans transition-colors duration-300">
      
      <div className="w-full space-y-8 transition-all duration-300">

        {/* --- HEADER DASHBOARD (Bersih) --- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Selamat datang kembali! 👋</p>
          </div>
        </div>

        {/* --- 1. STATS CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Saldo */}
          <div className="bg-white dark:bg-[#121212] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-500/30 transition-colors relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 dark:bg-purple-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
             <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl">
                   <Wallet className="w-6 h-6" />
                </div>
                <span className="flex items-center text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full border border-green-200 dark:border-green-900/50">
                   <ArrowUpRight className="w-3 h-3 mr-0.5" /> Stabil
                </span>
             </div>
             <div className="relative z-10">
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Total Pendapatan</p>
                <h3 className="text-2xl font-extrabold mt-1 text-slate-900 dark:text-white">
                  {formatRupiah(stats.totalSaldo)}
                </h3>
             </div>
          </div>

          {/* Card 2: Penjualan */}
          <div className="bg-white dark:bg-[#121212] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500/30 transition-colors relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 dark:bg-blue-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
             <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl">
                   <ShoppingBag className="w-6 h-6" />
                </div>
             </div>
             <div className="relative z-10">
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Total Penjualan</p>
                <h3 className="text-2xl font-extrabold mt-1 text-slate-900 dark:text-white">
                  {stats.totalPenjualan} <span className="text-sm font-medium text-slate-400">Transaksi</span>
                </h3>
             </div>
          </div>

          {/* Card 3: Konversi (Data Dummy) */}
          <div className="bg-white dark:bg-[#121212] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-orange-500/30 transition-colors relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 dark:bg-orange-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
             <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-xl">
                   <TrendingUp className="w-6 h-6" />
                </div>
             </div>
             <div className="relative z-10">
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Rasio Konversi</p>
                <h3 className="text-2xl font-extrabold mt-1 text-slate-900 dark:text-white">
                  {stats.totalPenjualan > 0 ? "12.5%" : "0%"}
                </h3>
             </div>
          </div>

          {/* Card 4: Produk Aktif */}
          <div className="bg-white dark:bg-[#121212] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-pink-500/30 transition-colors relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 dark:bg-pink-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
             <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-3 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 rounded-xl">
                   <Package className="w-6 h-6" />
                </div>
             </div>
             <div className="relative z-10">
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Produk Aktif</p>
                <h3 className="text-2xl font-extrabold mt-1 text-slate-900 dark:text-white">
                  {stats.totalProdukAktif} <span className="text-sm font-medium text-slate-400">Items</span>
                </h3>
             </div>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          
          {/* --- 2. GRAFIK ANALISIS (Tersambung Data Asli) --- */}
          <div className="lg:col-span-2 bg-white dark:bg-[#121212] p-6 lg:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm w-full">
             <div className="flex justify-between items-center mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                   <h3 className="font-bold text-lg text-slate-900 dark:text-white">Analisis Pendapatan</h3>
                   <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Performa penjualan lunas 7 hari terakhir.</p>
                </div>
             </div>

             {/* Dynamic Bar Chart CSS */}
             <div className="flex items-end justify-between h-64 gap-2 sm:gap-4 pt-4">
                {stats.chartHeights.map((height, i) => (
                   <div key={i} className="flex-1 flex flex-col items-center gap-3 group h-full">
                      <div 
                        className="w-full bg-slate-50 dark:bg-[#1a1a1a] rounded-t-xl relative overflow-visible group-hover:bg-slate-100 dark:group-hover:bg-white/5 transition-colors border-x border-t border-slate-100 dark:border-slate-800"
                        style={{ height: '100%' }}
                      >
                         <div 
                            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-purple-600 to-blue-400 dark:from-purple-700 dark:to-blue-500 rounded-t-xl transition-all duration-700 ease-out group-hover:from-purple-500 group-hover:to-blue-300"
                            style={{ height: `${height}%`, minHeight: height > 0 ? '4px' : '0' }}
                         >
                            {/* Tooltip Hover Menampilkan Rupiah Asli */}
                            {height > 0 && (
                                <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-bold py-1.5 px-2.5 rounded-lg mb-2 transition-opacity whitespace-nowrap z-50 shadow-xl pointer-events-none">
                                   {formatShortRupiah(stats.rawChartAmounts[i])}
                                   <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-white rotate-45"></div>
                                </div>
                            )}
                         </div>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {i === 6 ? 'Hari ini' : `H-${6-i}`}
                      </span>
                   </div>
                ))}
             </div>
          </div>

          {/* --- 3. RECENT ACTIVITY (DATA DINAMIS) --- */}
          <div className="bg-white dark:bg-[#121212] p-6 lg:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col w-full">
             <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">Aktivitas Terbaru</h3>
             
             <div className="space-y-5 flex-1 overflow-y-auto max-h-[300px] pr-2 no-scrollbar">
                {stats.recentActivities.length > 0 ? (
                  stats.recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4">
                       <div className={`p-2 rounded-xl mt-1 border ${
                         activity.amountType === "plus" 
                           ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-100 dark:border-green-900/30"
                           : activity.title.includes("Gagal") 
                             ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/30"
                             : "bg-slate-50 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700"
                       }`}>
                          {activity.title.includes("Gagal") ? <XCircle className="w-4 h-4"/> : 
                           activity.amountType === "plus" ? <CheckCircle2 className="w-4 h-4" /> : 
                           <Clock className="w-4 h-4" />}
                       </div>
                       <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{activity.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">{activity.description}</p>
                          <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1"><Clock className="w-3 h-3"/> {activity.time}</p>
                       </div>
                       {activity.amount !== undefined && (
                         <span className={`text-xs font-bold whitespace-nowrap mt-1 ${
                           activity.amountType === "plus" 
                             ? "text-green-600 dark:text-green-400" 
                             : activity.title.includes("Gagal")
                               ? "text-red-600 dark:text-red-400 line-through opacity-70"
                               : "text-slate-900 dark:text-white"
                         }`}>
                           {activity.amountType === "plus" ? "+" : ""} {formatRupiah(activity.amount)}
                         </span>
                       )}
                    </div>
                  ))
                ) : (
                  <div className="text-center text-slate-500 text-sm py-10">Belum ada transaksi.</div>
                )}
             </div>
             
             <Link href="/dashboard/orders" className="w-full mt-6 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-center inline-block">
                Lihat Semua Pesanan
             </Link>
          </div>

        </div>
      </div>
    </div>
  );
}