"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, Download, Lock, Star, Loader2, PartyPopper } from "lucide-react";
import { createReview } from "@/app/actions/review";

type OrderData = {
  id: string;
  customerName: string;
  amount: number;
  status: string;
  productId: string;
  productTitle: string;
  userId: string;
  hasReviewed: boolean;
};

export default function CheckoutSuccessClient({ order }: { order: OrderData }) {
  // State untuk Ulasan
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  
  // State Status
  const [isReviewed, setIsReviewed] = useState(order.hasReviewed);
  const [isPending, startTransition] = useTransition();

  const formatRupiah = (num: number) => 
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);

  // Fungsi Kirim Ulasan
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Silakan berikan bintang terlebih dahulu (1-5)!");
      return;
    }

    startTransition(async () => {
      const res = await createReview({
        orderId: order.id,
        productId: order.productId,
        userId: order.userId,
        customerName: order.customerName,
        rating: rating,
        comment: comment || "Mantap!", // Default komentar jika kosong
      });

      if (res.success) {
        setIsReviewed(true); // 👈 BUKA GEMBOK DOWNLOAD!
      } else {
        alert(res.message);
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] flex items-center justify-center p-4 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      <div className="w-full max-w-xl bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
        
        {/* --- HEADER SUCCESS --- */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-center text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-black/10">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold mb-1">Pembayaran Berhasil!</h1>
            <p className="text-green-50 font-medium opacity-90">Terima kasih atas pesanan Anda, {order.customerName}.</p>
          </div>
        </div>

        {/* --- ORDER SUMMARY --- */}
        <div className="p-6 md:p-8 bg-slate-50 dark:bg-[#18181b] border-b border-slate-200 dark:border-slate-800">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Ringkasan Pesanan</p>
          <div className="flex justify-between items-center bg-white dark:bg-[#121212] p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex-1 min-w-0 pr-4">
              <h3 className="font-bold text-lg truncate">{order.productTitle}</h3>
              <p className="text-xs text-slate-500 font-mono mt-1">ID: #{order.id.slice(0,8).toUpperCase()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 mb-0.5">Total Bayar</p>
              <p className="font-bold text-purple-600 dark:text-purple-400">{formatRupiah(order.amount)}</p>
            </div>
          </div>
        </div>

        {/* --- REVIEW & DOWNLOAD SECTION --- */}
        <div className="p-6 md:p-8">
          
          {/* JIKA BELUM DIULAS: Munculkan Form Ulasan */}
          {!isReviewed ? (
            <div className="space-y-6">
              <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 p-4 rounded-2xl text-center">
                <p className="text-sm font-bold text-yellow-800 dark:text-yellow-500 flex items-center justify-center gap-2 mb-2">
                  <Lock className="w-4 h-4" /> File Terkunci
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-600/80">
                  Mohon berikan penilaian Anda untuk membuka akses download file.
                </p>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-5">
                {/* Star Rating Interaktif */}
                <div className="flex flex-col items-center gap-2">
                  <p className="text-sm font-bold">Seberapa puas Anda?</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star 
                          className={`w-8 h-8 transition-colors ${
                            star <= (hoverRating || rating) 
                              ? "fill-yellow-400 text-yellow-400 drop-shadow-md" 
                              : "text-slate-300 dark:text-slate-700"
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500">Tulis Ulasan (Opsional)</label>
                  <textarea 
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Sangat membantu! Materinya mudah dipahami..."
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isPending || rating === 0}
                  className="w-full py-3.5 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {isPending ? <><Loader2 className="w-5 h-5 animate-spin" /> Memproses...</> : "Kirim Ulasan & Buka File"}
                </button>
              </form>
            </div>
          ) : (
            
            /* JIKA SUDAH DIULAS: Munculkan Tombol Download Asli */
            <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="inline-flex items-center justify-center p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full mb-2">
                <PartyPopper className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1">Akses Terbuka!</h3>
                <p className="text-sm text-slate-500">Terima kasih atas ulasan Anda. File Anda siap diunduh.</p>
              </div>
              
              <button 
                onClick={() => alert("Simulasi: Mengunduh file produk Anda...")}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2 text-lg"
              >
                <Download className="w-6 h-6" /> Download File Sekarang
              </button>
            </div>

          )}
        </div>
      </div>
    </div>
  );
}