export type BlockType = "header" | "link" | "text" | "social" | "youtube" | "divider";

export type Block = {
  id: string;
  type: BlockType;
  content: string;
  url?: string;
  icon?: string;
  active: boolean;
};

export type ProfileState = {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  layout: "center" | "left" | "hero" | "compact";
  themeId: string;
  bgType: "gradient" | "solid"; 
  bgValue: string;
  font: string;
  rounded: "sm" | "md" | "lg" | "full";
  shadow: "none" | "sm" | "md" | "lg";
  blocks: Block[];
};

export type BankAccount = {
  id: string;
  bankName: string;
  accountNumber: string;
  holderName: string;
};

export const LAYOUTS = [
  { id: "center", name: "Classic Center", desc: "Konten rata tengah klasik" },
  { id: "left", name: "Modern Left", desc: "Konten rata kiri modern" },
  { id: "hero", name: "Hero Banner", desc: "Dengan banner hero di atas" },
  { id: "compact", name: "Compact", desc: "Tampilan ringkas & padat" },
];

export const GRADIENTS = [
  { name: "Ocean", value: "bg-gradient-to-br from-cyan-500 to-blue-600" },
  { name: "Sunset", value: "bg-gradient-to-br from-orange-500 to-pink-600" },
  { name: "Forest", value: "bg-gradient-to-br from-emerald-500 to-teal-700" },
  { name: "Midnight", value: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" },
  { name: "Berry", value: "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500" },
  { name: "Deep Sea", value: "bg-gradient-to-t from-gray-900 to-blue-900" },
  { name: "Purple Haze", value: "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500" },
  { name: "Mint", value: "bg-gradient-to-br from-emerald-400 to-cyan-400" },
];

export const SOLID_COLORS = [
  { name: "Hitam", value: "bg-black" },
  { name: "Abu Tua", value: "bg-zinc-900" },
  { name: "Navy", value: "bg-slate-900" },
  { name: "Ungu Tua", value: "bg-purple-950" },
  { name: "Hijau Tua", value: "bg-emerald-950" },
  { name: "Merah Tua", value: "bg-rose-950" },
];

export const FONTS = [
  { name: "Inter (Default)", value: "font-sans" },
  { name: "Serif (Classic)", value: "font-serif" },
  { name: "Mono (Coding)", value: "font-mono" },
  { name: "Poppins (Modern)", value: "font-[Poppins]" }, 
  { name: "Playfair (Elegant)", value: "font-[Playfair_Display]" },
  { name: "Oswald (Bold)", value: "font-[Oswald]" },
];

export const ROUNDED_OPTIONS = [
  { name: "Kecil", value: "sm", class: "rounded-lg" },
  { name: "Sedang", value: "md", class: "rounded-xl" },
  { name: "Besar", value: "lg", class: "rounded-2xl" },
  { name: "Penuh", value: "full", class: "rounded-full" },
];

export const SHADOW_OPTIONS = [
  { name: "Tanpa", value: "none", class: "" },
  { name: "Ringan", value: "sm", class: "shadow-md" },
  { name: "Sedang", value: "md", class: "shadow-xl" },
  { name: "Berat", value: "lg", class: "shadow-2xl" },
];