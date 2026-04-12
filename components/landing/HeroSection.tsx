import UsernameForm from "@/components/UsernameForm";
import { CheckCircle2, Wallet } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="home" className="relative pt-32 pb-20 px-6 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* KOLOM KIRI (Copywriting) */}
        <div className="text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-xs font-bold tracking-wide text-slate-600 dark:text-slate-300 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            Platform Jualan Digital #1 di Indonesia
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white">
            Satu Link Untuk <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
              Cuan Tiap Hari.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
            Ubah followers jadi pembeli setia. Jual E-book, Kelas Online, atau Template langsung dari bio link-mu tanpa potongan biaya admin*.
          </p>

          <div className="w-full pt-4">
            <UsernameForm />
          </div>
        </div>

        {/* KOLOM KANAN: 3D MOCKUP DENGAN ANIMASI FOMO */}
        <div className="relative hidden lg:block perspective-1000 group pl-10">
          
          {/* Element Pop-up Melayang (Kiri) */}
          <div className="absolute -left-12 top-32 z-30 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 animate-[bounce_4s_infinite] hover:scale-105 transition-transform">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
               <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
               <p className="text-xs font-bold text-slate-900 dark:text-white">Pesanan Baru Masuk!</p>
               <p className="text-sm font-black text-green-600 dark:text-green-400">+ Rp 150.000</p>
            </div>
          </div>

          {/* Element Pop-up Melayang (Kanan Bawah) */}
          <div className="absolute -right-8 bottom-32 z-30 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 animate-[bounce_5s_infinite_1s] hover:scale-105 transition-transform">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400">
               <Wallet className="w-5 h-5" />
            </div>
            <div>
               <p className="text-xs font-bold text-slate-900 dark:text-white">Penarikan Sukses</p>
               <p className="text-sm font-black text-slate-500 dark:text-slate-400">Ke BCA ****1234</p>
            </div>
          </div>

          <div className="relative w-[300px] mx-auto h-[600px] bg-slate-900 border-[10px] border-slate-800 rounded-[3rem] shadow-2xl shadow-purple-500/20 transform rotate-y-[-12deg] rotate-x-[5deg] group-hover:rotate-y-[-5deg] group-hover:rotate-x-[2deg] transition-all duration-700 ease-out z-20 overflow-hidden ring-1 ring-white/10">
            <div className="w-full h-full bg-[#0a0a0a] overflow-hidden relative">
              {/* Status Bar */}
              <div className="absolute top-0 inset-x-0 h-7 bg-black z-30 flex justify-between px-6 items-center text-[10px] text-white font-bold">
                  <span>9:41</span>
                  <div className="flex gap-1">
                      <div className="w-3 h-3 bg-white rounded-full opacity-20"></div>
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
              </div>

              {/* Isi Layar HP */}
              <div className="pt-12 px-4 space-y-4">
                  <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 mb-3 border-2 border-slate-800 p-1 shadow-lg shadow-orange-500/20">
                           <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Felix`} alt="avatar" className="rounded-full bg-white" />
                      </div>
                      <div className="h-4 w-32 bg-slate-800 rounded mb-2"></div>
                  </div>
                  {[1, 2].map((i) => (
                      <div key={i} className="h-14 bg-slate-900/50 backdrop-blur rounded-xl border border-white/5 flex items-center px-4 gap-3 transition-colors hover:bg-slate-800">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-lg"></div>
                          <div className="h-3 w-24 bg-slate-800 rounded"></div>
                      </div>
                  ))}
                  <div className="p-4 bg-gradient-to-br from-slate-900 to-black rounded-2xl border border-white/10 mt-6 relative overflow-hidden group-hover:border-purple-500/50 transition-colors">
                      <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-2 py-1 rounded-bl-lg font-bold">PROMO</div>
                      <div className="w-full h-24 bg-slate-800 rounded-lg mb-3 flex items-center justify-center text-4xl">📘</div>
                      <div className="h-4 w-3/4 bg-slate-800 rounded mb-2"></div>
                      <div className="flex justify-between items-center mt-3">
                         <div className="text-white font-bold text-lg">Rp 99.000</div>
                         <div className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full">Beli</div>
                      </div>
                  </div>
              </div>
            </div>
            {/* Poni HP (Notch) */}
            <div className="absolute top-0 inset-x-0 h-6 bg-black rounded-b-xl mx-auto w-32 z-40"></div>
          </div>
        </div>
      </div>
    </section>
  );
}