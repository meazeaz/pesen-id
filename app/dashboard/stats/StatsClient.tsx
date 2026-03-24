"use client";

import { useState } from "react";
import { 
  BarChart3, ArrowUpRight, 
  MousePointer2, Eye, DollarSign, Globe, Smartphone, 
  Monitor, Instagram, Twitter
} from "lucide-react";

// Tipe Data Baru (Disesuaikan dengan mesin)
type StatsData = {
  views: number;
  clicks: number;
  ctr: string;
  revenue: number;
  topLinks: Array<{ title: string; clicks: number; type: string }>;
  chartData: Array<{
    date: string;
    revenue: number;
    sales: number;
    revHeight: number;
    salesHeight: number;
  }>;
  trafficSources: Array<{ id: string; name: string; count: number; percent: number }>;
  devices: Array<{ id: string; name: string; count: number; percent: number; color: string }>;
};

export default function StatsClient({ stats }: { stats: StatsData }) {
  const [timeRange, setTimeRange] = useState("14d");

  // Helper Format Rupiah
  const formatRupiah = (num: number) => {
    if(num === 0) return "Rp 0";
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);
  }

  // Fungsi untuk merender Icon
  const renderTrafficIcon = (id: string) => {
    switch(id) {
      case "instagram": return <Instagram className="w-4 h-4 text-pink-500" />;
      case "tiktok": return <span className="font-bold text-[10px]">Tk</span>;
      case "direct": return <Globe className="w-4 h-4 text-blue-500" />;
      case "twitter": return <Twitter className="w-4 h-4 text-sky-500" />;
      default: return <Globe className="w-4 h-4 text-slate-400" />;
    }
  };

  const renderDeviceIcon = (id: string) => {
    if (id === "mobile") return <Smartphone className="w-4 h-4" />;
    return <Monitor className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto p-6 lg:p-8 space-y-8">

        {/* --- HEADER & FILTER --- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Statistik Toko <BarChart3 className="w-6 h-6 text-purple-600" />
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Analisis performa link dan penjualan Anda.
            </p>
          </div>
          
          <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 p-1 rounded-xl flex shadow-sm">
             {["7d", "14d", "30d"].map((range) => (
                <button
                   key={range}
                   onClick={() => setTimeRange(range)}
                   className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      timeRange === range 
                         ? "bg-slate-900 dark:bg-white text-white dark:text-black shadow" 
                         : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                   }`}
                >
                   {range === "7d" ? "7 Hari" : range === "14d" ? "14 Hari" : "30 Hari"}
                </button>
             ))}
          </div>
        </div>

        {/* --- 1. KEY METRICS CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
              <div className="flex justify-between items-start mb-4">
                 <div className="p-2.5 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-xl">
                    <Eye className="w-5 h-5" />
                 </div>
              </div>
              <div>
                 <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total Views</p>
                 <h3 className="text-2xl font-extrabold mt-1">{stats.views.toLocaleString()}</h3>
              </div>
           </div>

           <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
              <div className="flex justify-between items-start mb-4">
                 <div className="p-2.5 bg-purple-100 dark:bg-purple-900/20 text-purple-600 rounded-xl">
                    <MousePointer2 className="w-5 h-5" />
                 </div>
              </div>
              <div>
                 <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total Clicks</p>
                 <h3 className="text-2xl font-extrabold mt-1">{stats.clicks.toLocaleString()}</h3>
              </div>
           </div>

           <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
              <div className="flex justify-between items-start mb-4">
                 <div className="p-2.5 bg-orange-100 dark:bg-orange-900/20 text-orange-600 rounded-xl">
                    <BarChart3 className="w-5 h-5" />
                 </div>
              </div>
              <div>
                 <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Click Rate (CTR)</p>
                 <h3 className="text-2xl font-extrabold mt-1">{stats.ctr}</h3>
              </div>
           </div>

           <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-purple-900 dark:to-indigo-900 p-5 rounded-2xl shadow-lg text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="flex justify-between items-start mb-4 relative z-10">
                 <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl">
                    <DollarSign className="w-5 h-5" />
                 </div>
              </div>
              <div className="relative z-10">
                 <p className="text-xs text-slate-300 uppercase font-bold tracking-wider">Pendapatan</p>
                 <h3 className="text-xl lg:text-2xl font-extrabold mt-1">{formatRupiah(stats.revenue)}</h3>
              </div>
           </div>
        </div>

        {/* --- 2. TRAFFIC & CHART SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* Chart Area (Sekarang adalah Trend Penjualan REAL-TIME) */}
           <div className="lg:col-span-2 bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                 <h3 className="font-bold text-lg">Trend Pendapatan (14 Hari)</h3>
                 <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-purple-500"></div> Pendapatan</span>
                    <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-blue-400"></div> Pesanan</span>
                 </div>
              </div>
              
              {/* CSS Bar Chart Dinamis */}
              <div className="h-64 flex items-end justify-between gap-1 sm:gap-3 pt-6">
                 {stats.chartData.map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end gap-1 h-full group relative cursor-pointer">
                       
                       {/* Tooltip Dinamis Muncul Saat Di-hover */}
                       {(val.revenue > 0 || val.sales > 0) && (
                         <div className="opacity-0 group-hover:opacity-100 absolute bottom-[110%] left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold py-2 px-3 rounded-lg transition-opacity whitespace-nowrap z-10 shadow-xl pointer-events-none flex flex-col items-center">
                            <span className="text-purple-400 dark:text-purple-600 mb-1">{formatRupiah(val.revenue)}</span>
                            <span className="opacity-80">{val.sales} Pesanan</span>
                            <span className="text-[9px] opacity-50 mt-1 font-normal">{val.date}</span>
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-white rotate-45"></div>
                         </div>
                       )}

                       {/* Bar Pendapatan */}
                       <div className="w-full bg-purple-500/90 rounded-t-sm relative transition-all duration-700 ease-out group-hover:bg-purple-600" style={{height: `${val.revHeight}%`, minHeight: val.revHeight > 0 ? '4px' : '0'}}></div>
                       {/* Bar Pesanan */}
                       <div className="w-full bg-blue-400/90 rounded-t-sm relative transition-all duration-700 ease-out delay-75 group-hover:bg-blue-500" style={{height: `${val.salesHeight}%`, minHeight: val.salesHeight > 0 ? '2px' : '0'}}></div>
                       
                       {/* Label Tanggal di bawah Tiang */}
                       <span className="text-[8px] text-slate-400 text-center mt-2 absolute -bottom-6 left-1/2 -translate-x-1/2 -rotate-45 sm:rotate-0 truncate w-full">
                          {val.date.split(" ")[0]}
                       </span>
                    </div>
                 ))}
              </div>
           </div>

           {/* --- SUMBER TRAFFIC (Statik Sementara) --- */}
           <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex flex-col">
              <h3 className="font-bold text-lg mb-6">Sumber Traffic</h3>
              
              <div className="space-y-5 flex-1">
                 {stats.trafficSources.map((src) => (
                    <div key={src.id}>
                       <div className="flex justify-between items-center mb-1.5 text-sm">
                          <div className="flex items-center gap-2 font-medium">
                             {renderTrafficIcon(src.id)} {src.name}
                          </div>
                          <span className="text-slate-500 font-bold">{src.count.toLocaleString()}</span>
                       </div>
                       <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-900 dark:bg-slate-200 rounded-full transition-all duration-1000" style={{ width: `${src.percent}%` }}></div>
                       </div>
                    </div>
                 ))}
              </div>

              {/* --- DEVICE BREAKDOWN --- */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                 <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Perangkat</h4>
                 <div className="flex gap-4">
                    {stats.devices.map((dev) => (
                       <div key={dev.id} className="flex-1 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center gap-3">
                          <div className={`p-2 rounded-lg text-white ${dev.color}`}>
                             {renderDeviceIcon(dev.id)}
                          </div>
                          <div>
                             <p className="text-xs text-slate-500">{dev.name}</p>
                             <p className="text-sm font-bold">{dev.percent}%</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

        </div>

        {/* --- 3. TOP PERFORMING LINKS --- */}
        <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
           <div className="p-6 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-lg">Top Produk Tersukses</h3>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead className="bg-slate-50 dark:bg-slate-900/50 text-xs uppercase text-slate-500">
                    <tr>
                       <th className="px-6 py-4 font-bold">Judul Produk</th>
                       <th className="px-6 py-4 font-bold">Kategori</th>
                       <th className="px-6 py-4 font-bold text-right">Total Terjual</th>
                       <th className="px-6 py-4 font-bold text-right">Performa Bar</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {stats.topLinks.length > 0 ? (
                      stats.topLinks.map((link, idx) => (
                         <tr key={idx} className="group hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                               {link.title}
                            </td>
                            <td className="px-6 py-4">
                               <span className="text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                                  {link.type}
                               </span>
                            </td>
                            <td className="px-6 py-4 text-right font-bold font-mono">
                               {link.clicks.toLocaleString()}
                            </td>
                            <td className="px-6 py-4">
                               <div className="w-24 ml-auto h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-green-500" style={{ width: `${Math.min((link.clicks / 10) * 100, 100)}%` }}></div>
                               </div>
                            </td>
                         </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center py-10 text-sm text-slate-500">
                          Belum ada data penjualan produk.
                        </td>
                      </tr>
                    )}
                 </tbody>
              </table>
           </div>
        </div>

      </div>
    </div>
  );
}