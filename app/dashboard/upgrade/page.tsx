"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { CheckCircle2, Crown, X, Zap, ShieldCheck, Clock } from "lucide-react";
import { createUpgradeCheckout, forceUpgradeToPro } from "@/app/actions/upgrade";
import { getUserSettings } from "@/app/actions/settings";

export default function UpgradePage() {
  const { data: session, status } = useSession();
  const [isPro, setIsPro] = useState(false);
  const [proUntil, setProUntil] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const fetchStatus = () => {
    if (session?.user?.email) {
      getUserSettings(session.user.email).then((data) => {
        if (data) {
          setIsPro((data as any).isPro || false);
          setProUntil((data as any).proUntil || null);
        }
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  };

  useEffect(() => {
    if (status === "authenticated") fetchStatus();
    else if (status === "unauthenticated") setLoading(false);
  }, [session, status]);

  const handleUpgrade = async () => {
    setCheckoutLoading(true);
    const res = await createUpgradeCheckout(window.location.origin);
    if (res.success && res.invoiceUrl) {
      window.location.href = res.invoiceUrl;
    } else {
      alert(res.message || "Gagal membuat tagihan.");
      setCheckoutLoading(false);
    }
  };

  const handleCheatUpgrade = async () => {
    if(confirm("Gunakan jalur dalam untuk jadikan akun ini PRO (1 Bulan) untuk testing?")) {
      setCheckoutLoading(true);
      const res = await forceUpgradeToPro();
      if (res.success) {
        alert("🎉 BOOM! Akun Anda sekarang adalah PRO CREATOR selama 30 Hari!");
        window.location.reload(); 
      } else {
        alert("Gagal cheat.");
        setCheckoutLoading(false);
      }
    }
  };

  if (loading) {
    return <div className="flex h-[80vh] items-center justify-center font-bold text-slate-500 animate-pulse">Memeriksa status akun...</div>;
  }

  // Format tanggal kedaluwarsa menjadi format Indonesia
  const formattedExpiry = proUntil 
    ? new Date(proUntil).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  return (
    <div className="min-h-[90vh] bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-slate-100 p-6 lg:p-10 font-sans">
      
      <div className="text-center max-w-2xl mx-auto mb-12 animate-in slide-in-from-bottom-4 duration-500">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-4 border border-purple-200 dark:border-purple-800/50">
          <Crown className="w-4 h-4" /> Upgrade Paket
        </div>
        <h1 className="text-3xl md:text-5xl font-black mb-4">Pilih paket yang sesuai dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">kebutuhanmu.</span></h1>
        <p className="text-slate-500 dark:text-slate-400">Tingkatkan penjualan Anda dengan fitur-fitur profesional. Fleksibel, bayar bulanan.</p>
      </div>

      {isPro ? (
        <div className="max-w-md mx-auto text-center bg-gradient-to-br from-purple-600 to-blue-600 p-8 rounded-3xl shadow-2xl shadow-purple-500/20 text-white animate-in zoom-in-95">
          <Crown className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
          <h2 className="text-2xl font-black mb-2">Anda adalah Pro Creator!</h2>
          <p className="opacity-90 mb-6 text-sm leading-relaxed">Terima kasih telah berlangganan. Semua fitur premium seperti Upload 200MB, Blok YouTube, dan Custom Domain sudah terbuka untuk Anda.</p>
          
          <div className="bg-white/20 backdrop-blur-md px-4 py-3 rounded-xl flex flex-col items-center justify-center gap-1 shadow-inner">
            <span className="text-xs font-bold uppercase tracking-widest opacity-80 flex items-center gap-1"><Clock className="w-3 h-3"/> Masa Aktif Hingga</span>
            <span className="text-lg font-black">{formattedExpiry}</span>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          <div className="bg-white dark:bg-[#121212] p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm animate-in slide-in-from-left-8 duration-700">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Starter</h3>
            <div className="my-4 flex items-end gap-1"><span className="text-4xl font-black">Rp 0</span></div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Cocok untuk pemula yang baru mulai.</p>
            
            <div className="space-y-4 text-sm font-medium">
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300"><CheckCircle2 className="w-5 h-5 text-slate-300 dark:text-slate-600" /> Maksimal 10 Produk Digital</div>
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300"><CheckCircle2 className="w-5 h-5 text-slate-300 dark:text-slate-600" /> Upload File Maks 32MB</div>
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300"><CheckCircle2 className="w-5 h-5 text-slate-300 dark:text-slate-600" /> Tema & Tampilan Standar</div>
              <div className="flex items-center gap-3 text-slate-400"><X className="w-5 h-5 text-red-400" /> Ada Watermark Pesen.id</div>
              <div className="flex items-center gap-3 text-slate-400"><X className="w-5 h-5 text-red-400" /> Embed Video YouTube</div>
              <div className="flex items-center gap-3 text-slate-400"><X className="w-5 h-5 text-red-400" /> Custom Domain & FB Pixel</div>
            </div>

            <button disabled className="w-full mt-10 py-3.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold rounded-xl cursor-not-allowed">
              Paket Saat Ini
            </button>
          </div>

          <div className="relative bg-gradient-to-br from-slate-900 to-black p-8 rounded-[2.5rem] border border-slate-700 shadow-2xl animate-in slide-in-from-right-8 duration-700 overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full"></div>
            <div className="absolute absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">Paling Laris</div>

            <h3 className="text-xl font-bold text-white flex items-center gap-2">Pro Creator <Zap className="w-5 h-5 text-yellow-400 fill-current"/></h3>
            <div className="my-4 flex items-end gap-1 text-white">
              <span className="text-4xl font-black">Rp 49rb</span><span className="text-slate-400 text-sm mb-1">/bulan</span>
            </div>
            <p className="text-sm text-slate-400 mb-8">Untuk kreator serius yang ingin meroket.</p>
            
            <div className="space-y-4 text-sm font-medium text-slate-200">
              <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-purple-400 fill-current/20" /> <span className="font-bold text-white">Unlimited</span> Produk Digital</div>
              <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-purple-400 fill-current/20" /> Upload File Super Besar <span className="font-bold text-white">(200MB)</span></div>
              <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-purple-400 fill-current/20" /> Tampilan Toko Premium</div>
              <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-purple-400 fill-current/20" /> Hapus Watermark (Remove Branding)</div>
              <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-purple-400 fill-current/20" /> Fitur Embed Video YouTube</div>
              <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-purple-400 fill-current/20" /> Custom Domain & Tracking Pixel</div>
            </div>

            <button 
              onClick={handleUpgrade}
              disabled={checkoutLoading}
              className="relative w-full mt-10 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-500/25 active:scale-95 z-10"
            >
              {checkoutLoading ? "Memproses..." : "Langganan Sekarang 🚀"}
            </button>

            {/* TOMBOL CHEAT UNTUK TESTING */}
            <button 
              onClick={handleCheatUpgrade}
              disabled={checkoutLoading}
              className="relative w-full mt-3 py-2 border border-slate-700 text-slate-400 text-xs font-bold rounded-xl hover:bg-slate-800 transition-all z-10"
            >
              🛠️ Cheat: Jadikan Pro 30 Hari
            </button>

          </div>
        </div>
      )}
    </div>
  );
}