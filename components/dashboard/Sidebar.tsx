"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react"; // 👈 Tambah useSession
import { 
  LayoutDashboard, ShoppingBag, Package, BarChart3, 
  Wallet, CreditCard, MessageCircle, Star, Settings, 
  ExternalLink, ChevronLeft, ChevronRight, LogOut 
} from "lucide-react";
import { getSidebarData } from "@/app/actions/sidebar"; // 👈 Import fungsi data

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // State untuk menyimpan data dinamis dari database
  const [storeData, setStoreData] = useState({ username: "", terjual: 0, saldo: 0 });

  // Tarik data saat sidebar dimuat
  useEffect(() => {
    if (session?.user?.email) {
      getSidebarData().then((data) => {
        if (data) setStoreData(data);
      });
    }
  }, [session]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sidebar-width', 
      isCollapsed ? '5rem' : '16rem'
    );
  }, [isCollapsed]);

  const isActive = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") return true;
    if (path !== "/dashboard" && pathname.startsWith(path)) return true;
    return false;
  };

  // Helper untuk menyingkat angka Rupiah
  const formatRupiah = (angka: number) => {
    // 👈 KUNCI PERBAIKAN: Tangani angka 0 secara manual agar Server & Browser akur
    if (angka === 0) return "Rp 0"; 

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      notation: "compact", 
      maximumFractionDigits: 1,
    }).format(angka);
  };

  const MenuItem = ({ href, icon: Icon, label }: any) => (
    <Link 
      href={href} 
      className={`relative flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium mb-1 group ${
        isActive(href) 
          ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30" 
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 flex-shrink-0 ${isActive(href) ? "text-white" : "text-slate-400 group-hover:text-purple-500 transition-colors"}`} />
        {!isCollapsed && <span className="whitespace-nowrap transition-opacity duration-300">{label}</span>}
      </div>
      
      {isCollapsed && (
         <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none z-50 whitespace-nowrap shadow-xl transition-opacity">
            {label}
            <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2.5 h-2.5 bg-slate-900 dark:bg-white rotate-45 rounded-sm"></div>
         </div>
      )}
    </Link>
  );

  return (
    <aside className={`fixed left-0 top-0 z-50 h-screen bg-white dark:bg-[#0f0f0f] border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}>
      
      <button 
        suppressHydrationWarning // 👈 Tambahkan perintah ini untuk membungkam error
        onClick={() => setIsCollapsed(!isCollapsed)} 
        className="absolute -right-3.5 top-7 bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-purple-600 rounded-full p-1 z-50 shadow-sm transition-transform hover:scale-110"
      >
         {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      <div className={`h-20 flex items-center border-b border-slate-100 dark:border-slate-800 shrink-0 transition-all ${isCollapsed ? 'justify-center px-0' : 'px-6'}`}>
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 flex-shrink-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-purple-500/30">P</div>
          {!isCollapsed && <span className="text-xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-400 bg-clip-text text-transparent whitespace-nowrap">Pesen.id</span>}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar overflow-x-hidden">
        <div>
          <h3 className={`text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 transition-all ${isCollapsed ? 'text-center px-0' : 'px-4'}`}>{isCollapsed ? '•••' : 'Manajemen Toko'}</h3>
          <nav>
            <MenuItem href="/dashboard" icon={LayoutDashboard} label="Dashboard" />
            <MenuItem href="/dashboard/orders" icon={ShoppingBag} label="Pesanan" /> 
            <MenuItem href="/dashboard/products" icon={Package} label="Produk" /> 
            <MenuItem href="/dashboard/stats" icon={BarChart3} label="Statistik" />
          </nav>
        </div>
        <div>
          <h3 className={`text-[10px] font-extrabold text-purple-500 uppercase tracking-widest mb-3 transition-all ${isCollapsed ? 'text-center px-0' : 'px-4'}`}>{isCollapsed ? '•••' : 'Keuangan'}</h3>
          <nav>
            <MenuItem href="/dashboard/wallet" icon={Wallet} label="Dompet Saya" />
          </nav>
        </div>
        <div>
          <h3 className={`text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 transition-all ${isCollapsed ? 'text-center px-0' : 'px-4'}`}>{isCollapsed ? '•••' : 'Interaksi'}</h3>
          <nav>
            <MenuItem href="/dashboard/reviews" icon={Star} label="Ulasan Pembeli" />
          </nav>
        </div>
        <div>
          <h3 className={`text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 transition-all ${isCollapsed ? 'text-center px-0' : 'px-4'}`}>{isCollapsed ? '•••' : 'Sistem'}</h3>
          <nav>
            <MenuItem href="/dashboard/settings" icon={Settings} label="Pengaturan" />
            {/* Keamanan Akun Dihapus dari sini */}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-white/5 flex flex-col gap-3 overflow-hidden">
        {!isCollapsed && (
           <div className="grid grid-cols-2 gap-3 transition-opacity duration-300">
              <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-700 p-3 rounded-xl flex flex-col justify-center">
                 <p className="text-[10px] text-slate-500 uppercase font-bold">Terjual</p>
                 {/* 👇 Data Dinamis */}
                 <p className="text-sm font-bold text-slate-900 dark:text-white">{storeData.terjual}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-3 rounded-xl text-white shadow-lg shadow-purple-500/20 flex flex-col justify-center relative group cursor-pointer">
                 <p className="text-[10px] opacity-80 uppercase font-bold relative z-10">Saldo Aktif</p>
                 {/* 👇 Data Dinamis & Terformat */}
                 <p className="text-sm font-bold relative z-10">{formatRupiah(storeData.saldo)}</p>
              </div>
           </div>
        )}

        {/* 👇 Link Toko Dinamis */}
        <Link href={storeData.username ? `/${storeData.username}` : "#"} target="_blank" className={`flex items-center ${isCollapsed ? 'justify-center p-3' : 'justify-center gap-2 py-2.5'} w-full text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-white dark:hover:bg-white/10 transition-all group`} title={isCollapsed ? "Lihat Toko Saya" : ""}>
           <ExternalLink className={`w-4 h-4 flex-shrink-0 ${isCollapsed && 'group-hover:scale-110 transition-transform'}`} /> 
           {!isCollapsed && <span className="whitespace-nowrap">Lihat Toko Saya</span>}
        </Link>

        {/* --- TOMBOL LOGOUT --- */}
        <button 
          onClick={() => signOut({ callbackUrl: '/login' })}
          title={isCollapsed ? "Keluar" : ""}
          className={`mt-2 flex items-center ${isCollapsed ? 'justify-center p-3' : 'justify-center gap-2 py-2.5'} w-full text-xs font-bold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/50 border border-red-100 dark:border-red-900/30 rounded-xl transition-all group`}
        >
           <LogOut className={`w-4 h-4 flex-shrink-0 ${isCollapsed && 'group-hover:scale-110 transition-transform'}`} />
           {!isCollapsed && <span className="whitespace-nowrap">Keluar (Logout)</span>}
        </button>
        
      </div>
    </aside>
  );
}