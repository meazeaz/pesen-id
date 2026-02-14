"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";

export default function UsernameForm() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.length > 0) {
      router.push(`/register?username=${username}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mt-8 relative group z-20">
      {/* Efek Glow Halus di Belakang */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
      
      <div className="relative flex items-center bg-white dark:bg-slate-950 rounded-full p-1.5 border border-slate-200 dark:border-slate-800 shadow-xl">
        
        {/* Domain Tetap (pesen.id/) */}
        <div className="pl-5 pr-2 flex items-center pointer-events-none">
          <span className="text-slate-400 dark:text-slate-500 font-medium font-mono text-lg">
            pesen.id/
          </span>
        </div>
        
        {/* Input User */}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''))} // Validasi karakter aman
          placeholder="namakamu"
          className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none font-bold text-lg h-12 min-w-0"
          autoFocus
        />

        {/* Tombol Action (Integrated) */}
        <button
          type="submit"
          disabled={!username}
          className="ml-2 bg-slate-900 dark:bg-white text-white dark:text-black hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed font-bold py-3 px-6 rounded-full transition-all flex items-center gap-2 shadow-lg shrink-0"
        >
          {username ? "Klaim" : "Coba"} 
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      
      {/* Feedback Text (Kontras Diperbaiki) */}
      <div className="mt-4 flex items-center justify-center gap-2 text-sm font-medium">
        {username ? (
          <span className="text-green-600 dark:text-green-400 flex items-center gap-1 animate-pulse">
            <Sparkles className="w-4 h-4" /> {username} tersedia!
          </span>
        ) : (
          <span className="text-slate-600 dark:text-slate-400">
            Gratis selamanya • Tanpa kartu kredit
          </span>
        )}
      </div>
    </form>
  );
}