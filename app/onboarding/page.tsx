"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { saveNewUsername } from "@/app/actions/onboarding";
import { Loader2, ArrowRight, CheckCircle2, Sparkles, Lock, Eye, EyeOff } from "lucide-react";

function OnboardingContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const result = await saveNewUsername(formData);

    if (result?.success === false) {
      setErrorMsg(result.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-500 relative z-10">
        
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30">
          <Sparkles className="w-8 h-8 text-white" />
        </div>

        <h1 className="text-2xl font-black text-center mb-2 text-slate-900 dark:text-white">Hampir Selesai! 🎉</h1>
        <p className="text-center text-slate-500 dark:text-slate-400 text-sm mb-8">
          Klaim link toko kamu dan buat password cadangan agar bisa login di perangkat lain.
        </p>

        {errorMsg && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-bold text-center animate-in shake">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="email" value={email} />

          {/* Input Username */}
          <div className="group">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
              Klaim Link Toko Kamu
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-slate-400 font-bold text-sm">pesen.id/</span>
              </div>
              <input
                type="text"
                name="username"
                required
                minLength={4}
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))}
                className="pl-[85px] block w-full px-4 py-4 bg-slate-50 dark:bg-black border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white font-bold placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-base"
                placeholder="namatoko"
              />
              {username.length > 3 && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center text-green-500">
                  <CheckCircle2 className="h-5 w-5 animate-in zoom-in" />
                </div>
              )}
            </div>
          </div>

          {/* Input Password Baru */}
          <div className="group">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
              Buat Password (Untuk Login Manual)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                minLength={6}
                className="pl-11 pr-10 block w-full px-4 py-4 bg-slate-50 dark:bg-black border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-base shadow-sm"
                placeholder="Minimal 6 karakter"
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
            disabled={isLoading || username.length < 4}
            className="w-full py-4 rounded-xl text-white font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 disabled:opacity-50 mt-8"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Simpan & Masuk Dashboard"}
            {!isLoading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#050505]"><Loader2 className="w-8 h-8 animate-spin text-purple-600" /></div>}>
      <OnboardingContent />
    </Suspense>
  );
}