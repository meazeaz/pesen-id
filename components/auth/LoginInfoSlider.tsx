"use client";

import { useState, useEffect } from "react";
import { BarChart3, Wallet, Palette } from "lucide-react";

const features = [
  {
    id: 1,
    icon: Wallet,
    color: "text-green-500",
    bg: "bg-green-500/10",
    title: "Monetisasi Tanpa Batas",
    desc: "Jual E-book, Preset, atau Kelas Online langsung dari Bio Link. Terima pembayaran via QRIS & E-Wallet instan.",
    stat: "IDR 1.2M+",
    statLabel: "Total Transaksi User",
  },
  {
    id: 2,
    icon: BarChart3,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    title: "Analitik Real-Time",
    desc: "Pantau siapa yang mengunjungi profilmu dan produk apa yang paling laku terjual. Data akurat untuk keputusan tepat.",
    stat: "500k+",
    statLabel: "Klik Terlacak Hari Ini",
  },
  {
    id: 3,
    icon: Palette,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    title: "Kustomisasi Personal",
    desc: "Ubah tema, font, dan layout sesuai branding kamu. Buat halaman profil yang unik dan profesional dalam hitungan detik.",
    stat: "100+",
    statLabel: "Tema Premium Tersedia",
  },
];

export default function LoginInfoSlider() {
  const [current, setCurrent] = useState(0);

  // Auto-slide setiap 4 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto h-[400px]">
      {features.map((feature, index) => (
        <div
          key={feature.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out transform flex flex-col justify-center ${
            index === current
              ? "opacity-100 translate-x-0 scale-100"
              : "opacity-0 translate-x-8 scale-95 pointer-events-none"
          }`}
        >
          {/* Card Visual */}
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-2xl mb-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.bg}`}>
              <feature.icon className={`w-7 h-7 ${feature.color}`} />
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              {feature.title}
            </h3>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              {feature.desc}
            </p>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex items-center justify-between">
               <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Highlight</span>
               <div className="text-right">
                  <div className={`text-xl font-extrabold ${feature.color}`}>{feature.stat}</div>
                  <div className="text-xs text-slate-400">{feature.statLabel}</div>
               </div>
            </div>
          </div>
        </div>
      ))}

      {/* Dots Indicator */}
      <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-2">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === index ? "w-8 bg-purple-600" : "w-2 bg-slate-300 dark:bg-slate-700"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}