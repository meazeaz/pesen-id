"use client";

import { useState } from "react";
import { 
  BarChart3, Calendar, ArrowUpRight, ArrowDownRight, 
  MousePointer2, Eye, DollarSign, Globe, Smartphone, 
  Monitor, Instagram, Twitter, Facebook
} from "lucide-react";

// --- DUMMY DATA ---
const STATS = {
  views: 12540,
  clicks: 4320,
  ctr: "34.5%",
  revenue: 12500000,
};

const TRAFFIC_SOURCES = [
  { name: "Instagram", icon: <Instagram className="w-4 h-4 text-pink-500" />, count: 5400, percent: 45 },
  { name: "TikTok", icon: <span className="font-bold text-[10px]">Tk</span>, count: 3200, percent: 28 },
  { name: "Direct / WA", icon: <Globe className="w-4 h-4 text-blue-500" />, count: 1800, percent: 15 },
  { name: "Twitter / X", icon: <Twitter className="w-4 h-4 text-sky-500" />, count: 1200, percent: 10 },
  { name: "Lainnya", icon: <Globe className="w-4 h-4 text-slate-400" />, count: 240, percent: 2 },
];

const TOP_LINKS = [
  { title: "E-book Belajar Next.js 14", clicks: 1204, type: "Product" },
  { title: "Konsultasi 1-on-1", clicks: 850, type: "Service" },
  { title: "Join Grup Telegram Premium", clicks: 620, type: "Link" },
  { title: "Portfolio Website", clicks: 430, type: "Link" },
];

const DEVICES = [
  { name: "Mobile", percent: 85, color: "bg-purple-500", icon: <Smartphone className="w-4 h-4" /> },
  { name: "Desktop", percent: 15, color: "bg-blue-500", icon: <Monitor className="w-4 h-4" /> },
];

