"use client";

import Link from "next/link";
import { 
  ArrowUpRight, Wallet, ShoppingBag, 
  TrendingUp, Package, Clock, CheckCircle2, XCircle,
  ArrowDownRight, Banknote
} from "lucide-react";

type DashboardStats = {
  totalSaldo: number;
  totalPenjualan: number;
  totalProdukAktif: number;
  chartHeights: number[]; 
  rawChartAmounts: number[]; 
  recentActivities: Array<{
    id: string;
    type: "order" | "withdrawal";
    title: string;
    description: string;
    time: string;
    amount?: number;
    status: "success" | "pending" | "failed"; // Tambahan status agar mudah di-styling
  }>;
};

export default function DashboardClient({ stats }: { stats: DashboardStats }) {
  const formatRupiah = (num: number) => {
    if (num === 0) return "Rp 0";
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);
  };

  const formatShortRupiah = (num: number) => {
    if (num === 0) return "Rp 0";
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", notation: "compact", maximumFractionDigits: 1 }).format(num);
  };

  return (
    <div className="min-h-full w-full bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-slate-100 p-6 lg:p-8 font-sans transition-colors duration-300">
      <div className="w-full space-y-8 transition-all duration-300">

        {/* --- HEADER DASHBOARD --- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Selamat datang kembali! 👋</p>
          </div>
        </div>

        {/* --- 1. STATS CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card Saldo */}
          <div className="bg-white dark:bg-[#121212] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
             <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-xl"><Wallet className="w-6 h-6" /></div>
                <span className="flex items-center text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200"><ArrowUpRight className="w-3 h-3 mr-0.5" /> Stabil</span>
             </div>
             <div className="relative z-10">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Pendapatan</p>
                <h3 className="text-2xl font-extrabold mt-1 text-slate-900 dark:text-white">{formatRupiah(stats.totalSaldo)}</h3>
             </div>
          </div>

          {/* Card Penjualan */}
          <div className="bg-white dark:bg-[#121212] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
             <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl"><ShoppingBag className="w-6 h-6" /></div>
             </div>
             <div className="relative z-10">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Penjualan</p>
                <h3 className="text-2xl font-extrabold mt-1 text-slate-900 dark:text-white">{stats.totalPenjualan} <span className="text-sm font-medium text-slate-400">Transaksi</span></h3>
             </div>
          </div>

          {/* Card Konversi */}
          <div className="bg-white dark:bg-[#121212] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
             <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 text-orange-600 rounded-xl"><TrendingUp className="w-6 h-6" /></div>
             </div>
             <div className="relative z-10">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Rasio Konversi</p>
                <h3 className="text-2xl font-extrabold mt-1 text-slate-900 dark:text-white">{stats.totalPenjualan > 0 ? "12.5%" : "0%"}</h3>
             </div>
          </div>

          {/* Card Produk */}
          <div className="bg-white dark:bg-[#121212] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
             <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-3 bg-pink-50 dark:bg-pink-900/20 text-pink-600 rounded-xl"><Package className="w-6 h-6" /></div>
             </div>
             <div className="relative z-10">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Produk Aktif</p>
                <h3 className="text-2xl font-extrabold mt-1 text-slate-900 dark:text-white">{stats.totalProdukAktif} <span className="text-sm font-medium text-slate-400">Items</span></h3>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          
          {/* --- 2. GRAFIK --- */}
          <div className="lg:col-span-2 bg-white dark:bg-[#121212] p-6 lg:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
             <div className="mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Analisis Pendapatan</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Performa penjualan lunas 7 hari terakhir.</p>
             </div>
             <div className="flex items-end justify-between h-64 gap-2 sm:gap-4 pt-4">
                {stats.chartHeights.map((height, i) => (
                   <div key={i} className="flex-1 flex flex-col items-center gap-3 group h-full">
                      <div className="w-full bg-slate-50 dark:bg-[#1a1a1a] rounded-t-xl relative group-hover:bg-slate-100 border-x border-t border-slate-100 dark:border-slate-800" style={{ height: '100%' }}>
                         <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-purple-600 to-blue-400 rounded-t-xl transition-all" style={{ height: `${height}%`, minHeight: height > 0 ? '4px' : '0' }}>
                            {height > 0 && (
                                <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-bold py-1.5 px-2.5 rounded-lg z-50 pointer-events-none">
                                   {formatShortRupiah(stats.rawChartAmounts[i])}
                                </div>
                            )}
                         </div>
                      </div>
                      <span className="text-xs text-slate-500 font-medium">{i === 6 ? 'Hari ini' : `H-${6-i}`}</span>
                   </div>
                ))}
             </div>
          </div>

          {/* --- 3. RECENT ACTIVITY (GABUNGAN ORDER & WITHDRAWAL) --- */}
          <div className="bg-white dark:bg-[#121212] p-6 lg:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
             <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">Aktivitas Terbaru</h3>
             
             <div className="space-y-5 flex-1 overflow-y-auto max-h-[300px] pr-2 no-scrollbar">
                {stats.recentActivities.length > 0 ? (
                  stats.recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4">
                       
                       {/* Icon Dinamis */}
                       <div className={`p-2 rounded-xl mt-1 border ${
                         activity.status === "success" && activity.type === "order" ? "bg-green-50 text-green-600 border-green-100" :
                         activity.status === "success" && activity.type === "withdrawal" ? "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-white" :
                         activity.status === "pending" ? "bg-yellow-50 text-yellow-600 border-yellow-100" :
                         "bg-red-50 text-red-600 border-red-100"
                       }`}>
                          {activity.status === "success" && activity.type === "order" ? <CheckCircle2 className="w-4 h-4"/> : 
                           activity.status === "success" && activity.type === "withdrawal" ? <Banknote className="w-4 h-4"/> :
                           activity.status === "pending" ? <Clock className="w-4 h-4"/> : 
                           <XCircle className="w-4 h-4"/>}
                       </div>

                       <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{activity.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{activity.description}</p>
                          <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1"><Clock className="w-3 h-3"/> {activity.time}</p>
                       </div>

                       {/* Nominal Dinamis */}
                       {activity.amount !== undefined && (
                         <span className={`text-xs font-bold whitespace-nowrap mt-1 ${
                           activity.status === "failed" ? "text-red-500 line-through opacity-70" :
                           activity.type === "order" ? "text-green-600 dark:text-green-400" : 
                           "text-slate-900 dark:text-white"
                         }`}>
                           {activity.status === "failed" ? "" : activity.type === "order" ? "+" : "-"} {formatRupiah(activity.amount)}
                         </span>
                       )}
                    </div>
                  ))
                ) : (
                  <div className="text-center text-slate-500 text-sm py-10">Belum ada aktivitas.</div>
                )}
             </div>
             
             <Link href="/dashboard/orders" className="w-full mt-6 py-2.5 text-xs font-bold text-slate-600 hover:text-purple-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-center inline-block">
                Lihat Seluruh Riwayat
             </Link>
          </div>

        </div>
      </div>
    </div>
  );
}