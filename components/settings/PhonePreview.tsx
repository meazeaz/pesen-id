"use client";

import { useState } from "react";
import { Copy, Eye, Instagram, Twitter, Globe } from "lucide-react";
import { ProfileState, SHADOW_OPTIONS, ROUNDED_OPTIONS } from "./constants";

// 👇 INI KUNCI ERROR-NYA! Kita harus mendefinisikan bahwa komponen ini menerima prop "profile"
export default function PhonePreview({ profile }: { profile: ProfileState }) {
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://pesen.id/${profile.username}`);
    setShowCopySuccess(true);
    setTimeout(() => setShowCopySuccess(false), 2000);
  };

  return (
    <div className="sticky top-8">
      {/* Label Preview dengan Copy Link */}
      <div className="flex justify-between items-center mb-4 px-2">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> 
          Live Preview
        </span>
        <div className="flex items-center gap-2">
          <button 
            onClick={copyToClipboard}
            className="text-slate-400 hover:text-purple-600 dark:hover:text-white transition-colors relative"
          >
            <Copy className="w-4 h-4" />
            {showCopySuccess && (
              <span className="absolute -top-8 right-0 bg-black/90 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-50">
                Link tersalin!
              </span>
            )}
          </button>
          <button className="text-slate-400 hover:text-purple-600 dark:hover:text-white transition-colors">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Bezel HP Realistis */}
      <div className="relative mx-auto border-gray-900 bg-black border-12 rounded-[3rem] h-162.5 w-[320px] shadow-2xl ring-1 ring-white/10 overflow-hidden">
        
        {/* Dynamic Notch Island */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-7 w-32 bg-black rounded-b-2xl z-20 flex justify-center items-center">
          <div className="w-16 h-4 bg-black rounded-full relative">
            <div className="absolute right-2 top-1 w-2 h-2 bg-blue-900/50 rounded-full"></div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="absolute top-2 left-6 right-6 z-20 flex justify-between text-[10px] text-white/70 px-2">
          <span>9:41</span>
          <span>📶 🔋 100%</span>
        </div>

        {/* Layar / Konten */}
        <div className={`h-full w-full overflow-y-auto no-scrollbar ${profile.bgValue} text-white transition-all duration-500 ease-in-out ${profile.font}`}>
          <div className={`p-6 min-h-full flex flex-col gap-5 pt-16 ${
            profile.layout === "center" ? "items-center text-center" : 
            profile.layout === "left" ? "items-start text-left" :
            profile.layout === "compact" ? "items-start text-left space-y-3" : ""
          }`}>
            
            {/* Hero Overlay */}
            {profile.layout === "hero" && (
              <div className="absolute top-0 left-0 w-full h-40 bg-linear-to-b from-black/60 to-transparent z-0"></div>
            )}

            {/* Avatar dengan efek sesuai layout */}
            <div className={`relative z-10 transition-all duration-500 ${
              profile.layout === "hero" ? "mt-4" : 
              profile.layout === "compact" ? "flex items-center gap-4 w-full" : ""
            }`}>
              {profile.layout === "compact" ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={profile.avatar} 
                    className={`border-4 border-white/20 shadow-xl object-cover bg-slate-800 w-16 h-16 ${ROUNDED_OPTIONS.find(r => r.value === profile.rounded)?.class || "rounded-2xl"}`} 
                    alt="avatar"
                  />
                  <div className="flex-1 text-left">
                    <h1 className="text-lg font-bold tracking-tight">{profile.name}</h1>
                    <p className="text-xs opacity-70 font-medium">@{profile.username}</p>
                  </div>
                </>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={profile.avatar} 
                  className={`border-4 border-white/20 shadow-xl object-cover bg-slate-800 transition-all duration-500
                  ${profile.layout === "hero" ? "w-28 h-28" : "w-24 h-24"} ${ROUNDED_OPTIONS.find(r => r.value === profile.rounded)?.class || "rounded-2xl"}`} 
                  alt="avatar"
                />
              )}
            </div>

            {/* Info User (jika bukan compact) */}
            {profile.layout !== "compact" && (
              <div className="relative z-10 space-y-2 animate-in slide-in-from-bottom-2 fade-in duration-700">
                <div>
                  <h1 className="text-xl font-bold tracking-tight">{profile.name}</h1>
                  <p className="text-xs opacity-70 font-medium mt-0.5">@{profile.username}</p>
                </div>
                <p className="text-sm opacity-90 leading-relaxed font-light text-pretty max-w-xs">{profile.bio}</p>
              </div>
            )}

            {/* Blocks */}
            <div className="w-full space-y-3 mt-2 pb-10">
              {profile.blocks.filter(b => b.active).map((block, index) => (
                <div 
                  key={block.id} 
                  className="w-full animate-in slide-in-from-bottom-4 fade-in duration-500 fill-mode-backwards"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {block.type === "header" && (
                    <h3 className={`font-bold text-base mt-4 mb-2 opacity-90 ${
                      profile.layout === "center" ? "text-center" : "text-left"
                    }`}>
                      {block.content}
                    </h3>
                  )}
                  
                  {block.type === "text" && (
                    <div className={`bg-white/10 backdrop-blur-md p-4 ${SHADOW_OPTIONS.find(s => s.value === profile.shadow)?.class} border border-white/5 text-sm text-slate-200 ${ROUNDED_OPTIONS.find(r => r.value === profile.rounded)?.class}`}>
                      {block.content}
                    </div>
                  )}
                  
                  {block.type === "link" && (
                    <a 
                      href={block.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`block w-full py-4 px-6 bg-white/90 hover:bg-white text-slate-900 font-bold text-center shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300 text-sm ${ROUNDED_OPTIONS.find(r => r.value === profile.rounded)?.class} ${SHADOW_OPTIONS.find(s => s.value === profile.shadow)?.class}`}
                    >
                      {block.content}
                    </a>
                  )}

                  {block.type === "social" && (
                    <a 
                      href={block.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-3 w-full py-3.5 px-4 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/10 text-white font-medium transition-all duration-300 text-sm ${ROUNDED_OPTIONS.find(r => r.value === profile.rounded)?.class}`}
                    >
                      {block.icon === "instagram" && <Instagram className="w-4 h-4" />}
                      {block.icon === "twitter" && <Twitter className="w-4 h-4" />}
                      {!block.icon && <Globe className="w-4 h-4" />}
                      {block.content}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Footer Brand */}
            <div className="mt-auto w-full text-center pb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 bg-black/20 px-3 py-1 rounded-full">
                Pesen.id
              </span>
            </div>

          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full"></div>
      </div>

      {/* Preview Stats */}
      <div className="mt-4 flex justify-center gap-4 text-xs text-slate-500">
        <span>👁️ 1.2k views</span>
        <span>🔗 {profile.blocks.filter(b => b.active && b.type === 'link').length} links</span>
      </div>
    </div>
  );
}