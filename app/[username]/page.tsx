import { 
  Instagram, Twitter, Globe, ShoppingBag, Store, CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

// =====================================================================
// 🎨 BAGIAN 1: KAMUS DESAIN & KATEGORI
// =====================================================================
const KAMUS_SUDUT: Record<string, string> = { sm: "rounded-lg", md: "rounded-xl", lg: "rounded-2xl", full: "rounded-full" };
const KAMUS_BAYANGAN: Record<string, string> = { none: "", sm: "shadow-md", md: "shadow-xl", lg: "shadow-2xl" };

// 👇 INI DIA KAMUS KATEGORI BARU KITA!
const NAMA_KATEGORI: Record<string, string> = {
  "E-book": "📚 E-Book Premium",
  "Course": "🎓 Produk Kursus",
  "Template": "📄 Produk Template",
  "Software": "💻 Software & Tools",
  "Aset Design": "🎨 Aset Design",
  "Jasa": "🛠️ Layanan Jasa", 
};

// =====================================================================
// 📦 BAGIAN 2: CETAKAN KOTAK PRODUK
// =====================================================================
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CetakanProduk = ({ product, roundedClass, shadowClass, username }: { product: any; roundedClass: string; shadowClass: string; username: string }) => {
  const formatRupiah = (angka: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(angka);

  return (
    <Link href={`/${username}/${product.id}`} className="block group">
      <div className={`relative bg-white/10 backdrop-blur-md border border-white/10 p-4 group-hover:bg-white/20 transition-all duration-300 cursor-pointer flex flex-col h-full justify-between active:scale-95 ${roundedClass} ${shadowClass}`}>
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-2xl shadow-sm">
            {product.imageUrl || "📦"}
          </div>
          <span className="bg-green-500/20 border border-green-500/30 text-green-300 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Tersedia
          </span>
        </div>
        <div className="mt-4 mb-4">
          <h3 className="font-bold text-sm leading-tight group-hover:text-purple-300 transition-colors">{product.title}</h3>
          <p className="text-xs opacity-70 mt-1 line-clamp-2">{product.description || "Produk digital berkualitas."}</p>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold text-sm bg-black/20 px-2 py-1 rounded-md">{formatRupiah(product.price)}</span>
          <div className="bg-white text-black p-2 rounded-full group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all shadow-md">
            <ShoppingBag className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};

// =====================================================================
// 🚀 BAGIAN 3: HALAMAN UTAMA
// =====================================================================
type Props = { params: Promise<{ username: string }> };

export default async function PublicProfilePage({ params }: Props) {
  const { username } = await params;

  // --- AMBIL DATA ---
  const user = await prisma.user.findUnique({
    where: { username: username },
    include: {
      profile: true,
      products: {
        where: { status: "active" }, 
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!user) return notFound();

  // =====================================================================
  // 👁️ KAMERA CCTV (PENGHITUNG VIEWS OTOMATIS)
  // =====================================================================
  if (user.profile) {
    try {
      // Tambahkan angka views +1 setiap kali halaman ini dibuka
      await prisma.profile.update({
        where: { id: user.profile.id },
        data: { views: { increment: 1 } }
      });
    } catch (error) {
      console.error("Gagal merekam view:", error);
    }
  }

  // --- TERJEMAHKAN DESAIN ---
  const profile = user.profile;
  const layout = profile?.layout || "center";
  const bgValue = profile?.bgValue || "bg-slate-900";
  const font = profile?.font || "font-sans";
  const roundedClass = KAMUS_SUDUT[profile?.rounded || "lg"] || "rounded-2xl";
  const shadowClass = KAMUS_BAYANGAN[profile?.shadow || "md"] || "shadow-xl";
  const alignClass = layout === "center" ? "items-center text-center" : "items-start text-left";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const blocks: any[] = Array.isArray(profile?.blocks) ? profile.blocks : [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activeBlocks = blocks.filter((b: any) => b.active);
  const avatarUrl = user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}&backgroundColor=8b5cf6`;

  // 👇 INI MESIN PENGELOMPOKANNYA! (Grouping)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const produkDikelompokkan: Record<string, any[]> = {};
  user.products.forEach((produk) => {
    const kategori = produk.category || "Lainnya";
    if (!produkDikelompokkan[kategori]) {
      produkDikelompokkan[kategori] = []; // Buat keranjang baru jika kategori belum ada
    }
    produkDikelompokkan[kategori].push(produk); // Masukkan produk ke keranjang kategorinya
  });

  // --- RENDER LAYAR ---
  return (
    <div className={`min-h-screen w-full ${bgValue} text-white ${font} overflow-x-hidden selection:bg-purple-500 selection:text-white`}>
      
      {layout === "hero" && <div className="absolute top-0 left-0 w-full h-48 md:h-64 bg-linear-to-b from-black/60 to-transparent z-0"></div>}

      <div className={`max-w-2xl mx-auto px-6 pb-24 relative z-10 ${layout === "hero" ? "pt-24" : "pt-16"}`}>
        
        {/* --- PROFIL --- */}
        <div className={`flex flex-col ${alignClass} mb-8`}>
          <div className={`relative mb-4 transition-all duration-500 ${layout === "compact" ? "flex items-center gap-5 w-full bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur-sm" : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatarUrl} alt={user.name || user.username} className={`object-cover bg-slate-800 border-4 border-white/20 shadow-2xl ${roundedClass} ${layout === "compact" ? "w-20 h-20" : layout === "hero" ? "w-32 h-32" : "w-28 h-28"}`} />
            {layout === "compact" && (
              <div className="flex-1 text-left">
                <h1 className="text-2xl font-bold tracking-tight">{user.name || user.username}</h1>
                <p className="opacity-70 text-sm font-mono mt-0.5 mb-2">@{user.username}</p>
                <p className="text-sm opacity-90 leading-relaxed text-pretty max-w-sm line-clamp-2">{profile?.bio}</p>
              </div>
            )}
          </div>
          {layout !== "compact" && (
            <div className="animate-in slide-in-from-bottom-4 fade-in duration-700">
              <h1 className="text-3xl font-extrabold tracking-tight drop-shadow-md">{user.name || user.username}</h1>
              <p className="opacity-70 text-sm font-mono mt-1 mb-4">@{user.username}</p>
              <p className="text-base opacity-90 leading-relaxed text-pretty max-w-lg mx-auto">{profile?.bio}</p>
            </div>
          )}
        </div>

        {/* --- BLOK LINK/SOSMED --- */}
        {activeBlocks.length > 0 && (
          <div className="w-full space-y-4 mb-12">
            {activeBlocks.map((block, index) => (
              <div key={block.id} className="w-full animate-in slide-in-from-bottom-4 fade-in duration-500 fill-mode-backwards" style={{ animationDelay: `${index * 100}ms` }}>
                {block.type === "header" && <h3 className={`font-bold text-lg mt-6 mb-2 opacity-90 ${layout === "center" ? "text-center" : "text-left"}`}>{block.content}</h3>}
                {block.type === "text" && <div className={`bg-white/10 backdrop-blur-md p-5 border border-white/10 text-sm text-slate-100 ${roundedClass} ${shadowClass}`}>{block.content}</div>}
                {block.type === "link" && <a href={block.url} target="_blank" rel="noopener noreferrer" className={`block w-full py-4 px-6 bg-white/90 hover:bg-white text-slate-900 font-bold text-center hover:scale-[1.02] active:scale-95 transition-all duration-300 text-sm md:text-base ${roundedClass} ${shadowClass}`}>{block.content}</a>}
                {block.type === "social" && (
                  <a href={block.url} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center gap-3 w-full py-4 px-4 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/10 text-white font-medium transition-all duration-300 text-sm md:text-base ${roundedClass} ${shadowClass}`}>
                    {block.icon === "instagram" && <Instagram className="w-5 h-5" />}
                    {block.icon === "twitter" && <Twitter className="w-5 h-5" />}
                    {!block.icon && <Globe className="w-5 h-5" />}
                    {block.content}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* --- DAFTAR PRODUK (DIKELOMPOKKAN) --- */}
        {Object.keys(produkDikelompokkan).length > 0 && (
          <div className="mt-8 space-y-12">
            {Object.entries(produkDikelompokkan).map(([kategori, daftarProduk]) => (
              <div key={kategori} className="animate-in fade-in duration-700">
                <h3 className={`font-bold text-xl mb-6 flex items-center gap-2 ${layout === "center" ? "justify-center" : "justify-start"}`}>
                  {NAMA_KATEGORI[kategori] || `Produk ${kategori}`}
                </h3>
                
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {daftarProduk.map((product) => (
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
        <div className="mt-20 text-center opacity-50 hover:opacity-100 transition-opacity">
           <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-black/20 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/5 backdrop-blur-sm">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              Powered by Pesen.id
           </Link>
        </div>

      </div>
    </div>
  );
}