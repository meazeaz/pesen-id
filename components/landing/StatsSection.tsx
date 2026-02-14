export default function StatsSection() {
  return (
    <section className="border-y border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-black/40 backdrop-blur-md py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { label: "Kreator Bergabung", val: "2,500+" },
          { label: "Produk Terjual", val: "15,000+" },
          { label: "Total Transaksi", val: "Rp 1.2M" },
          { label: "Uptime Server", val: "99.9%" },
        ].map((stat, i) => (
          <div key={i}>
            <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1 font-mono">{stat.val}</div>
            <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}