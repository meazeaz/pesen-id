import Link from "next/link";
import { ArrowLeft, Rocket, ShieldCheck } from "lucide-react";
import RegisterForm from "@/components/auth/RegisterForm";
import LoginInfoSlider from "@/components/auth/LoginInfoSlider"; // Kita pakai ulang Slider Login
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Akun - Pesen.id",
  description: "Mulai perjalanan monetisasi digitalmu sekarang.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex bg-white dark:bg-[#050505] transition-colors duration-500 relative overflow-hidden font-sans">
      
      {/* --- BACKGROUND ANIMATION (AURORA) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] animate-blob" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* --- BAGIAN KIRI: Form Area --- */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 relative z-10 w-full lg:w-[45%] bg-white/70 dark:bg-black/40 backdrop-blur-md border-r border-slate-200/50 dark:border-slate-800/50 h-screen overflow-y-auto">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          
          {/* Header Nav */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-purple-600 transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Kembali
            </Link>
            
            {/* Badge Promo */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 text-[10px] font-bold uppercase mb-4">
              <Rocket className="w-3 h-3 animate-pulse" />
              Gratis Untuk 1 Bulan Premium
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
              Bergabung Sekarang
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Klaim username unikmu sebelum diambil orang lain.
            </p>
          </div>

          {/* FORM REGISTER (Client Component) */}
          <RegisterForm />
          
          {/* Footer Trust Signals */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
             <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-3 h-3" /> Pendaftaran aman & tanpa kartu kredit.
             </div>
          </div>

        </div>
      </div>

      {/* --- BAGIAN KANAN: Fitur Showcase (Reuse Slider) --- */}
      <div className="hidden lg:flex flex-1 relative bg-slate-50 dark:bg-[#0a0a0a] items-center justify-center overflow-hidden">
        
        {/* Dekorasi Visual Dinamis (Sedikit berbeda warnanya dengan Login agar variasi) */}
        <div className="absolute w-[800px] h-[800px] bg-gradient-to-tl from-purple-500/10 to-pink-500/10 rounded-full blur-[100px] opacity-50 animate-pulse" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />

        {/* KONTEN UTAMA KANAN: SLIDER */}
        <div className="relative z-10 w-full max-w-2xl px-10">
           <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30 mb-6 text-white text-xl font-bold">
                P
              </div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                 Mulai Langkah <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Besar Kamu.</span>
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                 Platform All-in-One untuk kreator cerdas yang ingin berkembang.
              </p>
           </div>

           {/* Reuse Component Slider dari Login tadi */}
           <LoginInfoSlider />
           
        </div>
      </div>

    </div>
  );
}