export default function StatsPage() {
  const [timeRange, setTimeRange] = useState("30d");

  // Helper Format Rupiah
  const formatRupiah = (num: number) => 
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);

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
             {["7d", "30d", "90d"].map((range) => (
                <button
                   key={range}
                   onClick={() => setTimeRange(range)}
                   className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      timeRange === range 
                         ? "bg-slate-900 dark:bg-white text-white dark:text-black shadow" 
                         : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                   }`}
                >
                   {range === "7d" ? "7 Hari" : range === "30d" ? "30 Hari" : "3 Bulan"}
                </button>
             ))}
          </div>
        </div>

        {/* --- 1. KEY METRICS CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           
           {/* Card: Total Views */}
           <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm hover:border-purple-500/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                 <div className="p-2.5 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-xl">
                    <Eye className="w-5 h-5" />
                 </div>
                 <span className="flex items-center text-[10px] font-bold text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                    <ArrowUpRight className="w-3 h-3 mr-1" /> +12%
                 </span>
              </div>
              <div>
                 <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total Views</p>
                 <h3 className="text-2xl font-extrabold mt-1">{STATS.views.toLocaleString()}</h3>
              </div>
           </div>

           {/* Card: Clicks */}
           <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm hover:border-purple-500/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                 <div className="p-2.5 bg-purple-100 dark:bg-purple-900/20 text-purple-600 rounded-xl">
                    <MousePointer2 className="w-5 h-5" />
                 </div>
                 <span className="flex items-center text-[10px] font-bold text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                    <ArrowUpRight className="w-3 h-3 mr-1" /> +8.5%
                 </span>
              </div>
              <div>
                 <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total Clicks</p>
                 <h3 className="text-2xl font-extrabold mt-1">{STATS.clicks.toLocaleString()}</h3>
              </div>
           </div>

           {/* Card: CTR */}
           <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm hover:border-purple-500/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                 <div className="p-2.5 bg-orange-100 dark:bg-orange-900/20 text-orange-600 rounded-xl">
                    <BarChart3 className="w-5 h-5" />
                 </div>
                 <span className="flex items-center text-[10px] font-bold text-red-500 bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded-full">
                    <ArrowDownRight className="w-3 h-3 mr-1" /> -1.2%
                 </span>
              </div>
              <div>
                 <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Click Rate (CTR)</p>
                 <h3 className="text-2xl font-extrabold mt-1">{STATS.ctr}</h3>
              </div>
           </div>

           {/* Card: Revenue */}
           <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-purple-900 dark:to-indigo-900 p-5 rounded-2xl shadow-lg text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="flex justify-between items-start mb-4 relative z-10">
                 <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl">
                    <DollarSign className="w-5 h-5" />
                 </div>
              </div>
              <div className="relative z-10">
                 <p className="text-xs text-slate-300 uppercase font-bold tracking-wider">Pendapatan</p>
                 <h3 className="text-xl lg:text-2xl font-extrabold mt-1">{formatRupiah(STATS.revenue)}</h3>
              </div>
           </div>

        </div>

        {/* --- 2. TRAFFIC & CHART SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* Chart Area (Views Trend) */}
           <div className="lg:col-span-2 bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-lg">Trend Kunjungan</h3>
                 <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Views</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-400"></div> Clicks</span>
                 </div>
              </div>
              
              {/* CSS Bar Chart Simulation */}
              <div className="h-64 flex items-end justify-between gap-2 sm:gap-4">
                 {[45, 60, 35, 70, 55, 80, 65, 50, 75, 90, 60, 85].map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end gap-1 h-full group cursor-pointer">
                       <div className="w-full bg-purple-500/90 rounded-t-sm relative transition-all duration-500 group-hover:bg-purple-600" style={{height: `${val}%`}}></div>
                       <div className="w-full bg-blue-400/90 rounded-t-sm relative transition-all duration-500 group-hover:bg-blue-500" style={{height: `${val * 0.4}%`}}></div>
                    </div>
                 ))}
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                 <span>Minggu 1</span>
                 <span>Minggu 2</span>
                 <span>Minggu 3</span>
                 <span>Minggu 4</span>
              </div>
           </div>

           {/* Traffic Sources */}
           <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex flex-col">
              <h3 className="font-bold text-lg mb-6">Sumber Traffic</h3>
              
              <div className="space-y-5 flex-1">
                 {TRAFFIC_SOURCES.map((src, idx) => (
                    <div key={idx}>
                       <div className="flex justify-between items-center mb-1.5 text-sm">
                          <div className="flex items-center gap-2 font-medium">
                             {src.icon} {src.name}
                          </div>
                          <span className="text-slate-500 font-bold">{src.count}</span>
                       </div>
                       <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-900 dark:bg-slate-200 rounded-full" style={{ width: `${src.percent}%` }}></div>
                       </div>
                    </div>
                 ))}
              </div>

              {/* Device Breakdown Mini */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                 <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Perangkat</h4>
                 <div className="flex gap-4">
                    {DEVICES.map((dev, idx) => (
                       <div key={idx} className="flex-1 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center gap-3">
                          <div className={`p-2 rounded-lg text-white ${dev.color}`}>
                             {dev.icon}
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
              <h3 className="font-bold text-lg">Top Link & Produk</h3>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead className="bg-slate-50 dark:bg-slate-900/50 text-xs uppercase text-slate-500">
                    <tr>
                       <th className="px-6 py-4 font-bold">Judul Link / Produk</th>
                       <th className="px-6 py-4 font-bold">Tipe</th>
                       <th className="px-6 py-4 font-bold text-right">Total Klik</th>
                       <th className="px-6 py-4 font-bold text-right">Performa</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {TOP_LINKS.map((link, idx) => (
                       <tr key={idx} className="group hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                             {link.title}
                          </td>
                          <td className="px-6 py-4">
                             <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide ${
                                link.type === "Product" ? "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400" :
                                link.type === "Service" ? "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" :
                                "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                             }`}>
                                {link.type}
                             </span>
                          </td>
                          <td className="px-6 py-4 text-right font-bold font-mono">
                             {link.clicks.toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                             <div className="w-24 ml-auto h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500" style={{ width: `${(link.clicks / 1500) * 100}%` }}></div>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

      </div>
    </div>
  );
}