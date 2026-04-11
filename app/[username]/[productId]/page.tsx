import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import CheckoutButton from "@/components/product/CheckoutButton";

type Props = {
  params: Promise<{ username: string; productId: string }>;
};

// --- 1. SEO OTOMATIS (Dynamic Metadata) ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  
  // Ambil data produk untuk meta title & description
  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.productId }
  });
  
  const user = await prisma.user.findUnique({
    where: { username: resolvedParams.username }
  });

  if (!product || !user) return { title: "Produk Tidak Ditemukan | Pesen.id" };

  return {
    title: `${product.title} by ${user.name || user.username} | Pesen.id`,
    description: product.description?.slice(0, 150) || `Beli ${product.title} dengan harga terbaik.`,
  };
}

// --- 2. HALAMAN UTAMA (Server Component) ---
export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const { username, productId } = resolvedParams;

  // Tarik Data User berdasarkan username
  const user = await prisma.user.findUnique({
    where: { username: username },
  });

  if (!user) return notFound();

  // Tarik Data Produk berdasarkan ID dan pastikan produk ini milik user tersebut
  const product = await prisma.product.findUnique({
    where: { 
      id: productId,
      userId: user.id // Keamanan: Pastikan URL /username/ dan id produk cocok
    }
  });

  // Jika produk tidak ada, atau statusnya bukan "active" (misal: "draft"), tampilkan 404
  if (!product || product.status !== "active") return notFound();

  // Helper Format Rupiah
  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(number);
  };

  // Template Pesan WA Otomatis
  const waMessage = encodeURIComponent(`Halo kak ${user.name || username}, saya mau tanya tentang produk digital "${product.title}" yang ada di Pesen.id.`);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] font-sans flex flex-col transition-colors duration-300">
      
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
        
        {/* Header Produk (Tengah) */}
        <div className="space-y-4 flex flex-col items-center text-center animate-in slide-in-from-bottom-4 duration-500">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-bold uppercase tracking-wider">
            {product.category}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight text-pretty">
            {product.title}
          </h1>
          
          {/* Info Creator */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <img 
              src={user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${username}&backgroundColor=8b5cf6`} 
              alt={user.name || username} 
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 object-cover" 
            />
            <div className="text-left">
              <p className="text-sm text-slate-500 dark:text-slate-400">Creator</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">
                {user.name || username} <CheckCircle2 className="w-3 h-3 text-blue-500" />
              </p>
            </div>
          </div>
        </div>

        {/* 👇 INI YANG KITA UBAH: Visual Produk (Card Besar) Terkoneksi Database */}
        <div className="aspect-video bg-slate-50 dark:bg-[#121212] rounded-3xl flex items-center justify-center text-6xl border border-slate-200 dark:border-slate-800 shadow-sm animate-in zoom-in-95 duration-500 overflow-hidden relative">
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
          ) : (
            <span>📦</span>
          )}
        </div>

        {/* Detail & Harga (Grid Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pb-20">
          
          {/* Kolom Kiri: Deskripsi & Fitur */}
          <div className="space-y-6">
            <div>
               <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Deskripsi</h3>
               <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line text-sm">
                 {product.description || "Deskripsi produk belum tersedia."}
               </p>
            </div>

            {/* List Fitur (Jika Ada) */}
            {product.features && (product.features as string[]).length > 0 && (
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3">Yang Kamu Dapat:</h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  {(product.features as string[]).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> 
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Kolom Kanan: Card Checkout Sticky */}
          <div className="bg-slate-50 dark:bg-[#121212] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 sticky top-24 shadow-sm">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Harga Produk</p>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{formatRupiah(product.price)}</div>
              </div>
              
              {/* Jika ada harga coret / diskon */}
              {product.discountPrice && product.discountPrice > product.price && (
                <div className="text-xs text-red-500 font-bold bg-red-100 dark:bg-red-900/20 px-2 py-1 rounded-lg">
                  Diskon!
                </div>
              )}
            </div>

            {/* Komponen Tombol Beli */}
            <CheckoutButton 
              price={product.price.toString()} 
              productName={product.title} 
              productId={product.id} 
            />
            
            <a 
              href={`https://wa.me/?text=${waMessage}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-3 py-3.5 bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-500 hover:bg-green-100 dark:hover:bg-green-900/30 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm border border-green-200 dark:border-green-900/30 active:scale-95"
            >
              <MessageCircle className="w-5 h-5" /> Tanya Penjual via WA
            </a>

            <p className="text-xs text-center text-slate-400 mt-5 flex items-center justify-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-slate-400" /> Pembayaran Aman & Terverifikasi
            </p>
          </div>

        </div>

      </main>
    </div>
  );
}