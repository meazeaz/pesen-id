"use client";

import { useState, useTransition } from "react";
import { updateOrderStatus } from "@/app/actions/order"; // 👈 KITA PANGGIL LAGI MESIN UBAH STATUS
import { 
  Search, ShoppingBag, Calendar, CreditCard, 
  CheckCircle2, XCircle, Clock, ArrowUpRight, Download
} from "lucide-react";

export type OrderData = {
  id: string;
  customer: string;
  email: string;
  phone: string;
  avatar: string;
  product: string;
  amount: number;
  date: string;
  status: string;
  method: string;
};

export default function OrderListClient({ initialOrders }: { initialOrders: OrderData[] }) {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition(); // 👈 KITA AKTIFKAN LAGI

  // 1. Logic Filter
  const filteredOrders = initialOrders.filter(order => {
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    const matchesSearch = 
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // 2. Kalkulasi Statistik
  const totalPendapatan = initialOrders
    .filter(o => o.status === "paid")
    .reduce((sum, order) => sum + order.amount, 0);
    
  const totalPending = initialOrders.filter(o => o.status === "pending").length;
  const totalSukses = initialOrders.filter(o => o.status === "paid").length;

  const formatRupiah = (num: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);

  // 3. Helper Warna & Icon Status
  const getStatusColor = (status: string) => {
    switch(status) {
      case "paid": return "bg-green-100 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-400";
      case "pending": return "bg-yellow-100 text-yellow-600 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "failed": return "bg-red-100 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400";
      case "expired": return "bg-slate-200 text-slate-600 border-slate-300 dark:bg-slate-800 dark:text-slate-400";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "paid": return <CheckCircle2 className="w-3 h-3" />;
      case "pending": return <Clock className="w-3 h-3" />;
      case "failed": return <XCircle className="w-3 h-3" />;
      case "expired": return <Clock className="w-3 h-3 opacity-50" />;
      default: return null;
    }
  };

  // 4. FUNGSI UBAH STATUS (Dikembalikan!)
  const handleStatusChange = (orderId: string, newStatus: string) => {
    startTransition(async () => {
      await updateOrderStatus(orderId, newStatus);
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-6 lg:p-8 space-y-8">

        {/* --- HEADER --- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-3">
              Riwayat Pesanan
              <span className="bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300 text-sm px-2.5 py-0.5 rounded-full border border-slate-300 dark:border-white/10">
                {initialOrders.length} Transaksi
              </span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Mode Manual: Ubah status pesanan secara manual selama di Localhost.
            </p>
          </div>
        </div>

        {/* --- STATS SUMMARY --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
           {/* Card 1: Pendapatan */}
           <div className="bg-linear-to-br from-purple-600 to-indigo-600 p-6 rounded-2xl text-white shadow-lg shadow-purple-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">Total Pendapatan</p>
              <h3 className="text-3xl font-bold">{formatRupiah(totalPendapatan)}</h3>
              <div className="mt-4 flex items-center gap-1 text-xs bg-white/20 w-fit px-2 py-1 rounded-lg backdrop-blur-sm">
                 <ArrowUpRight className="w-3 h-3" /> Bersih dari transaksi sukses
              </div>
           </div>

           {/* Card 2: Pending */}
           <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex flex-col justify-between group hover:border-yellow-500/30 transition-colors">
              <div>
                 <div className="flex justify-between items-start mb-2">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Menunggu Pembayaran</p>
                    <div className="p-2 bg-yellow-50 dark:bg-yellow-900/10 text-yellow-600 rounded-lg">
                       <Clock className="w-5 h-5" />
                    </div>
                 </div>
                 <h3 className="text-2xl font-bold">{totalPending} Pesanan</h3>
              </div>
              <p className="text-xs text-slate-400 mt-2">Menunggu konfirmasi manual Anda.</p>
           </div>

           {/* Card 3: Sukses */}
           <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex flex-col justify-between group hover:border-green-500/30 transition-colors">
              <div>
                 <div className="flex justify-between items-start mb-2">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Transaksi Sukses</p>
                    <div className="p-2 bg-green-50 dark:bg-green-900/10 text-green-600 rounded-lg">
                       <CheckCircle2 className="w-5 h-5" />
                    </div>
                 </div>
                 <h3 className="text-2xl font-bold">{totalSukses}</h3>
              </div>
              <p className="text-xs text-slate-400 mt-2">Berhasil dikonfirmasi manual.</p>
           </div>
        </div>

        {/* --- ORDERS TABLE --- */}
        <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden flex flex-col">
           
           {/* Toolbar */}
           <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-white/5">
              <div className="flex bg-slate-200 dark:bg-black/40 p-1 rounded-xl w-full md:w-auto">
                 {[
                   { id: "all", label: "Semua" }, 
                   { id: "paid", label: "Berhasil" }, 
                   { id: "pending", label: "Pending" }, 
                   { id: "expired", label: "Kadaluarsa" },
                   { id: "failed", label: "Gagal" }
                 ].map((status) => (
                    <button
                       key={status.id}
                       onClick={() => setFilterStatus(status.id)}
                       className={`flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded-lg capitalize transition-all ${
                          filterStatus === status.id 
                             ? "bg-white dark:bg-[#121212] text-slate-900 dark:text-white shadow-sm" 
                             : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                       }`}
                    >
                       {status.label}
                    </button>
                 ))}
              </div>

              <div className="relative w-full md:w-80 group">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                 <input 
                    type="text" 
                    placeholder="Cari nama pelanggan atau ID..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-black/40 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-slate-400"
                 />
              </div>
           </div>

           {/* Table */}
           <div className="overflow-x-auto min-h-[400px]">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-xs uppercase text-slate-500 dark:text-slate-400 bg-white dark:bg-[#121212]">
                       <th className="px-6 py-4 font-bold tracking-wider">Order ID</th>
                       <th className="px-6 py-4 font-bold tracking-wider">Pelanggan</th>
                       <th className="px-6 py-4 font-bold tracking-wider">Produk</th>
                       <th className="px-6 py-4 font-bold tracking-wider">Total</th>
                       <th className="px-6 py-4 font-bold tracking-wider">Status Tampilan</th>
                       <th className="px-6 py-4 font-bold tracking-wider text-right">Aksi Manual</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-[#121212]">
                    {filteredOrders.length > 0 ? (
                       filteredOrders.map((order) => (
                          <tr key={order.id} className={`group hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors duration-200 ${isPending ? 'opacity-70' : ''}`}>
                             
                             <td className="px-6 py-4">
                                <span className="text-sm font-bold text-slate-900 dark:text-white block font-mono uppercase">
                                   #{order.id.slice(0, 8)}
                                </span>
                                <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-1">
                                   <Calendar className="w-3 h-3" /> {order.date}
                                </span>
                             </td>

                             <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                   <img src={order.avatar} className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100" alt="avatar" />
                                   <div>
                                      <p className="text-sm font-bold text-slate-900 dark:text-white">{order.customer}</p>
                                      <p className="text-[10px] text-slate-500">{order.email}</p>
                                   </div>
                                </div>
                             </td>

                             <td className="px-6 py-4">
                                <div className="text-sm text-slate-600 dark:text-slate-300 font-medium max-w-[200px] truncate" title={order.product}>
                                   {order.product}
                                </div>
                                <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                                   <CreditCard className="w-3 h-3" /> {order.method}
                                </div>
                             </td>

                             <td className="px-6 py-4">
                                <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                                   {formatRupiah(order.amount)}
                                </span>
                             </td>

                             {/* Status Badge Tampilan */}
                             <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${getStatusColor(order.status)}`}>
                                   {getStatusIcon(order.status)}
                                   {order.status === 'paid' ? 'Berhasil' : order.status === 'pending' ? 'Pending' : order.status === 'expired' ? 'Kadaluarsa' : 'Gagal'}
                                </span>
                             </td>

                             {/* Keterangan Otomatis Diganti Jadi Dropdown Manual Lagi */}
                             <td className="px-6 py-4 text-right">
                               <select 
                                 value={order.status}
                                 onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                 disabled={isPending}
                                 className="text-xs font-bold bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 outline-none cursor-pointer hover:border-purple-500 transition-colors disabled:cursor-not-allowed"
                               >
                                 <option value="pending">⏳ Pending</option>
                                 <option value="paid">✅ Berhasil</option>
                                 <option value="expired">⏰ Kadaluarsa</option>
                                 <option value="failed">❌ Gagal/Batal</option>
                               </select>
                             </td>

                          </tr>
                       ))
                    ) : (
                       <tr>
                          <td colSpan={6} className="px-6 py-20 text-center">
                             <div className="flex flex-col items-center justify-center">
                                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-slate-200 dark:border-slate-700">
                                   <ShoppingBag className="w-8 h-8 text-slate-300 dark:text-slate-500" />
                                </div>
                                <h3 className="text-slate-900 dark:text-white font-bold mb-1 text-lg">Tidak ada pesanan</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Belum ada transaksi yang sesuai dengan filter.</p>
                             </div>
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