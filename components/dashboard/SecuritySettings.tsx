"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Loader2, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { updatePassword } from "@/app/actions/settings";

export default function SecuritySettings() {
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // KUNCI PERBAIKAN: Simpan data form ke dalam variabel SEBELUM proses loading/await
    const form = e.currentTarget; 

    setIsLoading(true);
    setMessage({ type: "", text: "" });

    const formData = new FormData(form);
    
    if (session?.user?.email) {
      formData.append("email", session.user.email);
    } else {
      setMessage({ type: "error", text: "Sesi tidak ditemukan. Coba muat ulang halaman." });
      setIsLoading(false);
      return;
    }

    const newPass = formData.get("newPassword") as string;
    const confirmPass = formData.get("confirmPassword") as string;

    if (newPass !== confirmPass) {
      setMessage({ type: "error", text: "Konfirmasi password tidak cocok!" });
      setIsLoading(false);
      return;
    }

    const result = await updatePassword(formData);

    if (result.success) {
      setMessage({ type: "success", text: result.message });
      // Gunakan variabel form yang sudah kita simpan tadi untuk me-reset inputan
      form.reset(); 
    } else {
      setMessage({ type: "error", text: result.message });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="bg-white dark:bg-[#121214] border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-purple-500" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Keamanan Akun</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Buat atau perbarui password untuk login manual.</p>
        </div>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-xl text-sm font-bold flex items-center gap-2 animate-in fade-in ${
          message.type === "success" 
            ? "bg-green-50 text-green-600 border border-green-200" 
            : "bg-red-50 text-red-600 border border-red-200"
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
        
        {/* Input Password Baru */}
        <div className="group">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
            Password Baru
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              required
              minLength={6}
              className="pl-11 pr-10 block w-full px-4 py-3.5 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
              placeholder="Minimal 6 karakter"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-purple-600 transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Input Konfirmasi Password */}
        <div className="group">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
            Konfirmasi Password Baru
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              required
              minLength={6}
              className="pl-11 pr-10 block w-full px-4 py-3.5 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
              placeholder="Ulangi password baru"
            />
          </div>
        </div>

        {/* Tombol Simpan */}
        <button
          type="submit"
          disabled={isLoading}
          className="py-3 px-6 rounded-xl text-white font-bold text-sm bg-purple-600 hover:bg-purple-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {isLoading ? "Menyimpan..." : "Simpan Password"}
        </button>

      </form>
    </div>
  );
}