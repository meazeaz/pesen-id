import { 
  Instagram, Twitter, Globe, CheckCircle2, MapPin, ExternalLink
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

// =====================================================================
// 🎨 KAMUS DESAIN & KATEGORI
// =====================================================================
const KAMUS_SUDUT: Record<string, string> = { sm: "rounded-lg", md: "rounded-xl", lg: "rounded-2xl", full: "rounded-[2rem]" };
const KAMUS_BAYANGAN: Record<string, string> = { none: "", sm: "shadow-sm", md: "shadow-md", lg: "shadow-xl" };

const NAMA_KATEGORI: Record<string, string> = {
  "E-book": "📚 E-Book & Panduan",
  "Course": "🎓 Kelas Online",
  "Template": "📄 Template Premium",
  "Software": "💻 Software & Tools",
  "Aset Design": "🎨 Aset Desain",
  "Jasa": "🛠️ Layanan Jasa", 
};

// =====================================================================
// 📦 CETAKAN PRODUK (GAYA LYNK.ID - GAMBAR BESAR)
// =====================================================================
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CetakanProduk = ({ product, roundedClass, shadowClass, username }: { product: any; roundedClass: string; shadowClass: string; username: string }) => {
  const formatRupiah = (angka: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(angka);

  return (
    <Link href={`/${username}/${product.id}`} className="block group mb-6 w-full max-w-lg mx-auto">
      <div className={`bg-white/90 dark:bg-[#121212]/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden ${roundedClass} ${shadowClass} hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300`}>
        
        {/* Gambar Cover Full Width */}
        <div className="w-full aspect-[16/9] sm:aspect-[2/1] bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-4xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900">
              📦
              <span className="text-xs text-slate-400 mt-2 font-bold">Tanpa Cover</span>
            </div>
          )}
          
          {/* Badge Promo / Tersedia */}
          <div className="absolute top-3 left-3 flex gap-2">
            {product.discountPrice && product.discountPrice > product.price && (
              <span className="bg-red-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-lg">PROMO</span>
            )}
            <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-400" /> Ready
            </span>
          </div>
        </div>

        {/* Konten Bawah */}
        <div className="p-5 sm:p-6">
          <h3 className="font-extrabold text-lg sm:text-xl leading-tight text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
            {product.title}
          </h3>
          
          <div className="mt-3 flex items-end justify-between">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">Harga</p>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl text-slate-900 dark:text-white">
                  {formatRupiah(product.price)}
                </span>
                {product.discountPrice && product.discountPrice > product.price && (
                  <span className="text-xs text-slate-400 line-through font-semibold">
                    {formatRupiah(product.discountPrice)}
                  </span>
                )}
              </div>
            </div>
            
            {/* Tombol Aksi Ala Lynk.id */}
            <div className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-shadow">
              Lihat Detail
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
};

// =====================================================================
// 🚀 HALAMAN UTAMA TOKO
// =====================================================================
type Props = { params: Promise<{ username: string }> };

export default async function PublicProfilePage({ params }: Props) {
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: { username: username },
    include: {
      profile: true,
      products: { where: { status: "active" }, orderBy: { createdAt: "desc" } }
    }
  });

  if (!user) return notFound();

  // Kamera CCTV
  if (user.profile) {
    try {
      await prisma.profile.update({ where: { id: user.profile.id }, data: { views: { increment: 1 } } });
    } catch (error) { console.error(error); }
  }

  const profile = user.profile;
  const layout = profile?.layout || "hero"; // Kita paksa hero agar mirip Lynk.id
  const bgValue = profile?.bgValue || "bg-slate-900";
  const font = profile?.font || "font-sans";
  const roundedClass = KAMUS_SUDUT[profile?.rounded || "lg"] || "rounded-2xl";
  const shadowClass = KAMUS_BAYANGAN[profile?.shadow || "md"] || "shadow-xl";
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const blocks: any[] = Array.isArray(profile?.blocks) ? profile.blocks : [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activeBlocks = blocks.filter((b: any) => b.active);
  const avatarUrl = user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}&backgroundColor=8b5cf6`;

  // Grouping Produk
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const produkDikelompokkan: Record<string, any[]> = {};
  user.products.forEach((produk: any) => {
    const kategori = produk.category || "Lainnya";
    if (!produkDikelompokkan[kategori]) produkDikelompokkan[kategori] = [];
    produkDikelompokkan[kategori].push(produk);
  });

  return (
    <div className={`min-h-screen w-full ${bgValue} text-white ${font} overflow-x-hidden selection:bg-purple-500 selection:text-white`}>
      
      {/* Background Banner Atas ala Lynk.id */}
      <div className="absolute top-0 left-0 w-full h-64 md:h-80 bg-gradient-to-b from-black/60 to-transparent z-0 pointer-events-none"></div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-32 relative z-10 pt-20 md:pt-28">
        
        {/* --- PROFIL HEADER --- */}
        <div className="flex flex-col items-center text-center mb-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
             src={avatarUrl} 
             alt={user.name || user.username} 
             className={`w-28 h-28 md:w-32 md:h-32 object-cover bg-slate-800 border-4 border-white/20 shadow-2xl z-10 mb-5 ${roundedClass}`} 
          />
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-700">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight drop-shadow-md">{user.name || user.username}</h1>
            <p className="opacity-70 text-sm font-mono mt-2 mb-4 bg-black/20 w-fit mx-auto px-3 py-1 rounded-full border border-white/5">@{user.username}</p>
            <p className="text-base opacity-90 leading-relaxed text-pretty max-w-lg mx-auto">{profile?.bio}</p>
          </div>

          {/* Social Links Mini */}
          <div className="flex gap-3 mt-6">
             {activeBlocks.filter(b => b.type === "social").map((block) => (
                <a key={block.id} href={block.url} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all border border-white/10">
                   {block.icon === "instagram" && <Instagram className="w-5 h-5" />}
                   {block.icon === "twitter" && <Twitter className="w-5 h-5" />}
                   {!block.icon && <Globe className="w-5 h-5" />}
                </a>
             ))}
          </div>
        </div>

        {/* --- BLOK CUSTOM LINK LAINNYA --- */}
        {activeBlocks.filter(b => b.type !== "social").length > 0 && (
          <div className="w-full max-w-lg mx-auto space-y-4 mb-16">
            {activeBlocks.filter(b => b.type !== "social").map((block, index) => (
              <div key={block.id} className="w-full animate-in slide-in-from-bottom-4 fade-in duration-500 fill-mode-backwards" style={{ animationDelay: `${index * 100}ms` }}>
                {block.type === "header" && <h3 className="font-bold text-xl mt-8 mb-3 opacity-90 text-center">{block.content}</h3>}
                {block.type === "text" && <div className={`bg-white/10 backdrop-blur-md p-5 border border-white/10 text-sm text-center ${roundedClass} ${shadowClass}`}>{block.content}</div>}
                {block.type === "link" && (
                   <a href={block.url} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-between w-full py-4 px-6 bg-white/90 hover:bg-white text-slate-900 font-bold text-center hover:scale-[1.02] active:scale-95 transition-all duration-300 ${roundedClass} ${shadowClass}`}>
                      <span></span>
                      <span>{block.content}</span>
                      <ExternalLink className="w-4 h-4 opacity-50" />
                   </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* --- DAFTAR PRODUK (KATALOG) --- */}
        {Object.keys(produkDikelompokkan).length > 0 && (
          <div className="w-full space-y-12 mt-8">
            {Object.entries(produkDikelompokkan).map(([kategori, daftarProduk]) => (
              <div key={kategori} className="animate-in fade-in duration-700">
                
                {/* Header Kategori */}
                <div className="flex items-center justify-center gap-4 mb-6">
                   <div className="h-px bg-white/20 flex-1 max-w-[50px]"></div>
                   <h3 className="font-black text-xl md:text-2xl text-center uppercase tracking-widest text-white/90">
                     {NAMA_KATEGORI[kategori] || kategori}
                   </h3>
                   <div className="h-px bg-white/20 flex-1 max-w-[50px]"></div>
                </div>
                
                {/* Looping Kartu Produk (1 Kolom Penuh) */}
                <div className="flex flex-col gap-4">
                  {daftarProduk.map((product: any) => (
                    <CetakanProduk 
                      key={product.id} 
                      product={product} 
                      roundedClass={roundedClass}
                      shadowClass={shadowClass}
                      username={user.username} 
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- FOOTER --- */}
        <div className="mt-24 text-center opacity-50 hover:opacity-100 transition-opacity pb-10">
           <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-black/30 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10 backdrop-blur-md">
              <span className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-pulse"></span>
              Powered by Pesen.id
           </Link>
        </div>

      </div>
    </div>
  );
}