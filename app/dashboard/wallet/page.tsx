"use client";

import { useState } from "react";
import { 
  Wallet, ArrowUpRight, ArrowDownLeft, Landmark, 
  History, MoreHorizontal, Download, TrendingUp, 
  CreditCard, Plus, CheckCircle2, AlertCircle
} from "lucide-react";

// --- DUMMY DATA TRANSAKSI ---
const TRANSACTIONS = [
  { 
    id: "TRX-88291", 
    desc: "Penjualan: E-book Next.js", 
    date: "19 Feb 2024, 14:30", 
    amount: 150000, 
    type: "income", // income / expense
    status: "success" 
  },
  { 
    id: "TRX-88290", 
    desc: "Penjualan: Template Notion", 
    date: "19 Feb 2024, 10:15", 
    amount: 99000, 
    type: "income", 
    status: "success" 
  },
  { 
    id: "TRX-88289", 
    desc: "Penarikan ke BCA (Admin Rp 6.500)", 
    date: "18 Feb 2024, 09:00", 
    amount: 500000, 
    type: "expense", 
    status: "success" 
  },
  { 
    id: "TRX-88288", 
    desc: "Penjualan: Jasa Konsultasi", 
    date: "17 Feb 2024, 20:20", 
    amount: 250000, 
    type: "income", 
    status: "pending" 
  },
  { 
    id: "TRX-88287", 
    desc: "Biaya Langganan Pro", 
    date: "15 Feb 2024, 08:00", 
    amount: 49000, 
    type: "expense", 
    status: "success" 
  },
];

