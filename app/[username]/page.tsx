import { 
  Instagram, Twitter, Globe, ArrowRight, ShoppingBag, 
  CheckCircle2, ExternalLink, MessageCircle, Sparkles // ✅ Sparkles sudah ditambahkan
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// --- 1. SIMULASI DATA DARI DATABASE (Hasil Settingan Dashboard) ---
const MOCK_DATA = {
  username: "sembakojaya",
  name: "Toko Sembako Jaya",
  bio: "Pusat grosir sembako termurah. Pengiriman seluruh Indonesia 📦. Buka Senin-Sabtu.",
  avatar: "https://api.dicebear.com/7.x/initials/svg?seed=TS&backgroundColor=0ea5e9",
  theme: {
    bgValue: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900", // Midnight Theme
    textColor: "text-white",
    font: "font-sans",
    rounded: "rounded-2xl",
    buttonStyle: "rounded-xl",
    shadow: "shadow-lg"
  },
  layout: "bento", 
  socials: {
    instagram: "sembako_jaya",
    tiktok: "sembako.tiktok",
    whatsapp: "628123456789"
  },
  blocks: [
    { id: "1", type: "header", content: "Promo Spesial Hari Ini" },
    { 
      id: "2", type: "product", 
      title: "Paket Sembako Hemat A", 
      price: "Rp 150.000", 
      image: "📦", 
      desc: "Beras 5kg, Minyak 2L, Gula 1kg.",
      url: "/checkout/1"
    },
    { 
      id: "3", type: "product", 
      title: "Beras Premium 5kg", 
      price: "Rp 75.000", 
      image: "🍚",
      desc: "Beras pulen tanpa pemutih.",
      url: "/checkout/2"
    },
    { id: "4", type: "header", content: "Link Penting" },
    { 
      id: "5", type: "link", 
      content: "Cek Resi Pengiriman", 
      url: "https://cekresi.com",
      icon: "truck"
    },
    { 
      id: "6", type: "link", 
      content: "Join Grup Reseller (WA)", 
      url: "https://wa.me/...",
      icon: "users"
    },
  ]
};

// --- 2. KOMPONEN UI ---

// Kartu Produk
const ProductCard = ({ data, theme }: any) => (
  <div className={`group relative bg-white/10 backdrop-blur-md border border-white/10 p-4 ${theme.rounded} ${theme.shadow} hover:bg-white/20 transition-all cursor-pointer flex flex-col justify-between`}>
    <div className="flex items-start justify-between">
      <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-2xl">
        {data.image}
      </div>
      <span className="bg-green-500/20 text-green-300 text-xs font-bold px-2 py-1 rounded-full">
        Stok Ada
      </span>
    </div>
    <div className="mt-4">
      <h3 className="font-bold text-sm leading-tight">{data.title}</h3>
      <p className="text-xs opacity-70 mt-1 line-clamp-2">{data.desc}</p>
    </div>
    <div className="mt-4 flex items-center justify-between">
      <span className="font-bold text-sm">{data.price}</span>
      <button className="bg-white text-black p-2 rounded-full hover:scale-110 transition-transform">
        <ShoppingBag className="w-4 h-4" />
      </button>
    </div>
  </div>
);

// Tombol Link Biasa
const LinkBlock = ({ data, theme }: any) => (
  <a 
    href={data.url}
    target="_blank"
    rel="noreferrer"
    className={`block w-full py-4 px-6 bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md font-bold text-center transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 ${theme.buttonStyle} ${theme.shadow}`}
  >
    {data.content} <ExternalLink className="w-3 h-3 opacity-50" />
  </a>
);

// --- 3. PAGE COMPONENT (SSR) ---
type Props = {
  params: Promise<{ username: string }>;
};

export default async function PublicProfilePage({ params }: Props) {
  const { username } = await params;

  // Gunakan Data Mock
  const user = MOCK_DATA;
  const theme = user.theme;

  // Render Layout Logic
  const isBento = user.layout === "bento";
  const isHero = user.layout === "hero";
  const alignClass = user.layout === "left" || user.layout === "bento" ? "text-left items-start" : "text-center items-center";

  return (
    // Inject Theme Background & Font
    <div className={`min-h-screen w-full ${theme.bgValue} ${theme.textColor} ${theme.font} overflow-x-hidden selection:bg-pink-500 selection:text-white`}>
      
      {/* 1. HERO BANNER (Jika Layout Hero) */}
      {isHero && (
        <div className="h-48 md:h-64 w-full bg-black/30 relative">
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      )}

      {/* 2. CONTAINER UTAMA */}
      <div className={`max-w-2xl mx-auto px-6 pb-20 relative z-10 ${isHero ? "-mt-16" : "pt-16"}`}>
        
        {/* PROFILE HEADER */}
        <div className={`flex flex-col ${alignClass} mb-8`}>
          
          {/* Avatar */}
          <div className={`relative mb-4 ${user.layout === "bento" ? "w-full flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur-md" : ""}`}>
             <img 
               src={user.avatar} 
               alt={user.name}
               className={`rounded-full border-4 border-white/10 shadow-2xl object-cover bg-slate-800 
               ${user.layout === "bento" ? "w-16 h-16 border-2" : "w-28 h-28"}
               `} 
             />
             {user.layout === "bento" && (
                <div>
                   <h1 className="text-xl font-bold">{user.name}</h1>
                   <p className="opacity-70 text-sm">@{user.username}</p>
                </div>
             )}
          </div>

          {/* Text Info (Non-Bento) */}
          {user.layout !== "bento" && (
            <>
              <h1 className="text-2xl font-extrabold tracking-tight">{user.name}</h1>
              <p className="opacity-70 text-sm mt-1 mb-3 font-mono">@{user.username}</p>
              <p className="text-sm opacity-90 leading-relaxed max-w-lg mb-6 text-pretty">
                {user.bio}
              </p>
            </>
          )}

          {/* Bio (Bento Only) */}
          {user.layout === "bento" && (
             <p className="text-sm opacity-90 leading-relaxed mb-6 mt-2 text-pretty bg-white/5 p-4 rounded-2xl border border-white/5 w-full">
                {user.bio}
             </p>
          )}

          {/* Social Icons */}
          <div className="flex gap-3 mb-8">
            {user.socials.instagram && (
              <a href={`https://instagram.com/${user.socials.instagram}`} className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition backdrop-blur-sm">
                <Instagram className="w-5 h-5" />
              </a>
            )}
            {user.socials.tiktok && (
              <a href="#" className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition backdrop-blur-sm font-bold text-xs flex items-center justify-center w-11 h-11">
                Tk
              </a>
            )}
            {user.socials.whatsapp && (
              <a href={`https://wa.me/${user.socials.whatsapp}`} className="p-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-full transition backdrop-blur-sm">
                <MessageCircle className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* 3. CONTENT BLOCKS */}
        {isBento ? (
          // --- BENTO GRID LAYOUT ---
          <div className="grid grid-cols-2 gap-3">
            {user.blocks.map((block) => {
              if (block.type === "header") {
                // ✅ SPARKLES SUDAH DIIMPORT DI ATAS
                return <h3 key={block.id} className="col-span-2 font-bold text-lg mt-4 mb-2 flex items-center gap-2"><Sparkles className="w-4 h-4 text-yellow-400"/> {block.content}</h3>;
              }
              if (block.type === "product") {
                return <ProductCard key={block.id} data={block} theme={theme} />;
              }
              if (block.type === "link") {
                return (
                   <a key={block.id} href={block.url} className={`col-span-2 py-4 px-6 bg-white hover:bg-slate-200 text-slate-900 font-bold text-center transition-all ${theme.buttonStyle} ${theme.shadow}`}>
                      {block.content}
                   </a>
                );
              }
              return null;
            })}
          </div>
        ) : (
          // --- STANDARD LIST LAYOUT ---
          <div className="space-y-4 w-full max-w-lg mx-auto">
            {user.blocks.map((block) => {
              if (block.type === "header") {
                return <h3 key={block.id} className={`font-bold text-lg mt-6 mb-2 opacity-90 ${user.layout === 'center' ? 'text-center' : 'text-left'}`}>{block.content}</h3>;
              }
              if (block.type === "product") {
                // Tampilan Produk di Layout Standard (List View)
                return (
                  <div key={block.id} className={`flex items-center gap-4 bg-white/10 hover:bg-white/15 p-4 border border-white/10 backdrop-blur-md transition-all cursor-pointer group ${theme.rounded}`}>
                     <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center text-3xl shadow-sm">
                        {block.image}
                     </div>
                     <div className="flex-1 text-left">
                        <h4 className="font-bold text-base group-hover:text-purple-300 transition-colors">{block.title}</h4>
                        <p className="text-xs opacity-70 mb-2">{block.desc}</p>
                        <span className="bg-white text-black text-xs font-bold px-2 py-1 rounded-md">{block.price}</span>
                     </div>
                     <div className="bg-white/20 p-2 rounded-full">
                        <ArrowRight className="w-4 h-4" />
                     </div>
                  </div>
                );
              }
              if (block.type === "link") {
                return <LinkBlock key={block.id} data={block} theme={theme} />;
              }
              return null;
            })}
          </div>
        )}

        {/* 4. FOOTER */}
        <div className="mt-16 text-center opacity-50 hover:opacity-100 transition-opacity">
           <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-black/20 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/5 backdrop-blur-sm">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              Powered by Pesen.id
           </Link>
        </div>

      </div>
    </div>
  );
}