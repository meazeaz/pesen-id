"use client";

import { Globe, Lock, ShieldCheck, Zap } from "lucide-react";
import { ProfileState } from "./constants";

export default function AdvancedTab({ profile }: { profile: ProfileState }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-500 relative">
      
      {/* OVERLAY LOCK (Efek Terkunci) */}
      <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-[2px] z-10 rounded-3xl flex flex-col items-center justify-center border-2 border-dashed border-purple-500/30">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl text-center max-w-[280px] border border-slate-200 dark:border-slate-800">
             <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6" />
             </div>
             <h4 className="font-bold text-slate-900 dark:text-white mb-1">Fitur Pro Creator</h4>
             <p className="text-[11px] text-slate-500 mb-4">Upgrade paket Anda untuk menikmati fitur Custom Domain dan Analitik Lanjutan.</p>
             <button className="w-full py-2 bg-purple-600 text-white text-xs font-bold rounded-lg hover:bg-purple-700 transition-colors">
                Upgrade Sekarang
             </button>
          </div>
      </div>

      {/* KONTEN BURAM DI BELAKANG */}
      <div className="opacity-40 grayscale pointer-events-none">
        <div className="bg-slate-50 dark:bg-black/30 border border-slate-200 rounded-3xl p-6 mb-6">
          <h3 className="font-bold text-sm mb-4 flex items-center gap-2"><Globe className="w-4 h-4"/> Custom Domain</h3>
          <div className="flex gap-2">
            <div className="flex-1 bg-white border rounded-xl p-3 text-sm">domain-anda.com</div>
            <div className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs flex items-center">Connect</div>
          </div>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-black/30 border border-slate-200 rounded-3xl">
           <h3 className="font-bold text-sm mb-4 flex items-center gap-2"><Zap className="w-4 h-4"/> Facebook & TikTok Pixel</h3>
           <div className="space-y-4">
              <div className="h-10 bg-white border rounded-xl"></div>
              <div className="h-10 bg-white border rounded-xl"></div>
           </div>
        </div>
      </div>

    </div>
  );
}