import { CheckCircle2, ArrowRight } from "lucide-react";

export default function PricingSection() {
  return (
    <section id="harga" className="py-24 px-6 border-t border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-transparent backdrop-blur-sm">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Investasi Receh, Cuan Gede</h2>
          <p className="text-slate-600 dark:text-slate-400">Pilih paket yang sesuai dengan kebutuhanmu.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700 transition">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Starter</h3>
            <div className="text-4xl font-extrabold mt-4 mb-2 text-slate-900 dark:text-white">Rp 0</div>
            <p className="text-slate-500 text-sm mb-6">Cocok untuk pemula.</p>
            <ul className="space-y-4 mb-8">
              {['Unlimited Links', 'Basic Analytics', 'Standard Themes', '10 Produk Digital'].map(item => (
                <li key={item} className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-slate-400" /> {item}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition">
              Mulai Gratis
            </button>
          </div>

          <div className="p-8 rounded-3xl border-2 border-purple-600 bg-white dark:bg-slate-900/60 relative transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-purple-500/10">
            <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">
              POPULAR
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Pro Creator</h3>
            <div className="text-4xl font-extrabold mt-4 mb-2 text-slate-900 dark:text-white">Rp 49rb<span className="text-lg font-medium text-slate-500">/bln</span></div>
            <p className="text-slate-500 text-sm mb-6">Untuk yang serius jualan.</p>
            <ul className="space-y-4 mb-8">
              {['Semua fitur Starter', 'Custom Domain (.com)', '0% Fee Transaksi', 'Prioritas Support', 'Remove Branding'].map(item => (
                <li key={item} className="flex items-center gap-3 text-slate-900 dark:text-white font-medium">
                  <CheckCircle2 className="w-5 h-5 text-purple-600" /> {item}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30">
              Upgrade Sekarang <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}