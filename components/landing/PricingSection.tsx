import { CheckCircle2, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function PricingSection() {
  return (
    <section id="harga" className="py-24 px-6 border-t border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-transparent backdrop-blur-sm">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-4 border border-purple-200 dark:border-purple-800/50">
            <Zap className="w-4 h-4 fill-current" /> Harga Transparan
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white">Investasi Receh, Cuan Gede.</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Pilih paket yang sesuai dengan kebutuhan dan ambisimu.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          
          {/* Paket Starter */}
          <div className="p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121212] hover:shadow-xl transition-all duration-300">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Starter</h3>
            <div className="flex items-end gap-1 mt-4 mb-2 text-slate-900 dark:text-white">
              <span className="text-5xl font-black">Rp 0</span>
            </div>
            <p className="text-slate-500 text-sm mb-8">Gratis selamanya, cocok untuk pemula.</p>
            <ul className="space-y-4 mb-10">
              {['Unlimited Custom Link', 'Basic Analytics', 'Standard Themes', 'Maksimal 10 Produk Digital', 'Upload File Max 32MB'].map(item => (
                <li key={item} className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-slate-400" /> {item}
                </li>
              ))}
            </ul>
            <Link href="/register" className="w-full flex items-center justify-center py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition-all">
              Mulai Gratis
            </Link>
          </div>

          {/* Paket Pro Creator */}
          <div className="relative p-8 md:p-10 rounded-[2.5rem] border border-purple-500/50 bg-gradient-to-b from-slate-900 to-black transform md:-translate-y-4 hover:-translate-y-6 transition-all duration-300 shadow-2xl shadow-purple-500/20 overflow-hidden group">
            {/* Glow Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-purple-600/30 transition-colors"></div>
            
            <div className="absolute top-6 right-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
              Paling Laris
            </div>

            <h3 className="text-2xl font-bold text-white flex items-center gap-2">Pro Creator <Zap className="w-6 h-6 text-yellow-400 fill-current"/></h3>
            <div className="flex items-end gap-1 mt-4 mb-2 text-white">
              <span className="text-5xl font-black">Rp 49rb</span>
              {/* 👇 KUNCI PERUBAHAN: Dari /sekali bayar menjadi /bulan */}
              <span className="text-slate-400 font-medium mb-1">/bulan</span>
            </div>
            <p className="text-slate-400 text-sm mb-8">Untuk kreator serius yang ingin meroket.</p>
            
            <ul className="space-y-4 mb-10 relative z-10">
              {['Semua fitur Starter', 'Unlimited Produk Digital', 'Upload File Max 200MB', 'Custom Domain Sendiri (.com)', 'Embed Video YouTube', 'Tracking Pixel (FB & TikTok)', 'Tanpa Watermark Pesen.id'].map(item => (
                <li key={item} className="flex items-center gap-3 text-slate-200 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 fill-current/20" /> {item}
                </li>
              ))}
            </ul>
            
            <Link href="/register" className="relative z-10 w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 active:scale-95 transition-all">
              Upgrade Sekarang <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}