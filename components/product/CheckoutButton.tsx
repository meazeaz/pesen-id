"use client"; // Wajib, karena butuh interaksi klik

import { useState } from "react";
import { Zap, Loader2, CheckCircle2 } from "lucide-react";

type Props = {
  price: string;
  productName: string;
};

export default function CheckoutButton({ price, productName }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = () => {
    setIsLoading(true);

    // 1. Simulasi proses pembayaran ke Payment Gateway (Midtrans/Stripe)
    // Nanti di sini kita panggil API backend
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Simulasi redirect ke file download setelah 2 detik
      setTimeout(() => {
        alert(`Simulasi: Mengunduh file ${productName}...`);
        setIsSuccess(false); // Reset button
      }, 1500);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <button 
        disabled 
        className="w-full py-4 bg-green-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 animate-in zoom-in"
      >
        <CheckCircle2 className="w-5 h-5" /> Pembayaran Berhasil!
      </button>
    );
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/25 transform hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" /> Memproses...
        </>
      ) : (
        <>
          <Zap className="w-5 h-5 fill-current" /> Beli Sekarang
        </>
      )}
    </button>
  );
}