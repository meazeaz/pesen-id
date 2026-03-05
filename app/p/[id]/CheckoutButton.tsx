"use client";

import { useState } from "react";
import { ShoppingBag, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutButton({ productId, price }: { productId: string, price: number }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // app/p/[id]/CheckoutButton.tsx

const handleCheckout = () => {
  setIsLoading(true);
  // Redirect ke halaman checkout yang baru kita buat
  router.push(`/checkout/${productId}`);
};

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(number);
  };

  return (
    <button 
      onClick={handleCheckout}
      disabled={isLoading}
      className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-70 active:scale-95 text-lg"
    >
      {isLoading ? (
        <><Loader2 className="w-5 h-5 animate-spin" /> Memproses...</>
      ) : (
        <><ShoppingBag className="w-5 h-5" /> Beli Sekarang - {formatRupiah(price)}</>
      )}
    </button>
  );
}