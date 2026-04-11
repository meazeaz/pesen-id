"use client";

import { useState } from "react";
import { Bell, Search, CheckCircle2, Info } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle"; 
import { markNotificationsAsRead } from "@/app/actions/header"; 

type HeaderProps = {
  headerData?: {
    user: {
      name: string | null;
      username: string;
      image: string | null;
      role: string;
      isPro: boolean;
    };
    notifications: Array<{
      id: string;
      title: string;
      message: string;
      isRead: boolean;
      type: string; // <--- TAMBAHKAN BARIS INI
      createdAt: Date;
    }>;
    unreadCount: number;
  } | null;
};

export default function DashboardHeader({ headerData }: HeaderProps) {
  const [showNotif, setShowNotif] = useState(false);
  
  // Gunakan optional chaining (?.) untuk menghindari error jika headerData null
  const [unreadCount, setUnreadCount] = useState(headerData?.unreadCount || 0);
  const [notifications, setNotifications] = useState(headerData?.notifications || []);

  const handleOpenNotif = async () => {
    setShowNotif(!showNotif);
    if (!showNotif && unreadCount > 0) {
      await markNotificationsAsRead();
      setUnreadCount(0);
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    }
  };

  const timeAgo = (dateString: Date) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return "Baru saja";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} menit lalu`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} jam lalu`;
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  };

  // Logic Status Dinamis
  const user = headerData?.user;
  const roleLabel = user?.role === "ADMIN" ? "ADMIN" : user?.isPro ? "PRO CREATOR" : "BASIC USER";
  const roleColor = user?.role === "ADMIN" ? "text-blue-500" : user?.isPro ? "text-purple-500" : "text-slate-500";
  const borderRoleColor = user?.role === "ADMIN" ? "border-blue-500" : user?.isPro ? "border-purple-500" : "border-slate-200 dark:border-slate-800";

  return (
    <header className="h-16 bg-white/80 dark:bg-[#0f0f0f]/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 md:px-8 sticky top-0 z-40">
      
      {/* --- KIRI: SEARCH BAR --- */}
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full max-w-sm hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari produk atau pesanan..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white placeholder-slate-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* --- KANAN: ACTIONS & PROFILE --- */}
      <div className="flex items-center gap-2 sm:gap-4">
        
        <ThemeToggle />

        {/* --- LONCENG NOTIFIKASI --- */}
        <div className="relative">
          <button 
            onClick={handleOpenNotif} 
            className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-[#0f0f0f] animate-pulse"></span>
            )}
          </button>

          {/* Modal Dropdown Notifikasi */}
          {showNotif && (
            <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 origin-top-right">
               <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Notifikasi</h4>
                  <span className="text-[10px] bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full font-bold">{notifications.length} Baru</span>
               </div>
               
               <div className="max-h-80 overflow-y-auto">
                 {notifications.length > 0 ? (
                   <div className="divide-y divide-slate-100 dark:divide-slate-800">
                     {notifications.map((notif) => (
                       <div key={notif.id} className={`p-4 flex gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${!notif.isRead ? 'bg-purple-50/50 dark:bg-purple-900/10' : ''}`}>
                          <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${!notif.isRead ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                             {notif.type === "order" ? <CheckCircle2 className="w-4 h-4"/> : <Info className="w-4 h-4"/>}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{notif.title}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">{notif.message}</p>
                            <p className="text-[10px] font-bold text-purple-500 mt-2 uppercase tracking-widest">{timeAgo(notif.createdAt)}</p>
                          </div>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <div className="p-8 text-center flex flex-col items-center">
                     <Bell className="w-8 h-8 text-slate-300 dark:text-slate-700 mb-3" />
                     <p className="text-sm text-slate-500 font-bold">Belum ada notifikasi.</p>
                   </div>
                 )}
               </div>
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>

        {/* --- PROFIL DINAMIS --- */}
        {user ? (
          <div className="flex items-center gap-3 ml-1 sm:ml-0 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-500 transition-colors">
                 {user.name || user.username}
              </p>
              <p className={`text-[10px] font-black uppercase tracking-widest mt-0.5 ${roleColor}`}>
                {roleLabel}
              </p>
            </div>
            <img 
              src={user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`} 
              alt="Profile" 
              className={`w-9 h-9 rounded-xl object-cover border-2 shadow-sm ${borderRoleColor}`}
            />
          </div>
        ) : (
          <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
        )}

      </div>
    </header>
  );
}