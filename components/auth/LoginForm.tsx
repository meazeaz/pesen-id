"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Lock, Eye, EyeOff, ArrowRight, Github } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard"); 
    }, 2000);
  };

  return (
    <div className="animate-in slide-in-from-bottom-4 fade-in duration-700">
      {/* Tombol Social Login (Opsional tapi Menarik) */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group">
           <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Google" />
           <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Google</span>
        </button>
        <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group">
           <Github className="w-5 h-5 text-slate-900 dark:text-white group-hover:scale-110 transition-transform" />
           <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Github</span>
        </button>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-200 dark:border-slate-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-[#050505] px-2 text-slate-500">Atau lanjut dengan email</span>
        </div>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Input Email dengan Efek Focus Glow */}
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
              placeholder="nama@perusahaan.com"
            />
          </div>
        </div>

        {/* Input Password */}
        <div className="group">
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide group-focus-within:text-purple-600 transition-colors">
              Password
            </label>
            <a href="#" className="text-xs font-medium text-purple-600 hover:text-purple-500 hover:underline">
              Lupa password?
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="pl-11 pr-10 block w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-sm"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Tombol Login Gradient */}
        <button
          type="submit"
          disabled={isLoading}
          className="relative w-full py-4 px-4 rounded-xl text-white font-bold text-sm shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 transform hover:-translate-y-0.5 transition-all overflow-hidden group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
        >
          {/* Efek Kilatan Cahaya */}
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
          
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" /> Masuk...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              Masuk ke Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </button>

        {/* Link Register */}
        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          Belum punya akun?{" "}
          <Link href="/register" className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-80 transition-opacity">
            Buat akun gratis
          </Link>
        </p>
      </form>
    </div>
  );
}