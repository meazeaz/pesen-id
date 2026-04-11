"use client";

import { useState } from "react";
import { createNewAdmin } from "@/app/actions/admin";
import { X, UserPlus, Loader2 } from "lucide-react";

export default function AddAdminModal({ onClose }: { onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const res = await createNewAdmin(formData);
    
    if (res.success) {
      alert("Admin baru berhasil didaftarkan!");
      onClose();
      window.location.reload(); // Refresh data
    } else {
      alert(res.message);
    }
    setIsLoading(false);
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-lg flex items-center gap-2 text-slate-900 dark:text-white">
            <UserPlus className="w-5 h-5 text-purple-600" /> Tambah Admin Baru
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Username Admin</label>
            <input name="username" type="text" required className="w-full px-4 py-3 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-purple-500 transition-all text-sm" placeholder="username_admin" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Admin</label>
            <input name="email" type="email" required className="w-full px-4 py-3 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-purple-500 transition-all text-sm" placeholder="admin@pesen.id" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <input name="password" type="password" required className="w-full px-4 py-3 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-purple-500 transition-all text-sm" placeholder="••••••••" />
          </div>

          <button type="submit" disabled={isLoading} className="w-full py-4 bg-slate-900 dark:bg-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-purple-500/20">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Daftarkan Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}