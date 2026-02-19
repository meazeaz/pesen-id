"use client";

import { useState, useEffect } from "react";
import { 
  User, Link as LinkIcon, Palette, Save, Smartphone, 
  Type, Layout, Image as ImageIcon, Plus, Trash2, 
  GripVertical, Eye, Check, Sparkles, MoveRight,
  Moon, Sun, Copy, Twitter, Instagram, Globe
} from "lucide-react";

// --- TIPE DATA ---
type BlockType = "header" | "link" | "text" | "social";

type Block = {
  id: string;
  type: BlockType;
  content: string;
  url?: string;
  icon?: string;
  active: boolean;
};

type ProfileState = {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  layout: "center" | "left" | "hero" | "compact";
  themeId: string;
  bgType: "gradient" | "solid"; // Image dihapus
  bgValue: string;
  font: string;
  rounded: "sm" | "md" | "lg" | "full";
  shadow: "none" | "sm" | "md" | "lg";
  blocks: Block[];
};

// --- DATA PRESETS ---
const LAYOUTS = [
  { id: "center", name: "Classic Center", icon: "M4 6h16M4 12h16M4 18h7", desc: "Konten rata tengah klasik" },
  { id: "left", name: "Modern Left", icon: "M4 6h16M4 12h16M4 18h7", desc: "Konten rata kiri modern" },
  { id: "hero", name: "Hero Banner", icon: "M4 6h16M4 12h16M4 18h7", desc: "Dengan banner hero di atas" },
  { id: "compact", name: "Compact", icon: "M4 6h16M4 12h16M4 18h7", desc: "Tampilan ringkas & padat" },
];