export default function WalletPage() {
  const [filterType, setFilterType] = useState("all");

  // Filter Logic (CSR)
  const filteredTrx = TRANSACTIONS.filter(trx => 
    filterType === "all" ? true : trx.type === filterType
  );

  // Helper Rupiah
  const formatRupiah = (num: number) => 
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto p-6 lg:p-8 space-y-8">

        {/* --- HEADER --- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-3">
              Dompet Saya
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Kelola saldo pendapatan dan penarikan dana.
            </p>
          </div>
          <button className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-xl text-sm shadow-lg hover:opacity-90 transition-all flex items-center gap-2">
            <Download className="w-4 h-4" /> Unduh Laporan
          </button>
        </div>

        {/* --- TOP SECTION: CARDS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           
           {/* 1. Main Balance Card (Gradient) */}
           <div className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-600 p-8 text-white shadow-xl shadow-indigo-500/20 group">
              {/* Abstract Patterns */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/30 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col justify-between h-full min-h-[180px]">
                 <div className="flex justify-between items-start">
                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                       <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-bold bg-green-500/20 border border-green-400/30 text-green-100 px-3 py-1 rounded-full flex items-center gap-1">
                       <TrendingUp className="w-3 h-3" /> Aktif
                    </span>
                 </div>
                 
                 <div className="space-y-1">
                    <p className="text-sm font-medium text-purple-100 opacity-80">Total Saldo Aktif</p>
                    <h2 className="text-4xl font-extrabold tracking-tight">Rp 2.540.000</h2>
                 </div>

                 <div className="flex gap-3 mt-6">
                    <button className="flex-1 py-3 bg-white text-purple-700 font-bold rounded-xl text-sm hover:bg-purple-50 transition-colors shadow-lg flex items-center justify-center gap-2">
                       <ArrowUpRight className="w-4 h-4" /> Tarik Dana
                    </button>
                    <button className="px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl text-sm hover:bg-white/20 transition-colors">
                       <MoreHorizontal className="w-5 h-5" />
                    </button>
                 </div>
              </div>
           </div>

           {/* 2. Bank Account & Stats */}
           <div className="space-y-6">
              
              {/* Bank Card UI */}
              <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden border border-slate-700">
                 <div className="absolute top-4 right-4 text-slate-500">
                    <Landmark className="w-6 h-6" />
                 </div>
                 <div className="flex flex-col justify-between h-full gap-6">
                    <div>
                       <p className="text-xs text-slate-400 uppercase tracking-widest">Rekening Utama</p>
                       <h4 className="text-lg font-bold mt-1">Bank Central Asia</h4>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-6 bg-yellow-500/80 rounded-md"></div> {/* Chip Sim */}
                       <p className="font-mono text-lg tracking-widest text-slate-300">**** 8829</p>
                    </div>
                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-[10px] text-slate-500 uppercase">Atas Nama</p>
                          <p className="text-sm font-medium">Ilham Developer</p>
                       </div>
                       <button className="text-xs text-purple-400 hover:text-white transition-colors">Ubah</button>
                    </div>
                 </div>
              </div>

              {/* Mini Stats Income/Expense */}
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white dark:bg-[#121212] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                       <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center">
                          <ArrowDownLeft className="w-3 h-3" />
                       </div>
                       <span className="text-xs text-slate-500">Pemasukan</span>
                    </div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Rp 4.2jt</p>
                 </div>
                 <div className="bg-white dark:bg-[#121212] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                       <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center">
                          <ArrowUpRight className="w-3 h-3" />
                       </div>
                       <span className="text-xs text-slate-500">Pengeluaran</span>
                    </div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Rp 500k</p>
                 </div>
              </div>

           </div>
        </div>

        {/* --- TRANSACTION HISTORY --- */}
        <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden flex flex-col">
           
           {/* Toolbar */}
           <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
              <h3 className="font-bold text-lg flex items-center gap-2 text-slate-900 dark:text-white">
                 <History className="w-5 h-5 text-slate-400" /> Riwayat Transaksi
              </h3>
              
              <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
                 {["all", "income", "expense"].map((type) => (
                    <button
                       key={type}
                       onClick={() => setFilterType(type)}
                       className={`px-4 py-1.5 text-xs font-bold rounded-lg capitalize transition-all ${
                          filterType === type 
                             ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm" 
                             : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                       }`}
                    >
                       {type === "all" ? "Semua" : type === "income" ? "Masuk" : "Keluar"}
                    </button>
                 ))}
              </div>
           </div>

           {/* Table List */}
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-500 dark:text-slate-400">
                    <tr>
                       <th className="px-6 py-4 font-bold">Keterangan</th>
                       <th className="px-6 py-4 font-bold">Tanggal</th>
                       <th className="px-6 py-4 font-bold">Status</th>
                       <th className="px-6 py-4 font-bold text-right">Jumlah</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredTrx.map((trx) => (
                       <tr key={trx.id} className="group hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${
                                   trx.type === 'income' 
                                      ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' 
                                      : 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                                }`}>
                                   {trx.type === 'income' ? <ArrowDownLeft className="w-4 h-4"/> : <ArrowUpRight className="w-4 h-4"/>}
                                </div>
                                <div>
                                   <p className="text-sm font-bold text-slate-900 dark:text-white">{trx.desc}</p>
                                   <p className="text-[10px] text-slate-500 font-mono mt-0.5">{trx.id}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                             {trx.date}
                          </td>
                          <td className="px-6 py-4">
                             <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                                trx.status === 'success' 
                                   ? 'bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30'
                                   : 'bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900/30'
                             }`}>
                                {trx.status === 'success' ? <CheckCircle2 className="w-3 h-3"/> : <AlertCircle className="w-3 h-3"/>}
                                {trx.status}
                             </span>
                          </td>
                          <td className={`px-6 py-4 text-right font-bold text-sm ${
                             trx.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-slate-900 dark:text-white'
                          }`}>
                             {trx.type === 'income' ? '+' : '-'}{formatRupiah(trx.amount)}
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           
           {/* Pagination Footer */}
           <div className="p-5 border-t border-slate-200 dark:border-slate-800 text-center">
              <button className="text-xs font-bold text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                 Lihat Semua Transaksi
              </button>
           </div>

        </div>

      </div>
    </div>
  );
}