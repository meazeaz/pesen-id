"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Mail, Lock, User, CheckCircle2, ArrowRight } from "lucide-react";

function RegisterInputLogic() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialUsername = searchParams.get("username") || "";

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: initialUsername,
    email: "",
    password: "",
  });

  // Update jika URL berubah
  useEffect(() => {
    if (initialUsername) {
      setFormData((prev) => ({ ...prev, username: initialUsername }));
    }
  }, [initialUsername]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi Register (Nanti diganti API)
    setTimeout(() => {
      setIsLoading(false);
      // Redirect ke Dashboard setelah sukses
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <form className="mt-8 space-y-5 animate-in slide-in-from-bottom-4 fade-in duration-700" onSubmit={handleSubmit}>
      
      {/* Input Username (Spesial) */}
      <div className="group">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 group-focus-within:text-purple-600 transition-colors">
          Username Unik
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-slate-400 font-bold text-sm">pesen.id/</span>
          </div>
          <input
            type="text"
            required
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/\s/g, "") })} // Paksa huruf kecil & tanpa spasi
            className="pl-[85px] block w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white font-bold placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-sm"
            placeholder="namakamu"
          />
          {/* Indikator Tersedia */}
          {formData.username.length > 3 && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center text-green-500 animate-in zoom-in">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          )}
        </div>
      </div>

      {/* Input Email */}
      <div className="group">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 group-focus-within:text-purple-600 transition-colors">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
          </div>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="pl-11 block w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-sm"
            placeholder="nama@email.com"
          />
        </div>
      </div>

      {/* Input Password */}
      <div className="group">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 group-focus-within:text-purple-600 transition-colors">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
          </div>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="pl-11 block w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-sm"
            placeholder="••••••••"
          />
        </div>
      </div>

      {/* Tombol Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="relative w-full py-4 px-4 rounded-xl text-white font-bold text-sm shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 transform hover:-translate-y-0.5 transition-all overflow-hidden group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
      >
        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
        
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" /> Mendaftarkan...
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            Buat Akun Sekarang <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </button>

      {/* Link ke Login */}
      <div className="text-center text-sm mt-6">
        <span className="text-slate-600 dark:text-slate-400">Sudah punya akun? </span>
        <Link href="/login" className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-80 transition-opacity">
          Masuk disini
        </Link>
      </div>
    </form>
  );
}

// Komponen Utama yang diexport (dengan Suspense agar aman di build)
export default function RegisterForm() {
  return (
    <Suspense fallback={<div className="text-center py-10">Memuat form...</div>}>
      <RegisterInputLogic />
    </Suspense>
  );
}