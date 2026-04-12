"use client";

import { useState } from "react";
import { Globe, Zap, Crown } from "lucide-react";
import { ProfileState } from "./constants";
import { createUpgradeCheckout } from "@/app/actions/upgrade";

export default function AdvancedTab({ profile, isPro }: { profile: ProfileState, isPro: boolean }) {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    const res = await createUpgradeCheckout(window.location.origin);
    if (res.success && res.invoiceUrl) {
      window.location.href = res.invoiceUrl;
    } else {
      alert(res.message || "Gagal membuat tagihan.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-500 relative">
      
      {/* OVERLAY LOCK (Hanya muncul jika user belum Pro) */}
      {!isPro && (
        <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-[2px] z-10 rounded-3xl flex flex-col items-center justify-center border-2 border-dashed border-purple-500/30">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl text-center max-w-[320px] border border-slate-200 dark:border-slate-800 animate-in zoom-in-95">
               <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/20">
                  <Crown className="w-8 h-8" />
               </div>
               <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Fitur Pro Creator</h4>
               <p className="text-xs text-slate-500 mb-6 leading-relaxed">Upgrade paket Anda seharga <b>Rp 49.000</b> untuk menikmati fitur Custom Domain, Tracking Pixel, dan Upload hingga 200MB.</p>
               <button 
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full py-3 bg-purple-600 text-white text-sm font-bold rounded-xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/20 active:scale-95 disabled:opacity-50"
               >
                  {loading ? "Menyiapkan Kasir..." : "Upgrade Sekarang"}
               </button>
            </div>
        </div>
      )}

      {/* KONTEN FITUR ADVANCED */}
      <div className={`${!isPro ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
        <div className="bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 mb-6">
          <h3 className="font-bold text-sm mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
            <Globe className="w-4 h-4 text-blue-500"/> Custom Domain
          </h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="text" 
              placeholder="domain-anda.com" 
              className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500/20"
            />
            <button className="bg-slate-900 dark:bg-white dark:text-black text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:opacity-80 transition-all">
              Hubungkan
            </button>
          </div>
          <p className="text-[10px] text-slate-500 mt-3 italic">*Pastikan Anda sudah mengarahkan A Record domain ke IP Pesen.id</p>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-slate-800 rounded-3xl">
           <h3 className="font-bold text-sm mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
             <Zap className="w-4 h-4 text-orange-500"/> Tracking Pixel
           </h3>
           <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">Facebook Pixel ID</label>
                <input type="text" placeholder="Contoh: 1234567890" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">TikTok Pixel ID</label>
                <input type="text" placeholder="Contoh: C6H12O6..." className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none" />
              </div>
           </div>
        </div>
      </div>

    </div>
  );
}