import { ChevronDown } from "lucide-react";

export default function FaqSection() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-transparent">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Sering Ditanyakan</h2>
          <p className="text-slate-600 dark:text-slate-400">Kami menjawab rasa penasaran Anda.</p>
        </div>

        <div className="space-y-4">
          {[
            { q: "Apakah benar-benar gratis?", a: "Ya! Paket Starter gratis selamanya tanpa batasan waktu. Kami hanya mengambil biaya admin kecil jika ada transaksi penjualan." },
            { q: "Bagaimana cara mencairkan dana?", a: "Dana hasil penjualan akan masuk ke Saldo Pesen.id dan bisa ditarik kapan saja ke rekening bank BCA, Mandiri, BRI, atau E-wallet (Gopay/OVO)." },
            { q: "Apakah bisa pakai domain sendiri?", a: "Bisa banget! Fitur Custom Domain tersedia di paket Pro Creator. Kami akan bantu setup DNS-nya sampai aktif." },
            { q: "Apa bedanya dengan Linktree?", a: "Pesen.id bukan sekadar bio link. Kami adalah 'Mini Website' + 'Toko Online'. Anda bisa langsung jualan tanpa perlu redirect ke website lain." }
          ].map((faq, i) => (
            <details key={i} className="group bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 open:bg-white dark:open:bg-slate-900 open:shadow-lg transition-all duration-300">
              <summary className="flex cursor-pointer items-center justify-between p-6 font-bold text-slate-900 dark:text-white select-none list-none [&::-webkit-details-marker]:hidden">
                {faq.q}
                <ChevronDown className="w-5 h-5 text-slate-500 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-transparent group-open:border-slate-100 dark:group-open:border-slate-800 animate-in slide-in-from-top-2 fade-in duration-300">
                <p className="mt-4">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}