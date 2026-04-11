"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, Download, Lock, Star, Loader2, PartyPopper, Receipt, ArrowLeft } from "lucide-react";
import { createReview } from "@/app/actions/review";
import Link from "next/link";

type OrderData = {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  amount: number;
  status: string;
  productId: string;
  productTitle: string;
  fileUrl: string;
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

  const formattedDate = new Date(order.date).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
  });

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
        comment: comment || "Mantap!", 
      });

      if (res.success) {
        setIsReviewed(true); // 👈 BUKA GEMBOK DOWNLOAD!
      } else {
        alert(res.message);
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] flex items-center justify-center p-4 font-sans text-slate-900 dark:text-slate-100 py-12 relative overflow-hidden">
      
      {/* Background Ornamen */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-green-500/20 to-transparent dark:from-green-900/20 z-0 pointer-events-none"></div>

      <div className="w-full max-w-lg bg-white dark:bg-[#121212] rounded-[2rem] shadow-2xl shadow-green-500/10 overflow-hidden relative z-10 border border-slate-200 dark:border-slate-800">
        
        {/* --- HEADER SUCCESS --- */}
        <div className="text-center pt-10 pb-6 px-8 relative">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-black mb-2 text-slate-900 dark:text-white">Pembayaran Berhasil!</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Terima kasih, <b>{order.customerName}</b>. Pesanan Anda telah kami terima.</p>
        </div>

        {/* --- STRUK / RESI DIGITAL (Gaya Tiket) --- */}
        <div className="px-8 pb-8">
          <div className="bg-slate-50 dark:bg-[#1a1a1a] rounded-2xl p-6 border border-slate-200/60 dark:border-slate-700/50 relative">
            
            {/* Efek Sobekan Tiket Kiri Kanan */}
            <div className="absolute top-1/2 -left-3 w-6 h-6 bg-white dark:bg-[#121212] rounded-full transform -translate-y-1/2 border-r border-slate-200/60 dark:border-slate-700/50"></div>
            <div className="absolute top-1/2 -right-3 w-6 h-6 bg-white dark:bg-[#121212] rounded-full transform -translate-y-1/2 border-l border-slate-200/60 dark:border-slate-700/50"></div>

            <div className="flex items-center gap-2 mb-6 border-b border-dashed border-slate-300 dark:border-slate-600 pb-4">
              <Receipt className="w-5 h-5 text-slate-400" />
              <h3 className="font-bold text-slate-700 dark:text-slate-200">Resi Pembelian</h3>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-start">
                <span className="text-slate-500">ID Transaksi</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white text-right">{order.id.toUpperCase()}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-slate-500">Tanggal</span>
                <span className="font-medium text-slate-900 dark:text-white text-right">{formattedDate} WIB</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-slate-500">Email Pembeli</span>
                <span className="font-medium text-slate-900 dark:text-white text-right">{order.customerEmail}</span>
              </div>
              
              <div className="pt-4 border-t border-dashed border-slate-300 dark:border-slate-600">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-slate-500">Produk</span>
                  <span className="font-bold text-slate-900 dark:text-white text-right max-w-[200px]">{order.productTitle}</span>
                </div>
                <div className="flex justify-between items-end pt-2">
                  <span className="text-slate-500 font-bold">Total Bayar</span>
                  <span className="text-xl font-black text-purple-600 dark:text-purple-400">{formatRupiah(order.amount)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- AREA DOWNLOAD & REVIEW --- */}
        <div className="px-8 pb-10">
          
          {/* JIKA BELUM DIULAS: Gembok File */}
          {!isReviewed ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 p-4 rounded-2xl text-center">
                <p className="text-sm font-bold text-yellow-800 dark:text-yellow-500 flex items-center justify-center gap-2 mb-1">
                  <Lock className="w-4 h-4" /> File Terkunci
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-600/80">
                  Berikan ulasan Anda terlebih dahulu untuk mengunduh produk ini.
                </p>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-5">
                <div className="flex flex-col items-center gap-2">
                  <p className="text-sm font-bold">Beri Rating Penjual</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star 
                          className={`w-9 h-9 transition-colors ${
                            star <= (hoverRating || rating) 
                              ? "fill-yellow-400 text-yellow-400 drop-shadow-md" 
                              : "text-slate-200 dark:text-slate-700"
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <textarea 
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tulis ulasan jujur Anda... (Opsional)"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isPending || rating === 0}
                  className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {isPending ? <><Loader2 className="w-5 h-5 animate-spin" /> Memproses...</> : "Kirim Ulasan & Buka File"}
                </button>
              </form>
            </div>
          ) : (
            
            /* JIKA SUDAH DIULAS: Tombol Download Asli */
            <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="inline-flex items-center justify-center p-4 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full mb-2">
                <PartyPopper className="w-10 h-10" />
              </div>
              <div>
                <h3 className="font-black text-2xl mb-1 text-slate-900 dark:text-white">Akses Terbuka!</h3>
                <p className="text-sm text-slate-500">Terima kasih atas ulasannya. File produk Anda sudah bisa diunduh.</p>
              </div>
              
              {/* TOMBOL DOWNLOAD ASLI MENGGUNAKAN fileUrl DARI DATABASE */}
              {order.fileUrl ? (
                <a 
                  href={order.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-purple-500/30 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2 text-lg"
                >
                  <Download className="w-6 h-6" /> Unduh File Produk
                </a>
              ) : (
                <div className="p-4 border border-red-200 bg-red-50 text-red-600 rounded-xl text-sm font-bold">
                  Maaf, file produk tidak ditemukan atau belum diunggah oleh penjual.
                </div>
              )}
            </div>

          )}

          <div className="mt-8 text-center">
            <Link href="/" className="text-xs font-bold text-slate-400 hover:text-purple-600 inline-flex items-center gap-1.5 transition-colors">
              <ArrowLeft className="w-3 h-3" /> Kembali ke Beranda Pesen.id
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}