"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  BarChart3, 
  Palette, 
  Settings, 
  LogOut, 
  UserCircle 
} from "lucide-react";

const menuItems = [
  { name: "Ringkasan", href: "/dashboard", icon: LayoutDashboard },
  { name: "Produk", href: "/dashboard/products", icon: ShoppingBag },
  { name: "Analitik", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Tampilan", href: "/dashboard/appearance", icon: Palette },
  { name: "Pengaturan", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#0f0f0f] border-r border-slate-200 dark:border-slate-800 hidden md:flex flex-col">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-slate-800/50">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white text-xs shadow-md">
            P
          </div>
          pesen.id
        </Link>
      </div>

      {/* Menu Navigasi */}
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-purple-600 dark:text-purple-400" : "text-slate-400"}`} />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* User Profile (Bawah) */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800/50">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Felix Yuniar</p>
            <p className="text-xs text-slate-500 truncate">Kreator Pro</p>
          </div>
          <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-500 transition-colors" />
        </div>
      </div>
    </aside>
  );
}