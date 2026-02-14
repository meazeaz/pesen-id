import UsernameForm from "@/components/UsernameForm";

export default function HeroSection() {
  return (
    <section id="home" className="relative pt-32 pb-20 px-6 lg:pt-40 lg:pb-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* KOLOM KIRI */}
        <div className="text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300 shadow-sm animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Platform Jualan Digital #1
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white">
            Satu Link Untuk <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Cuan Instan.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
            Ubah followers jadi pembeli. Jual E-book, Kelas, atau Jasa Konsultasi langsung dari bio link-mu.
          </p>

          <div className="w-full">
            <UsernameForm />
          </div>
        </div>

        {/* KOLOM KANAN: 3D MOCKUP */}
        <div className="relative hidden lg:block perspective-1000 group pl-10">
          <div className="relative w-[300px] mx-auto h-[600px] bg-slate-900 border-[10px] border-slate-800 rounded-[3rem] shadow-2xl transform rotate-y-[-12deg] rotate-x-[5deg] group-hover:rotate-y-[-5deg] group-hover:rotate-x-[2deg] transition-all duration-700 ease-out z-20 overflow-hidden ring-1 ring-white/10">
            <div className="w-full h-full bg-[#0a0a0a] overflow-hidden relative">
              <div className="absolute top-0 inset-x-0 h-7 bg-black z-30 flex justify-between px-6 items-center text-[10px] text-white font-bold">
                  <span>9:41</span>
                  <div className="flex gap-1">
                      <div className="w-3 h-3 bg-white rounded-full opacity-20"></div>
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
              </div>

              <div className="pt-12 px-4 space-y-4">
                  <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 mb-3 border-2 border-slate-800 p-1">
                           <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Felix`} alt="avatar" className="rounded-full bg-white" />
                      </div>
                      <div className="h-4 w-32 bg-slate-800 rounded mb-2 animate-pulse"></div>
                  </div>
                  {[1, 2].map((i) => (
                      <div key={i} className="h-14 bg-slate-900/50 backdrop-blur rounded-xl border border-white/5 flex items-center px-4 gap-3">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-lg"></div>
                          <div className="h-3 w-24 bg-slate-800 rounded"></div>
                      </div>
                  ))}
                  <div className="p-4 bg-gradient-to-br from-slate-900 to-black rounded-2xl border border-white/10 mt-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-2 py-1 rounded-bl-lg font-bold">PROMO</div>
                      <div className="w-full h-24 bg-slate-800 rounded-lg mb-3 flex items-center justify-center text-4xl">📘</div>
                      <div className="h-4 w-3/4 bg-slate-800 rounded mb-2"></div>
                      <div className="flex justify-between items-center mt-3">
                         <div className="text-white font-bold text-lg">Rp 99rb</div>
                         <div className="bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full">Beli</div>
                      </div>
                  </div>
              </div>
            </div>
            <div className="absolute top-0 inset-x-0 h-6 bg-black rounded-b-xl mx-auto w-32 z-40"></div>
          </div>
        </div>
      </div>
    </section>
  );
}