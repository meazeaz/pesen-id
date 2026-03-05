import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import CheckoutButton from "./CheckoutButton";
import { CheckCircle2, Tag, FileText, LayoutTemplate, MonitorPlay, Box } from "lucide-react";

// Tipe Params Next.js 15
type Props = {
  params: Promise<{ id: string }>;
};

// =========================================================
// ⚡ FITUR SUPER POWER NEXT.JS: DYNAMIC SEO METADATA (SSR)
// =========================================================
// Fungsi ini otomatis dibaca oleh bot Google, WhatsApp, & Twitter
// saat link produk ini dibagikan.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!product) return { title: "Produk Tidak Ditemukan" };

  return {
    title: `${product.title} | Pesen.id`,
    description: product.description?.substring(0, 160), // Potong untuk preview SEO
    openGraph: {
      images: [product.imageUrl || "https://pesen.id/default-og.png"],
    },
  };
}

// =========================================================
// ⚡ HALAMAN UTAMA (SERVER COMPONENT PURE)
// =========================================================
export default async function PublicProductPage({ params }: Props) {
  const resolvedParams = await params;
  
  // Fetch instan di Server! Tidak ada loading spinner untuk pembeli.
  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id },
  });

  // Jika produk dihapus atau di-set sebagai "draft", sembunyikan dari publik
  if (!product || product.status !== "active") {
    notFound();
  }

  // Helper untuk format Rupiah
  const formatRupiah = (num: number) => 
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);

  // Icon dinamis berdasarkan kategori
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "E-book": return <FileText className="w-4 h-4" />;
      case "Template": return <LayoutTemplate className="w-4 h-4" />;
      case "Course": return <MonitorPlay className="w-4 h-4" />;
      default: return <Box className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-slate-100 font-sans selection:bg-purple-500/30">
      <div className="max-w-4xl mx-auto px-6 py-12 lg:py-20">
        
        <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 lg:p-10 shadow-sm flex flex-col md:flex-row gap-10">
          
          {/* Kolom Kiri: Gambar Produk */}
          <div className="w-full md:w-2/5 flex-shrink-0">
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden relative shadow-inner flex items-center justify-center">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
              ) : (
                <div className="text-6xl text-slate-300 dark:text-slate-700">📦</div>
              )}
            </div>
          </div>

          {/* Kolom Kanan: Info Produk */}
          <div className="flex-1 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400 text-xs font-bold w-fit mb-4 border border-purple-100 dark:border-purple-900/30">
               {getCategoryIcon(product.category)} {product.category}
            </div>

            <h1 className="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">
              {product.title}
            </h1>
            
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {formatRupiah(product.price)}
              </span>
              {product.discountPrice && (
                <span className="text-lg text-slate-400 line-through font-medium">
                  {formatRupiah(product.discountPrice)}
                </span>
              )}
            </div>

            {/* Render Deskripsi (Mendukung baris baru) */}
            <div className="prose prose-slate dark:prose-invert text-sm text-slate-600 dark:text-slate-400 mb-8 whitespace-pre-line leading-relaxed">
              {product.description}
            </div>

            {/* Render Fitur jika ada */}
            {product.features && product.features.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-slate-500">Yang Anda Dapatkan:</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ⚡ INTEGRASI KOMPONEN CSR ⚡ */}
            <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
               <CheckoutButton productId={product.id} price={product.price} />
               <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
                 🔒 Transaksi aman & instan via Pesen.id
               </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}