import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { getUserAndProduct } from "@/lib/data";
import CheckoutButton from "@/components/product/CheckoutButton";


type Props = {
  params: Promise<{ username: string; productId: string }>;
};

// --- 1. SEO OTOMATIS (Dynamic Metadata) ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username, productId } = await params;
  const data = await getUserAndProduct(username, productId);

  if (!data) return { title: "Produk Tidak Ditemukan" };

  return {
    title: `${data.product.title} by ${data.user.name} | Pesen.id`,
    description: `Beli ${data.product.title} hanya dengan harga ${data.product.price}.`,
    openGraph: {
      images: [data.product.image || ""],
    },
  };
}

// --- 2. HALAMAN UTAMA (Server Component) ---
export default async function ProductDetailPage({ params }: Props) {
  const { username, productId } = await params;
  const data = await getUserAndProduct(username, productId);

  if (!data) return notFound();

  const { user, product } = data;

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] font-sans flex flex-col">
      
      {/* Navbar Sederhana */}
      <nav className="p-4 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-md z-50">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href={`/${username}`} className="flex items-center gap-2 text-slate-500 hover:text-purple-600 transition-colors text-sm font-bold">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Profil
          </Link>
          <div className="font-bold text-slate-900 dark:text-white">Pesen.id</div>
        </div>
      </nav>

      <main className="flex-1 max-w-2xl mx-auto w-full p-6 space-y-8">
        
        {/* Header Produk */}
        <div className="space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-bold uppercase tracking-wider">
            {product.category}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {product.title}
          </h1>
          
          {/* Info Creator */}
          <div className="flex items-center justify-center sm:justify-start gap-3 pt-2">
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800" />
            <div className="text-left">
              <p className="text-sm text-slate-500 dark:text-slate-400">Creator</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">
                {user.name} <CheckCircle2 className="w-3 h-3 text-green-500" />
              </p>
            </div>
          </div>
        </div>

        {/* Visual Produk (Card Besar) */}
        <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-3xl flex items-center justify-center text-6xl border border-slate-200 dark:border-slate-800 shadow-sm">
          {product.image || "📦"}
        </div>

        {/* Detail & Harga (Grid Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Kolom Kiri: Deskripsi & Fitur */}
          <div className="space-y-6">
            <div>
               <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Deskripsi</h3>
               <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line text-sm">
                 {product.description || "Deskripsi produk belum tersedia."}
               </p>
            </div>

            {/* List Fitur (Safety Check pakai ?) */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">Yang Kamu Dapat:</h3>
                <ul className="space-y-2 text-sm text-slate-500">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" /> 
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Kolom Kanan: Card Checkout Sticky */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 sticky top-24">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-sm text-slate-500 mb-1">Harga Spesial</p>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{product.price}</div>
              </div>
              <div className="text-xs text-red-500 font-bold bg-red-100 dark:bg-red-900/20 px-2 py-1 rounded">
                Hemat 50%
              </div>
            </div>

            {/* Komponen Tombol Beli */}
            <CheckoutButton price={product.price} productName={product.title} />

            <p className="text-xs text-center text-slate-400 mt-4 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Pembayaran Aman & Terverifikasi
            </p>
          </div>

        </div>

      </main>
    </div>
  );
}