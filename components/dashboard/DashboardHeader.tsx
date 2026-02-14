"use client";

import { Bell, Search } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle"; // Pastikan path ini benar (naik 1 folder ke components)

// PERHATIKAN: Harus ada "export default"
export default function DashboardHeader() {
  return (
    <header className="h-16 bg-white/80 dark:bg-[#0f0f0f]/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 md:px-8 sticky top-0 z-40">
      
      {/* Search Bar (Kiri) */}
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full max-w-sm hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari produk atau pesanan..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white placeholder-slate-500"
          />
        </div>
      </div>

      {/* Action Kanan */}
      <div className="flex items-center gap-4">
        {/* Pastikan ThemeToggle tidak error disini */}
        <ThemeToggle />
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0f0f0f]"></span>
        </button>
      </div>
    </header>
  );
}