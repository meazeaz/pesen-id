import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, BadgeCheck, Instagram, Twitter, Globe, ExternalLink } from "lucide-react";
import { Metadata } from "next";

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const user = await prisma.user.findUnique({ where: { username: resolvedParams.username } });
  if (!user) return { title: "Toko Tidak Ditemukan" };
  return { title: `${user.name || user.username} | Pesen.id`, description: `Kunjungi profil dan produk digital dari ${user.name || user.username}.` };
}

const KAMUS_SUDUT: Record<string, string> = { sm: "rounded-lg", md: "rounded-xl", lg: "rounded-2xl", full: "rounded-[2rem]" };
const KAMUS_BAYANGAN: Record<string, string> = { none: "", sm: "shadow-sm", md: "shadow-md", lg: "shadow-xl" };

const getYoutubeEmbedUrl = (url: string) => {
  if (!url) return "";
  const videoId = url.split("v=")[1]?.split("&")[0] || url.split("youtu.be/")[1]?.split("?")[0];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
};

export default async function PublicProfilePage({ params }: Props) {
  const resolvedParams = await params;
  const username = resolvedParams.username;

  const user = await prisma.user.findUnique({
    where: { username: username },
    include: {
      profile: true,
      products: { where: { status: "active" }, orderBy: { createdAt: "desc" } }
    }
  });

  if (!user) notFound();

  if (user.profile) {
    try { await prisma.profile.update({ where: { id: user.profile.id }, data: { views: { increment: 1 } } }); } catch(e) {}
  }

  const profile = user.profile;
  const bgValue = profile?.bgValue || "bg-slate-900";
  const font = profile?.font || "font-sans";
  const roundedClass = KAMUS_SUDUT[profile?.rounded || "lg"] || "rounded-2xl";
  const shadowClass = KAMUS_BAYANGAN[profile?.shadow || "md"] || "shadow-xl";
  const layout = profile?.layout || "center";
  
  const blocks: any[] = Array.isArray(profile?.blocks) ? profile.blocks : [];
  const socialBlocks = blocks.filter(b => b.type === "social" && b.active);
  const contentBlocks = blocks.filter(b => b.type !== "social" && b.active);

  // 👇 PERBAIKAN: Format Rupiah manual yang 100% aman untuk Server (SSR) & Client agar tidak Hydration Error
  const formatRupiah = (angka: number) => {
    return "Rp " + angka.toLocaleString("id-ID");
  };

  return (
    <main className={`min-h-screen w-full ${bgValue} text-white ${font} overflow-x-hidden selection:bg-white/30`}>
      {layout === "hero" && <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black/60 to-transparent z-0 pointer-events-none"></div>}

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-32 relative z-10 pt-16 md:pt-24">
        
        <div className={`flex flex-col mb-6 ${layout === "center" || layout === "hero" ? "items-center text-center" : "items-start text-left"}`}>
          <img src={user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`} alt={user.username} className={`w-28 h-28 md:w-32 md:h-32 object-cover bg-slate-800 border-4 border-white/20 shadow-2xl mb-4 ${roundedClass}`} />
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-700">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight drop-shadow-md flex items-center justify-center gap-2">
              {user.name || user.username} {user.isPro && <BadgeCheck className="w-6 h-6 text-blue-400 fill-current" />}
            </h1>
            <div className="opacity-70 text-sm font-medium mt-1 mb-4 bg-black/20 w-fit mx-auto px-3 py-1 rounded-full border border-white/10">Creator</div>
            <div className="text-sm md:text-base opacity-90 leading-relaxed text-pretty max-w-lg mx-auto">{profile?.bio || "Selamat datang di toko saya!"}</div>
          </div>
        </div>

        {socialBlocks.length > 0 && (
          <div className={`flex flex-wrap gap-3 mb-10 animate-in fade-in duration-700 delay-200 ${layout === "center" || layout === "hero" ? "justify-center" : "justify-start"}`}>
            {socialBlocks.map((block) => (
              <a key={block.id} href={block.url} target="_blank" rel="noopener noreferrer" className="p-3.5 bg-white/10 hover:bg-white/25 hover:-translate-y-1 rounded-full backdrop-blur-md transition-all border border-white/10 shadow-lg">
                {block.icon === "instagram" && <Instagram className="w-5 h-5" />}
                {block.icon === "twitter" && <Twitter className="w-5 h-5" />}
                {block.icon === "tiktok" && <span className="text-sm font-bold px-1">Tk</span>}
                {block.icon === "youtube" && <span className="text-sm font-bold px-1">YT</span>}
                {!block.icon && <Globe className="w-5 h-5" />}
              </a>
            ))}
          </div>
        )}

        {contentBlocks.length > 0 && (
          <div className="w-full space-y-4 mb-16">
            {contentBlocks.map((block, index) => {
              const embedUrl = getYoutubeEmbedUrl(block.url || "");
              
              return (
                <div key={block.id} className="w-full animate-in slide-in-from-bottom-4 fade-in duration-500 fill-mode-backwards" style={{ animationDelay: `${index * 100}ms` }}>
                  {block.type === "header" && <h3 className={`font-bold text-lg mt-8 mb-2 opacity-90 ${layout === "center" || layout === "hero" ? "text-center" : "text-left"}`}>{block.content}</h3>}
                  
                  {block.type === "text" && <div className={`bg-white/10 backdrop-blur-md p-5 border border-white/10 text-sm leading-relaxed ${roundedClass} ${shadowClass}`}>{block.content}</div>}
                  
                  {block.type === "link" && (
                     <a href={block.url} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-between w-full py-4 px-6 bg-white/90 hover:bg-white text-slate-900 font-bold text-center hover:scale-[1.02] active:scale-95 transition-all duration-300 ${roundedClass} ${shadowClass}`}>
                        <span></span><span>{block.content}</span><ExternalLink className="w-4 h-4 opacity-50" />
                     </a>
                  )}

                  {block.type === "youtube" && user.isPro && embedUrl && (
                     <div className={`overflow-hidden bg-white/5 border border-white/10 p-2 backdrop-blur-sm ${roundedClass} ${shadowClass}`}>
                       <iframe width="100%" height="250" src={embedUrl} title="YouTube Video" frameBorder="0" allowFullScreen className={`rounded-[calc(${roundedClass === 'rounded-full' ? '2rem' : roundedClass === 'rounded-2xl' ? '1rem' : '0.5rem'})] bg-black`}></iframe>
                       {block.content && <div className="text-sm text-center mt-3 mb-1 font-bold opacity-90">{block.content}</div>}
                     </div>
                  )}

                  {block.type === "divider" && (
                     <div className="w-full flex items-center justify-center py-6 opacity-30">
                       <div className="w-24 h-1.5 bg-white rounded-full"></div>
                     </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="w-full mt-10">
          <div className="flex items-center justify-center gap-3 mb-8">
             <div className="h-px bg-white/20 flex-1 max-w-[60px]"></div>
             <h3 className="font-black text-xl tracking-widest uppercase text-white/90 flex items-center gap-2">
               <ShoppingBag className="w-5 h-5" /> Produk Digital
             </h3>
             <div className="h-px bg-white/20 flex-1 max-w-[60px]"></div>
          </div>

          {user.products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {user.products.map((product) => (
                <Link href={`/${user.username}/${product.id}`} key={product.id} className={`group block bg-white/95 dark:bg-[#121212]/95 backdrop-blur-xl border border-white/10 overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/10 transition-all duration-300 ${roundedClass} ${shadowClass}`}>
                  <div className="w-full aspect-[4/3] bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-4xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900">📦</div>
                    )}
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div> Ready
                    </div>
                  </div>
                  <div className="p-5 flex flex-col h-[140px]">
                    <h3 className="font-extrabold text-lg leading-tight text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors line-clamp-2">{product.title}</h3>
                    <div className="mt-auto flex items-end justify-between">
                      <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Harga</div>
                        <span className="font-black text-xl text-slate-900 dark:text-white">{formatRupiah(product.price)}</span>
                      </div>
                      <div className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl group-hover:scale-105 transition-transform">
                        Beli
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 border-dashed">
              <ShoppingBag className="w-10 h-10 text-white/30 mx-auto mb-3" />
              <div className="text-white/60 font-medium">Belum ada produk aktif.</div>
            </div>
          )}
        </div>

        {!user.isPro ? (
          <div className="text-center mt-24 opacity-50 hover:opacity-100 transition-opacity pb-12">
             <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-black/30 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></span>
                Powered by Pesen.id
             </Link>
          </div>
        ) : (
          <div className="mt-32 pb-12"></div>
        )}

      </div>
    </main>
  );
}