import Link from "next/link";
import { ArrowLeft, ShieldCheck, Zap } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import LoginInfoSlider from "@/components/auth/LoginInfoSlider"; // Import slider baru
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk - Pesen.id",
  description: "Kelola bio link dan produk digitalmu.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-white dark:bg-[#050505] transition-colors duration-500 relative overflow-hidden font-sans">
      
      {/* --- BACKGROUND ANIMATION (AURORA) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] animate-blob" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* --- BAGIAN KIRI: Form Area (Login & Info Singkat) --- */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 relative z-10 w-full lg:w-[45%] bg-white/70 dark:bg-black/40 backdrop-blur-md border-r border-slate-200/50 dark:border-slate-800/50 h-screen overflow-y-auto">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          
          {/* Header Nav */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-purple-600 transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Kembali
            </Link>
            
            {/* System Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 text-[10px] font-bold uppercase mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              System Operational v2.0
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
              Dashboard Kreator
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Masuk untuk mengelola produk, menarik saldo, dan melihat statistik pengunjung.
            </p>
          </div>

          {/* FORM LOGIN (Client Component) */}
          <LoginForm />
          
          {/* Footer Trust Signals (Supported Payments) */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
             <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4 text-center">
               Mendukung Pembayaran & Pencairan
             </p>
             <div className="flex justify-center items-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Logo Placeholder - Ganti dengan SVG Bank Lokal nanti */}
                <div className="h-6 font-bold text-slate-700 dark:text-slate-300 italic">BCA</div>
                <div className="h-6 font-bold text-slate-700 dark:text-slate-300 italic">MANDIRI</div>
                <div className="h-6 font-bold text-slate-700 dark:text-slate-300">QRIS</div>
                <div className="h-6 font-bold text-slate-700 dark:text-slate-300 italic">GOPAY</div>
             </div>
             <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-3 h-3" /> Data Anda terenkripsi & aman.
             </div>
          </div>

        </div>
      </div>

      {/* --- BAGIAN KANAN: Fitur Showcase (Info Slider) --- */}
      <div className="hidden lg:flex flex-1 relative bg-slate-50 dark:bg-[#0a0a0a] items-center justify-center overflow-hidden">
        
        {/* Dekorasi Visual Dinamis */}
        <div className="absolute w-[800px] h-[800px] bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full blur-[100px] opacity-50 animate-pulse" />
        
        {/* Grid Pattern Halus */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />

        {/* KONTEN UTAMA KANAN: SLIDER */}
        <div className="relative z-10 w-full max-w-2xl px-10">
           {/* Header Kecil */}
           <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30 mb-6 text-white text-xl font-bold">
                P
              </div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                 Satu Platform, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">Banyak Cuan.</span>
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                 Bergabunglah dengan ekosistem kreator digital terbesar di Indonesia.
              </p>
           </div>

           {/* Komponen Slider Baru */}
           <LoginInfoSlider />
           
        </div>
      </div>

    </div>
  );
}