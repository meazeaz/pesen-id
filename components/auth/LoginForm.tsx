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
      </div>

      {/* Alert Error Pintar */}
      {errorMsg && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium text-center animate-in shake">
          {errorMsg}
        </div>
      )}

    </div>
  );
}