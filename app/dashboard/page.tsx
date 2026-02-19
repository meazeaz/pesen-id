import Link from "next/link";
import { 
  ArrowUpRight, ArrowDownRight, Wallet, ShoppingBag, 
  Users, TrendingUp, MoreHorizontal, Package, Clock, 
  CheckCircle2, XCircle
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-slate-100 p-6 font-sans transition-colors duration-300">
      
      {/* --- HEADER DASHBOARD --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm mt-1">Selamat datang kembali, Ilham! 👋</p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 text-sm font-medium rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
             Download Laporan
           </button>
           <Link href="/dashboard/products/new" className="px-4 py-2 bg-purple-600 text-white text-sm font-bold rounded-lg shadow-lg shadow-purple-500/30 hover:bg-purple-700 transition-colors flex items-center gap-2">
             <PlusIcon className="w-4 h-4" /> Tambah Produk
           </Link>
        </div>
      </div>

      {/* --- 1. STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1: Saldo */}
        <div className="bg-white dark:bg-[#121212] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
           <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 text-purple-600 rounded-xl">
                 <Wallet className="w-6 h-6" />
              </div>
              <span className="flex items-center text-xs font-bold text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                 <ArrowUpRight className="w-3 h-3 mr-1" /> +12%
              </span>
           </div>
           <div className="relative z-10">
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Total Saldo</p>
              <h3 className="text-2xl font-extrabold mt-1">Rp 12.500.000</h3>
           </div>
        </div>

        {/* Card 2: Penjualan */}
        <div className="bg-white dark:bg-[#121212] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
           <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-xl">
                 <ShoppingBag className="w-6 h-6" />
              </div>
              <span className="flex items-center text-xs font-bold text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                 <ArrowUpRight className="w-3 h-3 mr-1" /> +5.4%
              </span>
           </div>
           <div className="relative z-10">
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Total Penjualan</p>
              <h3 className="text-2xl font-extrabold mt-1">1,240</h3>
           </div>
        </div>

        {/* Card 3: Pengunjung */}
        <div className="bg-white dark:bg-[#121212] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
           <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 text-orange-600 rounded-xl">
                 <Users className="w-6 h-6" />
              </div>
              <span className="flex items-center text-xs font-bold text-red-500 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full">
                 <ArrowDownRight className="w-3 h-3 mr-1" /> -2.1%
              </span>
           </div>
           <div className="relative z-10">
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Pengunjung Profil</p>
              <h3 className="text-2xl font-extrabold mt-1">8,432</h3>
           </div>
        </div>

        {/* Card 4: Produk Aktif */}
        <div className="bg-white dark:bg-[#121212] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
           <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-3 bg-pink-100 dark:bg-pink-900/20 text-pink-600 rounded-xl">
                 <Package className="w-6 h-6" />
              </div>
              <span className="flex items-center text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                 Stabil
              </span>
           </div>
           <div className="relative z-10">
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Produk Aktif</p>
              <h3 className="text-2xl font-extrabold mt-1">24</h3>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- 2. GRAFIK ANALISIS (Simulasi CSS) --- */}
        <div className="lg:col-span-2 bg-white dark:bg-[#121212] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
           <div className="flex justify-between items-center mb-6">
              <div>
                 <h3 className="font-bold text-lg dark:text-white">Analisis Pendapatan</h3>
                 <p className="text-xs text-slate-500">Performa penjualan 7 hari terakhir.</p>
              </div>
              <button className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-3 py-1.5 rounded-lg hover:bg-purple-100 transition">
                 Lihat Detail
              </button>
           </div>

           {/* Simple Bar Chart CSS */}
           <div className="flex items-end justify-between h-64 gap-2 pt-4">
              {[40, 70, 35, 90, 55, 80, 65].map((height, i) => (
                 <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <div 
                      className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-xl relative overflow-hidden group-hover:bg-purple-50 dark:group-hover:bg-purple-900/10 transition-colors"
                      style={{ height: '100%' }}
                    >
                       <div 
                          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-purple-600 to-blue-500 rounded-t-xl transition-all duration-500 group-hover:from-purple-500 group-hover:to-blue-400"
                          style={{ height: `${height}%` }}
                       >
                          {/* Tooltip Hover */}
                          <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold py-1 px-2 rounded mb-2 transition-opacity whitespace-nowrap z-10">
                             Rp {height}00k
                          </div>
                       </div>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">H-{7-i}</span>
                 </div>
              ))}
           </div>
        </div>

        {/* --- 3. RECENT ACTIVITY --- */}
        <div className="bg-white dark:bg-[#121212] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
           <h3 className="font-bold text-lg dark:text-white mb-4">Aktivitas Terbaru</h3>
           <div className="space-y-4">
              {/* Item 1 */}
              <div className="flex items-start gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                 <div className="p-2 bg-green-100 text-green-600 dark:bg-green-900/20 rounded-full mt-1">
                    <CheckCircle2 className="w-4 h-4" />
                 </div>
                 <div className="flex-1">
                    <p className="text-sm font-semibold dark:text-white">Pesanan Baru #ORD-001</p>
                    <p className="text-xs text-slate-500 mt-0.5">Budi Santoso membeli E-book React.</p>
                    <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1"><Clock className="w-3 h-3"/> 2 menit yang lalu</p>
                 </div>
                 <span className="text-xs font-bold text-slate-900 dark:text-white">Rp 150k</span>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                 <div className="p-2 bg-blue-100 text-blue-600 dark:bg-blue-900/20 rounded-full mt-1">
                    <Wallet className="w-4 h-4" />
                 </div>
                 <div className="flex-1">
                    <p className="text-sm font-semibold dark:text-white">Penarikan Saldo</p>
                    <p className="text-xs text-slate-500 mt-0.5">Penarikan ke BCA Berhasil.</p>
                    <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1"><Clock className="w-3 h-3"/> 1 jam yang lalu</p>
                 </div>
                 <span className="text-xs font-bold text-red-500">-Rp 500k</span>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-3">
                 <div className="p-2 bg-orange-100 text-orange-600 dark:bg-orange-900/20 rounded-full mt-1">
                    <Users className="w-4 h-4" />
                 </div>
                 <div className="flex-1">
                    <p className="text-sm font-semibold dark:text-white">Review Bintang 5</p>
                    <p className="text-xs text-slate-500 mt-0.5">"Produknya sangat bagus, makasih!"</p>
                    <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1"><Clock className="w-3 h-3"/> 3 jam yang lalu</p>
                 </div>
              </div>
           </div>
           
           <button className="w-full mt-4 py-2 text-xs font-bold text-slate-500 hover:text-purple-600 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors">
              Lihat Semua Aktivitas
           </button>
        </div>

      </div>
    </div>
  );
}

// Helper Icon Plus (karena lucide Plus kadang conflict jika import banyak)
function PlusIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}