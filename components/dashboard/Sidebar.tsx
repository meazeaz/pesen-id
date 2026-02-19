"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, ShoppingBag, Package, BarChart3, 
  Wallet, CreditCard, MessageCircle, Star, Settings, 
  ExternalLink, LogOut, ChevronDown 
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  
  // Helper: Cek apakah link sedang aktif
  const isActive = (path: string) => pathname === path;

  // Komponen Item Menu Reusable
  const MenuItem = ({ href, icon: Icon, label, badge }: any) => (
    <Link 
      href={href} 
      className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition-all text-sm font-medium mb-1 group ${
        isActive(href) 
          ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30" // Active State Premium
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-4 h-4 ${isActive(href) ? "text-white" : "text-slate-400 group-hover:text-purple-500 transition-colors"}`} />
        {label}
      </div>
      {badge && (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
          isActive(href) ? "bg-white/20 text-white" : "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
        }`}>
          {badge}
        </span>
      )}
    </Link>
  );

  return (
    <aside className="fixed left-0 top-0 z-50 w-64 h-screen bg-white dark:bg-[#0f0f0f] border-r border-slate-200 dark:border-slate-800 flex flex-col transition-colors duration-300">
      
      {/* 1. Logo Brand */}
      <div className="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">
            P
          </div>
          <span className="text-xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            Pesen.id
          </span>
        </div>
      </div>

      {/* 2. Menu Groups (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
        
        {/* Group: Manajemen Toko */}
        <div>
          <h3 className="px-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Manajemen Toko</h3>
          <nav>
            <MenuItem href="/dashboard" icon={LayoutDashboard} label="Dashboard" />
            <MenuItem href="/dashboard/orders" icon={ShoppingBag} label="Pesanan" badge="3" />
            <MenuItem href="/dashboard/products" icon={Package} label="Produk" badge="12" />
            <MenuItem href="/dashboard/stats" icon={BarChart3} label="Statistik" />
          </nav>
        </div>

        {/* Group: Dompet & Bank */}
        <div>
          <h3 className="px-4 text-[10px] font-extrabold text-purple-500 uppercase tracking-widest mb-3">Keuangan</h3>
          <nav>
            <MenuItem href="/dashboard/wallet" icon={Wallet} label="Dompet Pesen" />
            <MenuItem href="/dashboard/bank" icon={CreditCard} label="Rekening Bank" />
          </nav>
        </div>

        {/* Group: Pelanggan */}
        <div>
          <h3 className="px-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Interaksi</h3>
          <nav>
            <MenuItem href="/dashboard/chat" icon={MessageCircle} label="Live Chat" badge="New" />
            <MenuItem href="/dashboard/reviews" icon={Star} label="Ulasan Pembeli" />
          </nav>
        </div>

        {/* Group: System */}
        <div>
          <h3 className="px-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Lainnya</h3>
          <nav>
            <MenuItem href="/dashboard/settings" icon={Settings} label="Pengaturan" />
          </nav>
        </div>
      </div>

      {/* 3. Bottom Stats (Sesuai Gambar Referensi) */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-white/5 space-y-3">
        
        {/* Kartu Saldo & Terjual */}
        <div className="grid grid-cols-2 gap-3">
           <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-700 p-3 rounded-xl flex flex-col justify-center">
              <p className="text-[10px] text-slate-500 uppercase font-bold">Terjual</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">120</p>
           </div>
           <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-3 rounded-xl text-white shadow-lg shadow-purple-500/20 flex flex-col justify-center relative overflow-hidden group cursor-pointer">
              <div className="absolute top-0 right-0 w-8 h-8 bg-white/10 rounded-bl-full -mr-2 -mt-2 group-hover:scale-125 transition-transform"></div>
              <p className="text-[10px] opacity-80 uppercase font-bold relative z-10">Saldo Aktif</p>
              <p className="text-sm font-bold relative z-10">Rp 2.5jt</p>
           </div>
        </div>

        {/* Link Profil Eksternal */}
        <Link 
           href="/ilham" 
           target="_blank"
           className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-white dark:hover:bg-white/10 transition-all"
        >
           <ExternalLink className="w-3 h-3" /> Lihat Toko Saya
        </Link>
      </div>

    </aside>
  );
}