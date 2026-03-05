import type { Metadata } from "next";
import Sidebar from "@/components/dashboard/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle"; 
import { Bell, Menu } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard Admin - Pesen.id",
  description: "Kelola produk, pesanan, dan profil bio link Anda.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-slate-50 dark:bg-[#09090b] transition-colors duration-300">
      
      {/* 1. Sidebar */}
      <Sidebar />

      {/* 2. Main Content Wrapper */}
      {/* KUNCI PERBAIKAN: Hapus md:pl-64, gunakan style inline var CSS */}
      <div 
        className="flex-1 flex flex-col min-w-0 transition-all duration-300 max-md:!pl-0"
        style={{ paddingLeft: "var(--sidebar-width, 16rem)" }}
      >
        
        {/* --- HEADER --- */}
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white/80 px-4 md:px-8 backdrop-blur-xl dark:border-slate-800 dark:bg-[#09090b]/80">
          
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-xl dark:text-slate-300 dark:hover:bg-white/10 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Dashboard <span className="mx-2">/</span> <span className="text-slate-900 dark:text-white font-bold">Overview</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <ThemeToggle />
            <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-xl dark:text-slate-300 dark:hover:bg-white/10 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white dark:border-[#09090b]"></span>
            </button>
            <div className="hidden sm:block w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">Ilham Dev</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Admin</span>
              </div>
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ilham" 
                alt="Profile" 
                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800"
              />
            </div>
          </div>
        </header>

        {/* --- AREA KONTEN --- */}
        <main className="flex-1 overflow-x-hidden relative">
          {children}
        </main>
        
      </div>
    </div>
  );
}