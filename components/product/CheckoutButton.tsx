"use client";

import { useState } from "react";
import { Zap, Loader2, X } from "lucide-react";
import { createCheckout } from "@/app/actions/checkout";

type Props = {
  price?: string;
  productName: string;
  productId: string;
};

export default function CheckoutButton({ productName, productId }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await createCheckout({
        productId,
        customerName: name,
        customerEmail: email,
        baseUrl: window.location.origin // 👈 Mengirim alamat web saat ini (localhost:3000)
      });

      if (res.success && res.invoiceUrl) {
        // 🔥 KEAJAIBAN TERJADI DI SINI: Pembeli langsung dilempar ke Xendit!
        window.location.href = res.invoiceUrl;
      } else {
        alert(res.message || "Gagal membuat transaksi.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan jaringan.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={isLoading}
        className="w-full py-4 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/25 transform hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <Zap className="w-5 h-5 fill-current" /> Beli Sekarang
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-99 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#121212] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            
            <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Informasi Pembeli</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-red-500 transition-colors bg-slate-100 dark:bg-slate-800 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCheckout} className="p-6 space-y-4 text-left">
              <div className="p-4 bg-purple-50 dark:bg-purple-900/10 text-purple-700 dark:text-purple-400 rounded-xl text-sm font-medium mb-4">
                Membeli: <span className="font-bold">{productName}</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Cth: Budi Santoso"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email (Untuk kirim resi)</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Cth: budi@email.com"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Sedang Memproses...</> : "Lanjutkan ke Pembayaran"}
              </button>
            </form>

          </div>
        </div>
      )}
    </>
  );
}