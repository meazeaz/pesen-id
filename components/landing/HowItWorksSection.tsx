import { UserPlus, Palette, Banknote } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section id="cara-kerja" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Mulai Cuan dalam 3 Menit</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Tidak perlu skill coding. Cukup drag & drop.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 dark:from-blue-900 dark:to-pink-900 -z-10 border-t border-dashed border-slate-300 dark:border-slate-700"></div>

          {[ 
            { icon: UserPlus, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20", title: "1. Daftar Gratis", desc: "Klaim username unik kamu (misal: pesen.id/kopi) dalam hitungan detik." },
            { icon: Palette, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20", title: "2. Custom Profil", desc: "Pilih tema, upload foto, dan tambahkan link sosmed atau produk digitalmu." },
            { icon: Banknote, color: "text-pink-600", bg: "bg-pink-50 dark:bg-pink-900/20", title: "3. Terima Uang", desc: "Sebarkan link. Uang masuk otomatis ke rekening saat ada yang beli." }
          ].map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center group">
              <div className={`w-24 h-24 rounded-full border-4 border-white dark:border-slate-800 ${step.bg} flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition duration-500 z-10`}>
                <step.icon className={`w-10 h-10 ${step.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{step.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xs leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}