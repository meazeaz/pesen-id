"use client"; // <--- WAJIB: Ini menandakan komponen berjalan di Browser (Client)

import { useState } from "react";

// Definisikan props yang diterima komponen ini
type Props = {
  title: string;
  price: number;
  image: string;
};

export default function ProductCard({ title, price, image }: Props) {
  // State untuk efek loading saat tombol diklik
  const [isBuying, setIsBuying] = useState(false);

  const handleBeli = () => {
    setIsBuying(true);
    // Simulasi proses beli (delay 0.5 detik)
    setTimeout(() => {
      alert(`Terima kasih! Kamu telah membeli ${title}`);
      setIsBuying(false);
    }, 500);
  };

  return (
    <div className="bg-white/10 border border-white/20 p-4 rounded-xl flex items-center gap-4 hover:bg-white/15 transition">
      {/* Icon Produk */}
      <div className="text-3xl">{image}</div>
      
      {/* Info Produk */}
      <div className="flex-1">
        <h3 className="font-bold text-white">{title}</h3>
        <p className="text-gray-300 text-sm">Rp {price.toLocaleString()}</p>
      </div>

      {/* Tombol Beli */}
      <button
        onClick={handleBeli}
        disabled={isBuying}
        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
      >
        {isBuying ? "..." : "Beli"}
      </button>
    </div>
  );
}