"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // --- FUNGSI LOGIN GOOGLE ---
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  // --- FUNGSI LOGIN MANUAL (EMAIL & PASSWORD) ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setIsLoading(false);
      // Tampilkan pesan pintar dari NextAuth
      setErrorMsg(res.error); 
    } else {
      router.push("/dashboard");
      router.refresh(); 
    }
  };

  return (
    <div className="animate-in slide-in-from-bottom-4 fade-in duration-700">
      
      {/* Tombol Login Google */}
      <div className="mb-6">
        <button 
          type="button" 
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading || isLoading}
          className="flex w-full items-center justify-center gap-3 py-3.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
           {isGoogleLoading ? (
             <Loader2 className="w-5 h-5 animate-spin text-slate-500" />
           ) : (
             <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Google" />
           )}
           <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
             {isGoogleLoading ? "Menghubungkan..." : "Masuk dengan Google"}
           </span>
        </button>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-200 dark:border-slate-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-[#050505] px-2 text-slate-500 tracking-wider font-medium">Atau lanjut dengan email</span>
        </div>
      </div>

      {/* Alert Error Pintar */}
      {errorMsg && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium text-center animate-in shake">
          {errorMsg}
        </div>
      )}

      {/* Form Manual */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="group">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 group-focus-within:text-purple-600 transition-colors">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
            </div>
            <input
              type="email"
              name="email"
              required
              className="pl-11 block w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-sm"
              placeholder="nama@email.com"
            />
          </div>
        </div>

        <div className="group">
          <div className="flex items-center justify-between mb-1.5">
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
              name="password"
              required
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

        <button
          type="submit"
          disabled={isLoading || isGoogleLoading}
          className="relative w-full py-4 px-4 rounded-xl text-white font-bold text-sm shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 transform hover:-translate-y-0.5 transition-all overflow-hidden group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
        >
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine pointer-events-none" />
          
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

        <p className="text-center text-sm text-slate-600 dark:text-slate-400 pt-2">
          Belum punya akun?{" "}
          <button 
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading || isLoading}
            className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            Daftar dengan Google
          </button>
        </p> 
      </form>
    </div>
  );
}