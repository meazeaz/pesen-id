"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Wajib ada di Next.js: Menunggu client ter-load agar icon sesuai dengan tema aktif
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Skeleton loading kecil sebelum tema terdeteksi agar tidak layout shift
  if (!mounted) {
    return <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 transition-all hover:bg-slate-100 hover:scale-105 active:scale-95 dark:border-slate-800 dark:bg-[#121212] dark:text-slate-100 dark:hover:bg-white/10"
      aria-label="Toggle theme"
    >
      {/* Icon Sun (Animasi berputar hilang saat dark mode) */}
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      
      {/* Icon Moon (Animasi berputar muncul saat dark mode) */}
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
    </button>
  );
}