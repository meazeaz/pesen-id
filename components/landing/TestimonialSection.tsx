import { Quote, Star } from "lucide-react";

export default function TestimonialSection() {
  return (
    <section id="testimoni" className="py-24 px-6 border-t border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Kata Mereka</h2>
          <p className="text-slate-600 dark:text-slate-400">Bergabunglah dengan ribuan kreator sukses lainnya.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Sarah Amalia", role: "Content Creator", text: "Sejak pakai Pesen.id, audiensku jadi gampang banget beli ebook. Omzet naik 3x lipat bulan ini!", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
            { name: "Budi Santoso", role: "Coffee Shop Owner", text: "Fitur menu digitalnya keren banget. Pelanggan tinggal scan QR, pilih menu, dan bayar. Ga perlu antri lagi.", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi" },
            { name: "Dinda Kirana", role: "Freelance Designer", text: "Tampilannya profesional banget. Klien jadi lebih percaya buat order jasa desain lewat link bio aku.", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dinda" },
          ].map((testi, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative group">
              <Quote className="absolute top-8 right-8 text-slate-100 dark:text-slate-800 w-12 h-12 -z-0" />
              <div className="flex items-center gap-4 mb-6 z-10 relative">
                <img src={testi.img} alt={testi.name} className="w-12 h-12 rounded-full border-2 border-slate-100 dark:border-slate-700" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{testi.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{testi.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4 text-orange-400">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed relative z-10">
                "{testi.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}