const GRADIENTS = [
  { name: "Ocean", value: "bg-gradient-to-br from-cyan-500 to-blue-600" },
  { name: "Sunset", value: "bg-gradient-to-br from-orange-500 to-pink-600" },
  { name: "Forest", value: "bg-gradient-to-br from-emerald-500 to-teal-700" },
  { name: "Midnight", value: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" },
  { name: "Berry", value: "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500" },
  { name: "Deep Sea", value: "bg-gradient-to-t from-gray-900 to-blue-900" },
  { name: "Purple Haze", value: "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500" },
  { name: "Mint", value: "bg-gradient-to-br from-emerald-400 to-cyan-400" },
];

const SOLID_COLORS = [
  { name: "Hitam", value: "bg-black" },
  { name: "Abu Tua", value: "bg-zinc-900" },
  { name: "Navy", value: "bg-slate-900" },
  { name: "Ungu Tua", value: "bg-purple-950" },
  { name: "Hijau Tua", value: "bg-emerald-950" },
  { name: "Merah Tua", value: "bg-rose-950" },
];

// Font diperbanyak (Pastikan font sudah di-load di layout global jika ingin terlihat bedanya)
const FONTS = [
  { name: "Inter (Default)", value: "font-sans" },
  { name: "Serif (Classic)", value: "font-serif" },
  { name: "Mono (Coding)", value: "font-mono" },
  { name: "Poppins (Modern)", value: "font-[Poppins]" }, 
  { name: "Playfair (Elegant)", value: "font-[Playfair_Display]" },
  { name: "Oswald (Bold)", value: "font-[Oswald]" },
];

const ROUNDED_OPTIONS = [
  { name: "Kecil", value: "sm", class: "rounded-lg" },
  { name: "Sedang", value: "md", class: "rounded-xl" },
  { name: "Besar", value: "lg", class: "rounded-2xl" },
  { name: "Penuh", value: "full", class: "rounded-full" },
];

const SHADOW_OPTIONS = [
  { name: "Tanpa", value: "none", class: "" },
  { name: "Ringan", value: "sm", class: "shadow-md" },
  { name: "Sedang", value: "md", class: "shadow-xl" },
  { name: "Berat", value: "lg", class: "shadow-2xl" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "appearance" | "advanced">("profile");
  const [subTab, setSubTab] = useState<"layout" | "background" | "style">("layout");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- STATE UTAMA ---
  const [profile, setProfile] = useState<ProfileState>({
    name: "Toko Sembako Jaya",
    username: "sembakojaya",
    bio: "Pusat grosir sembako termurah dan terlengkap. Pengiriman seluruh Indonesia 📦",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=TS&backgroundColor=0ea5e9",
    layout: "center",
    themeId: "custom",
    bgType: "gradient",
    bgValue: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
    font: "font-sans",
    rounded: "lg",
    shadow: "md",
    blocks: [
      { id: "1", type: "header", content: "🔥 Promo Hari Ini", active: true },
      { id: "2", type: "link", content: "Katalog Beras Premium", url: "https://example.com/beras", active: true },
      { id: "3", type: "link", content: "Paket Hemat Sembako", url: "https://example.com/paket", active: true },
      { id: "4", type: "text", content: "Buka Senin - Sabtu (08.00 - 17.00 WIB)", active: true },
      { id: "5", type: "social", content: "Instagram", url: "https://instagram.com/sembakojaya", icon: "instagram", active: false },
    ]
  });

  // --- ACTIONS ---
  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: type === "header" ? "Judul Baru" : 
               type === "link" ? "Link Baru" : 
               type === "social" ? "Media Sosial" : "Teks Baru",
      active: true,
      url: type === "link" ? "https://" : 
           type === "social" ? "https://" : undefined,
      icon: type === "social" ? "instagram" : undefined
    };
    setProfile({ ...profile, blocks: [...profile.blocks, newBlock] });
  };

  const removeBlock = (id: string) => {
    setProfile({ ...profile, blocks: profile.blocks.filter(b => b.id !== id) });
  };

  const updateBlock = (id: string, field: keyof Block, value: string) => {
    setProfile({
      ...profile,
      blocks: profile.blocks.map(b => b.id === id ? { ...b, [field]: value } : b)
    });
  };

  const toggleBlockActive = (id: string) => {
    setProfile({
      ...profile,
      blocks: profile.blocks.map(b => b.id === id ? { ...b, active: !b.active } : b)
    });
  };

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 2000);
    }, 1000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://pesen.id/${profile.username}`);
    setShowCopySuccess(true);
    setTimeout(() => setShowCopySuccess(false), 2000);
  };

  if (!mounted) return null;

  // --- KOMPONEN LIVE PREVIEW (HP) ---
  const PhonePreview = () => (
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
              <span className="absolute -top-8 right-0 bg-black/90 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
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
      <div className="relative mx-auto border-gray-900 bg-black border-[12px] rounded-[3rem] h-[650px] w-[320px] shadow-2xl ring-1 ring-white/10 overflow-hidden">
        
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
              <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/60 to-transparent z-0"></div>
            )}

            {/* Avatar dengan efek sesuai layout */}
            <div className={`relative z-10 transition-all duration-500 ${
              profile.layout === "hero" ? "mt-4" : 
              profile.layout === "compact" ? "flex items-center gap-4 w-full" : ""
            }`}>
              {profile.layout === "compact" ? (
                <>
                  <img 
                    src={profile.avatar} 
                    className={`rounded-${profile.rounded} border-4 border-white/20 shadow-xl object-cover bg-slate-800 w-16 h-16`} 
                  />
                  <div className="flex-1 text-left">
                    <h1 className="text-lg font-bold tracking-tight">{profile.name}</h1>
                    <p className="text-xs opacity-70 font-medium">@{profile.username}</p>
                  </div>
                </>
              ) : (
                <img 
                  src={profile.avatar} 
                  className={`rounded-${profile.rounded} border-4 border-white/20 shadow-xl object-cover bg-slate-800 transition-all duration-500
                  ${profile.layout === "hero" ? "w-28 h-28" : "w-24 h-24"}`} 
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

  return (
    // Menggunakan bg-slate-50 untuk light, dan bg-[#09090b] untuk dark
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-slate-200 font-sans transition-colors duration-300">
      
      {/* Header Page */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Pengaturan Profil <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-500" />
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              pesen.id/{profile.username}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full text-sm transition-all flex items-center gap-2">
              <Eye className="w-4 h-4" /> Preview
            </button>
            <button 
              onClick={handleSave} 
              disabled={isLoading} 
              className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-black hover:opacity-90 font-bold rounded-full text-sm transition-all flex items-center gap-2 disabled:opacity-70 shadow-lg"
            >
              {isLoading ? "Processing..." : <><Save className="w-4 h-4" /> Simpan</>}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* --- KOLOM KIRI: EDITOR (7/12) --- */}
        <div className="lg:col-span-7 space-y-8 pb-20">
           
          {/* Navigation Tabs (Light/Dark Compatible) */}
          <div className="bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-2xl p-1 flex relative">
            <div 
              className={`absolute top-1 bottom-1 w-1/3 bg-white dark:bg-white/10 rounded-xl shadow-sm transition-all duration-300 ease-out ${
                activeTab === 'profile' ? 'left-1' : 
                activeTab === 'appearance' ? 'left-[calc(33.33%-4px)]' : 
                'left-[calc(66.66%-8px)]'
              }`}
            />
            <button 
              onClick={() => setActiveTab("profile")} 
              className={`flex-1 py-3 text-sm font-bold rounded-xl flex items-center justify-center gap-2 relative z-10 transition-colors ${
                activeTab === "profile" ? "text-slate-900 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <User className="w-4 h-4" /> Profil
            </button>
            <button 
              onClick={() => setActiveTab("appearance")} 
              className={`flex-1 py-3 text-sm font-bold rounded-xl flex items-center justify-center gap-2 relative z-10 transition-colors ${
                activeTab === "appearance" ? "text-slate-900 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <Palette className="w-4 h-4" /> Tampilan
            </button>
            <button 
              onClick={() => setActiveTab("advanced")} 
              className={`flex-1 py-3 text-sm font-bold rounded-xl flex items-center justify-center gap-2 relative z-10 transition-colors ${
                activeTab === "advanced" ? "text-slate-900 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <Layout className="w-4 h-4" /> Lanjutan
            </button>
          </div>

          {/* --- TAB: PROFIL --- */}
          {activeTab === "profile" && (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
              
              {/* 1. Basic Info Card */}
              <div className="bg-white dark:bg-[#121214] border border-slate-200 dark:border-white/5 rounded-3xl p-6 space-y-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <User className="w-4 h-4" /> Informasi Utama
                </h3>
                
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  {/* Avatar Uploader */}
                  <div className="relative group cursor-pointer mx-auto sm:mx-0">
                    <div className={`w-24 h-24 overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-700 group-hover:border-purple-500 transition-all ${ROUNDED_OPTIONS.find(r => r.value === profile.rounded)?.class}`}>
                      <img src={profile.avatar} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black/60 p-2 rounded-full backdrop-blur-sm">
                        <ImageIcon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Inputs */}
                  <div className="flex-1 space-y-4 w-full">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500 ml-1">Username</label>
                      <div className="flex items-center gap-2 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus-within:border-purple-500 transition-all">
                        <span className="text-slate-400 text-sm">@</span>
                        <input 
                          type="text" 
                          value={profile.username} 
                          onChange={e => setProfile({...profile, username: e.target.value})}
                          className="w-full bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none"
                          placeholder="username"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500 ml-1">Nama Tampilan</label>
                      <input 
                        type="text" 
                        value={profile.name} 
                        onChange={e => setProfile({...profile, name: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                        placeholder="Nama Anda"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500 ml-1">Bio</label>
                      <textarea 
                        rows={3}
                        value={profile.bio} 
                        onChange={e => setProfile({...profile, bio: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all resize-none"
                        placeholder="Tulis bio Anda..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Block Builder */}
              <div className="space-y-4">
                <div className="flex justify-between items-end px-1">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                      <Layout className="w-5 h-5" /> Susunan Konten
                    </h3>
                    <p className="text-xs text-slate-500">Tambah dan atur urutan kontenmu.</p>
                  </div>
                  
                  {/* Quick Add Buttons */}
                  <div className="flex gap-2 bg-slate-200 dark:bg-white/5 p-1 rounded-lg border border-slate-300 dark:border-white/5">
                    {[
                      { id: 'header', icon: Type, label: 'Judul' },
                      { id: 'link', icon: LinkIcon, label: 'Link' },
                      { id: 'text', icon: Layout, label: 'Teks' },
                      { id: 'social', icon: Globe, label: 'Sosial' }
                    ].map((item) => (
                      <button 
                        key={item.id}
                        onClick={() => addBlock(item.id as BlockType)}
                        className="px-3 py-1.5 hover:bg-white dark:hover:bg-white/10 rounded-md text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-all active:scale-95"
                      >
                        <item.icon className="w-3.5 h-3.5" /> {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {profile.blocks.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-2xl bg-slate-50 dark:bg-white/5">
                      <p className="text-slate-500 text-sm">Belum ada konten.</p>
                      <button onClick={() => addBlock('link')} className="mt-3 text-purple-600 dark:text-purple-400 text-xs font-bold hover:underline">
                        + Tambah Link Pertama
                      </button>
                    </div>
                  )}

                  {profile.blocks.map((block, index) => (
                    <div 
                      key={block.id} 
                      className={`group relative bg-white dark:bg-[#18181b] border ${
                        block.active ? 'border-slate-200 dark:border-white/10' : 'border-slate-100 dark:border-white/5 opacity-50'
                      } hover:border-purple-500/30 rounded-xl p-4 flex gap-4 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 animate-in slide-in-from-bottom-2`}
                    >
                      {/* Drag Handle */}
                      <div className="self-center text-slate-400 dark:text-slate-700 group-hover:text-slate-600 dark:group-hover:text-slate-400 cursor-grab active:cursor-grabbing">
                        <GripVertical className="w-5 h-5" />
                      </div>

                      {/* Content Inputs */}
                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider 
                              ${block.type === 'link' ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' : 
                                block.type === 'header' ? 'bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400' : 
                                block.type === 'social' ? 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400' :
                                'bg-slate-100 text-slate-600 dark:bg-slate-700/30 dark:text-slate-400'}`}>
                              {block.type}
                            </span>
                            <button
                              onClick={() => toggleBlockActive(block.id)}
                              className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                                block.active 
                                  ? 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400' 
                                  : 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400'
                              }`}
                            >
                              {block.active ? 'Aktif' : 'Nonaktif'}
                            </button>
                          </div>
                          <button 
                            onClick={() => removeBlock(block.id)} 
                            className="text-slate-400 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-2">
                          <input 
                            type="text" 
                            value={block.content}
                            onChange={e => updateBlock(block.id, 'content', e.target.value)}
                            className="w-full bg-transparent text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none border-b border-transparent focus:border-purple-500 transition-colors pb-1"
                            placeholder="Label..."
                          />
                          
                          {(block.type === 'link' || block.type === 'social') && (
                            <div className="flex items-center gap-2 bg-slate-50 dark:bg-black/30 rounded-lg px-3 py-2 border border-slate-200 dark:border-white/5 focus-within:border-purple-500/50 transition-colors">
                              <LinkIcon className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                              <input 
                                type="text" 
                                value={block.url}
                                onChange={e => updateBlock(block.id, 'url', e.target.value)}
                                className="w-full bg-transparent text-xs text-slate-600 dark:text-slate-300 focus:outline-none"
                                placeholder="https://yourlink.com"
                              />
                            </div>
                          )}

                          {block.type === 'social' && (
                            <div className="flex gap-2 mt-2">
                              {['instagram', 'twitter', 'facebook', 'tiktok'].map(icon => (
                                <button
                                  key={icon}
                                  onClick={() => updateBlock(block.id, 'icon', icon)}
                                  className={`p-2 rounded-lg border ${
                                    block.icon === icon 
                                      ? 'bg-purple-100 border-purple-500 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400' 
                                      : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-500'
                                  } transition-colors`}
                                >
                                  {icon === 'instagram' && <Instagram className="w-4 h-4" />}
                                  {icon === 'twitter' && <Twitter className="w-4 h-4" />}
                                  {icon === 'facebook' && <span className="text-xs">fb</span>}
                                  {icon === 'tiktok' && <span className="text-xs">tt</span>}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* --- TAB: TAMPILAN --- */}
          {activeTab === "appearance" && (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
              
              {/* Sub Tabs */}
              <div className="flex gap-2 border-b border-slate-200 dark:border-white/10 pb-1">
                {[
                  { id: "layout", label: "Layout", icon: Layout },
                  { id: "background", label: "Background", icon: Palette },
                  { id: "style", label: "Gaya", icon: Sparkles }
                ].map((tab) => (
                  <button 
                    key={tab.id}
                    onClick={() => setSubTab(tab.id as any)}
                    className={`text-xs font-bold uppercase tracking-wider px-4 py-2 border-b-2 transition-all flex items-center gap-2 ${
                      subTab === tab.id ? "border-purple-600 dark:border-purple-500 text-purple-600 dark:text-white" : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                    }`}
                  >
                    <tab.icon className="w-3 h-3" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* 1. Layout Selector */}
              {subTab === "layout" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {LAYOUTS.map((layout) => (
                    <button
                      key={layout.id}
                      onClick={() => setProfile({...profile, layout: layout.id as any})}
                      className={`group relative overflow-hidden bg-white dark:bg-[#121214] border-2 rounded-2xl p-4 text-left hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 
                      ${profile.layout === layout.id ? "border-purple-600 dark:border-purple-500 bg-purple-50 dark:bg-[#1a1a20]" : "border-slate-200 dark:border-white/5"}`}
                    >
                      <div className="mb-3 opacity-50 group-hover:opacity-100 transition-opacity">
                        <Layout className="w-6 h-6 text-slate-400 dark:text-slate-300" />
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">{layout.name}</h4>
                      <p className="text-xs text-slate-500">{layout.desc}</p>
                      
                      {profile.layout === layout.id && (
                        <div className="absolute top-2 right-2 bg-purple-600 dark:bg-purple-500 rounded-full p-1 shadow-lg animate-in zoom-in">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* 2. Background Selector */}
              {subTab === "background" && (
                <div className="space-y-6">
                  {/* Background Type (Image removed) */}
                  <div className="bg-white dark:bg-[#121214] border border-slate-200 dark:border-white/5 rounded-3xl p-6">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm">Tipe Background</h3>
                    <div className="flex gap-3">
                      {[
                        { id: "gradient", label: "Gradient", icon: Palette },
                        { id: "solid", label: "Solid", icon: Sun },
                      ].map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setProfile({...profile, bgType: type.id as any})}
                          className={`flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                            profile.bgType === type.id
                              ? 'bg-purple-100 border-purple-500 text-purple-700 dark:bg-purple-500/20 dark:text-white'
                              : 'border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                          }`}
                        >
                          <type.icon className="w-4 h-4" />
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Gradient Presets */}
                  {profile.bgType === "gradient" && (
                    <div className="bg-white dark:bg-[#121214] border border-slate-200 dark:border-white/5 rounded-3xl p-6">
                      <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm">Gradient Presets</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {GRADIENTS.map((grad, idx) => (
                          <button 
                            key={idx} 
                            onClick={() => setProfile({...profile, bgValue: grad.value})}
                            className={`h-24 rounded-2xl cursor-pointer relative overflow-hidden transition-all duration-300 group hover:scale-[1.03] active:scale-95 ${grad.value} ring-offset-2 ring-offset-white dark:ring-offset-[#121214] ring-2 ${profile.bgValue === grad.value ? "ring-purple-600 dark:ring-purple-500" : "ring-transparent"}`}
                          >
                            <span className="absolute bottom-2 left-3 text-[10px] font-bold text-white/90 uppercase tracking-widest shadow-sm">
                              {grad.name}
                            </span>
                            {profile.bgValue === grad.value && (
                              <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-md p-1.5 rounded-full">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Solid Colors */}
                  {profile.bgType === "solid" && (
                    <div className="bg-white dark:bg-[#121214] border border-slate-200 dark:border-white/5 rounded-3xl p-6">
                      <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm">Warna Solid</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {SOLID_COLORS.map((color, idx) => (
                          <button 
                            key={idx} 
                            onClick={() => setProfile({...profile, bgValue: color.value})}
                            className={`h-24 rounded-2xl cursor-pointer relative overflow-hidden transition-all duration-300 ${color.value} ring-offset-2 ring-offset-white dark:ring-offset-[#121214] ring-2 ${profile.bgValue === color.value ? "ring-purple-600 dark:ring-purple-500" : "ring-transparent"}`}
                          >
                            <span className="absolute bottom-2 left-3 text-[10px] font-bold text-white/90 uppercase tracking-widest">
                              {color.name}
                            </span>
                            {profile.bgValue === color.value && (
                              <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-md p-1.5 rounded-full">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 3. Style Options */}
              {subTab === "style" && (
                <div className="space-y-6">
                  {/* Font Selector */}
                  <div className="bg-white dark:bg-[#121214] border border-slate-200 dark:border-white/5 rounded-3xl p-6">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm flex items-center gap-2">
                      <Type className="w-4 h-4" /> Font
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {FONTS.map((font) => (
                        <button
                          key={font.value}
                          onClick={() => setProfile({...profile, font: font.value})}
                          className={`py-3 px-2 rounded-xl border text-center transition-all ${
                            profile.font === font.value
                              ? 'bg-purple-100 border-purple-500 text-purple-700 dark:bg-purple-500/20 dark:text-white'
                              : 'border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400'
                          } ${font.value}`}
                        >
                          <span className="text-sm">{font.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rounded Options */}
                  <div className="bg-white dark:bg-[#121214] border border-slate-200 dark:border-white/5 rounded-3xl p-6">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm">Sudut Membulat</h3>
                    <div className="grid grid-cols-4 gap-3">
                      {ROUNDED_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setProfile({...profile, rounded: opt.value as any})}
                          className={`py-3 px-2 rounded-xl border text-center transition-all ${
                            profile.rounded === opt.value
                              ? 'bg-purple-100 border-purple-500 text-purple-700 dark:bg-purple-500/20 dark:text-white'
                              : 'border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <span className="text-xs">{opt.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Shadow Options */}
                  <div className="bg-white dark:bg-[#121214] border border-slate-200 dark:border-white/5 rounded-3xl p-6">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm">Bayangan</h3>
                    <div className="grid grid-cols-4 gap-3">
                      {SHADOW_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setProfile({...profile, shadow: opt.value as any})}
                          className={`py-3 px-2 rounded-xl border text-center transition-all ${
                            profile.shadow === opt.value
                              ? 'bg-purple-100 border-purple-500 text-purple-700 dark:bg-purple-500/20 dark:text-white'
                              : 'border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <span className="text-xs">{opt.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* --- TAB: LANJUTAN --- */}
          {activeTab === "advanced" && (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
              
              {/* SEO Settings */}
              <div className="bg-white dark:bg-[#121214] border border-slate-200 dark:border-white/5 rounded-3xl p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Pengaturan SEO
                </h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 ml-1">Meta Title</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-purple-500 outline-none transition-all"
                      placeholder="Judul untuk SEO"
                      defaultValue={profile.name}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 ml-1">Meta Description</label>
                    <textarea 
                      rows={2}
                      className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-purple-500 outline-none transition-all resize-none"
                      placeholder="Deskripsi untuk SEO"
                      defaultValue={profile.bio}
                    />
                  </div>
                </div>
              </div>

              {/* Analytics */}
              <div className="bg-white dark:bg-[#121214] border border-slate-200 dark:border-white/5 rounded-3xl p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm flex items-center gap-2">
                  <Eye className="w-4 h-4" /> Analytics
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Total Views</span>
                    <span className="font-bold text-slate-900 dark:text-white">1,234</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Unique Visitors</span>
                    <span className="font-bold text-slate-900 dark:text-white">892</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Click Rate</span>
                    <span className="font-bold text-slate-900 dark:text-white">24.5%</span>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-500/20 rounded-3xl p-6">
                <h3 className="font-bold text-red-600 dark:text-red-400 mb-4 text-sm flex items-center gap-2">
                  <Trash2 className="w-4 h-4" /> Zona Berbahaya
                </h3>
                <div className="space-y-3">
                  <button className="w-full py-3 px-4 bg-white dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 border border-red-200 dark:border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium transition-colors">
                    Hapus Profil
                  </button>
                  <button className="w-full py-3 px-4 bg-transparent hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-slate-500 dark:text-slate-400 text-sm font-medium transition-colors">
                    Reset Pengaturan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* --- KOLOM KANAN: PREVIEW (5/12) --- */}
        <div className="hidden lg:block lg:col-span-5">
          <PhonePreview />
        </div>

      </div>
    </div>
  );
}