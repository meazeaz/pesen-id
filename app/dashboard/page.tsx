import { DollarSign, ShoppingBag, Users, ArrowUpRight } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header Halaman */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Ringkasan</h1>
        <p className="text-slate-500 dark:text-slate-400">Selamat datang kembali! 👋</p>
      </div>

      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Pendapatan", val: "Rp 12.500.000", icon: DollarSign, color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/20", trend: "+12%" },
          { label: "Produk Terjual", val: "148", icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/20", trend: "+5%" },
          { label: "Pengunjung Profil", val: "8.2k", icon: Users, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/20", trend: "+24%" },
        ].map((stat, i) => (
          <div key={i} className="p-6 bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
                <ArrowUpRight className="w-3 h-3" /> {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stat.val}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Area Kosong untuk Grafik (Placeholder) */}
      <div className="h-64 bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex items-center justify-center border-dashed">
        <p className="text-slate-400 text-sm">Grafik Analitik akan muncul di sini</p>
      </div>
    </div>
  );
}