"use client";

import { useState } from "react";
import { Copy, Eye, Instagram, Twitter, Globe, ExternalLink, BadgeCheck } from "lucide-react";
import { ProfileState, SHADOW_OPTIONS, ROUNDED_OPTIONS } from "./constants";

export default function PhonePreview({ profile }: { profile: ProfileState }) {
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://pesen.id/${profile.username}`);
    setShowCopySuccess(true);
    setTimeout(() => setShowCopySuccess(false), 2000);
  };

  const socialBlocks = profile.blocks.filter(b => b.type === "social" && b.active);
  const contentBlocks = profile.blocks.filter(b => b.type !== "social" && b.active);

  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return "";
    const videoId = url.split("v=")[1]?.split("&")[0] || url.split("youtu.be/")[1]?.split("?")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };

  return (
    <div className="sticky top-8">
      <div className="flex justify-between items-center mb-4 px-2">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Live Preview
        </span>
        <div className="flex items-center gap-2">
          <button onClick={copyToClipboard} className="text-slate-400 hover:text-purple-600 transition-colors relative">
            <Copy className="w-4 h-4" />
            {showCopySuccess && <span className="absolute -top-8 right-0 bg-black/90 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-50">Tersalin!</span>}
          </button>
        </div>
      </div>
      
      <div className="relative mx-auto border-gray-900 bg-black border-[12px] rounded-[3rem] h-[650px] w-[320px] shadow-2xl ring-1 ring-white/10 overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-7 w-32 bg-black rounded-b-2xl z-20 flex justify-center items-center">
          <div className="w-16 h-4 bg-black rounded-full relative"><div className="absolute right-2 top-1 w-2 h-2 bg-blue-900/50 rounded-full"></div></div>
        </div>

        <div className={`h-full w-full overflow-y-auto no-scrollbar ${profile.bgValue} text-white transition-all duration-500 ease-in-out ${profile.font}`}>
          {profile.layout === "hero" && <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent z-0"></div>}

          <div className={`p-5 min-h-full flex flex-col pt-12 pb-20 relative z-10 ${profile.layout === "center" || profile.layout === "hero" ? "items-center text-center" : "items-start text-left"}`}>
            
            <div className={`relative mb-3 ${profile.layout === "hero" ? "mt-8" : ""}`}>
              <img src={profile.avatar} className={`border-4 border-white/20 shadow-xl object-cover bg-slate-800 transition-all duration-500 w-24 h-24 ${ROUNDED_OPTIONS.find(r => r.value === profile.rounded)?.class || "rounded-2xl"}`} alt="avatar" />
            </div>

            <div className="flex flex-col items-center mb-2">
              <h1 className="text-xl font-black tracking-tight flex items-center gap-1.5 drop-shadow-md">
                {profile.name} <BadgeCheck className="w-4 h-4 text-blue-400 fill-current" />
              </h1>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest mt-1 backdrop-blur-sm">Creator</span>
            </div>

            <p className="text-xs opacity-90 leading-relaxed font-medium text-pretty max-w-[250px] mb-5">{profile.bio}</p>

            {socialBlocks.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {socialBlocks.map((block) => (
                  <a key={block.id} href={block.url} className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full backdrop-blur-md transition-all shadow-sm">
                    {block.icon === "instagram" && <Instagram className="w-4 h-4" />}
                    {block.icon === "twitter" && <Twitter className="w-4 h-4" />}
                    {block.icon === "tiktok" && <span className="text-[10px] font-bold px-1">Tk</span>}
                    {block.icon === "youtube" && <span className="text-[10px] font-bold px-1">YT</span>}
                    {!block.icon && <Globe className="w-4 h-4" />}
                  </a>
                ))}
              </div>
            )}

            <div className="w-full space-y-3">
              {contentBlocks.map((block) => {
                const embedUrl = getYoutubeEmbedUrl(block.url || "");
                
                return (
                  <div key={block.id} className="w-full">
                    {block.type === "header" && <h3 className="font-bold text-sm mt-4 mb-1 opacity-90">{block.content}</h3>}
                    
                    {block.type === "text" && (
                      <div className={`bg-white/10 backdrop-blur-md p-4 border border-white/10 text-xs text-center ${ROUNDED_OPTIONS.find(r => r.value === profile.rounded)?.class} ${SHADOW_OPTIONS.find(s => s.value === profile.shadow)?.class}`}>
                        {block.content}
                      </div>
                    )}
                    
                    {block.type === "link" && (
                      <a href={block.url} className={`flex items-center justify-between w-full py-3.5 px-5 bg-white/90 text-slate-900 font-bold text-center text-sm transition-all ${ROUNDED_OPTIONS.find(r => r.value === profile.rounded)?.class} ${SHADOW_OPTIONS.find(s => s.value === profile.shadow)?.class}`}>
                        <span></span><span>{block.content}</span><ExternalLink className="w-3.5 h-3.5 opacity-50" />
                      </a>
                    )}

                    {/* 👇 SOLUSI ERROR ADA DI SINI */}
                    {block.type === "youtube" && (
                      <div className={`overflow-hidden bg-white/10 border border-white/10 p-1 ${ROUNDED_OPTIONS.find(r => r.value === profile.rounded)?.class} ${SHADOW_OPTIONS.find(s => s.value === profile.shadow)?.class}`}>
                        {embedUrl ? (
                          <iframe width="100%" height="140" src={embedUrl} title="YouTube" frameBorder="0" allowFullScreen className={`rounded-[calc(${ROUNDED_OPTIONS.find(r => r.value === profile.rounded)?.class || '1rem'}-4px)] bg-black`}></iframe>
                        ) : (
                          <div className={`w-full h-[140px] bg-black/40 flex items-center justify-center text-[10px] text-white/50 rounded-[calc(${ROUNDED_OPTIONS.find(r => r.value === profile.rounded)?.class || '1rem'}-4px)]`}>
                            URL Video Belum Diisi
                          </div>
                        )}
                        {block.content && <p className="text-[10px] text-center mt-2 mb-1 font-bold opacity-80">{block.content}</p>}
                      </div>
                    )}

                    {block.type === "divider" && (
                      <div className="w-full flex items-center justify-center py-4">
                        <div className="w-16 h-1 bg-white/20 rounded-full"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="w-full mt-8">
               <h3 className="font-bold text-sm mb-3 text-center opacity-90">Produk Saya</h3>
               <div className={`w-full bg-white/90 p-3 flex gap-3 items-center ${ROUNDED_OPTIONS.find(r => r.value === profile.rounded)?.class}`}>
                 <div className="w-12 h-12 bg-slate-200 rounded-lg"></div>
                 <div className="text-left flex-1">
                   <div className="h-3 w-3/4 bg-slate-200 rounded-full mb-1"></div>
                   <div className="h-2 w-1/2 bg-slate-200 rounded-full"></div>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}