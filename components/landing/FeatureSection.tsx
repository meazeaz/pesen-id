import { Globe, Zap, BarChart3, Layers } from "lucide-react";

export default function FeatureSection() {
  return (
    <section id="fitur" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Fitur Lengkap</h2>
          <p className="text-slate-600 dark:text-slate-400">Semua yang Anda butuhkan untuk berjualan online.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-8 rounded-3xl bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 backdrop-blur-sm relative overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Custom Domain & SEO</h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-md">
                Tingkatkan personal branding dengan domain sendiri (kamu.com). Website Anda otomatis terindeks Google.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Instan Checkout</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Pembeli tidak perlu login/daftar. Klik, Bayar, Selesai.</p>
          </div>

          <div className="p-8 rounded-3xl bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Real-time Analytics</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Pantau performa penjualan dan traffic secara langsung.</p>
          </div>

          <div className="md:col-span-2 p-8 rounded-3xl bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 backdrop-blur-sm relative overflow-hidden flex items-center hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-500">
             <div className="relative z-10">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center mb-4 text-pink-600 dark:text-pink-400">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Unlimited Blocks</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Tambahkan link, video Youtube, Spotify, atau produk digital sebanyak yang kamu mau.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}