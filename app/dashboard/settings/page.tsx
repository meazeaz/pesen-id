"use client";

import { useState, useEffect, useTransition } from "react";
import { useSession } from "next-auth/react"; 
import { User, Palette, Save, Layout, CreditCard, ShieldCheck, Sparkles } from "lucide-react";

// Server Actions
import { saveProfile, addBankAccount, deleteBankAccount, getUserSettings } from "@/app/actions/settings";
import SecuritySettings from "@/components/dashboard/SecuritySettings"; 

// Import Komponen & Tipe Data
import { ProfileState, BankAccount, BlockType, Block } from "@/components/settings/constants";
import PhonePreview from "@/components/settings/PhonePreview";
import ProfileTab from "@/components/settings/ProfileTab";
import AppearanceTab from "@/components/settings/AppearanceTab";
import AdvancedTab from "@/components/settings/AdvancedTab";
import PaymentTab from "@/components/settings/PaymentTab";

// Tipe untuk Tab Navigasi agar TS tidak marah
type TabType = "profile" | "appearance" | "advanced" | "payment" | "security";

export default function SettingsPage() {
  const { data: session } = useSession(); 

  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);


  useEffect(() => { 
    // Kita bungkus dengan setTimeout agar berjalan di latar belakang (Asynchronous)
    // sehingga tidak memicu protes dari React ESLint
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // --- STATE UTAMA ---
  const [profile, setProfile] = useState<ProfileState>({
    name: "Memuat...", username: "memuat", bio: "", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Load&backgroundColor=0ea5e9",
    layout: "center", themeId: "custom", bgType: "gradient", bgValue: "bg-slate-900", font: "font-sans", rounded: "lg", shadow: "md", blocks: []
  });

  const [banks, setBanks] = useState<BankAccount[]>([]);
  const [newBank, setNewBank] = useState({ bankName: "BCA", accountNumber: "", holderName: "" });

  // --- AMBIL DATA DARI DATABASE ---
  useEffect(() => {
    if (session?.user?.email) {
      getUserSettings(session.user.email).then((data) => {
        if (data) {
          
          // 👇 INI DIA SARINGAN PINTARNYA
          // Jika nama kosong, atau panjangnya lebih dari 25 karakter tanpa spasi (pasti itu kode acak),
          // maka otomatis gunakan username sebagai ganti namanya!
          const validName = (data.name && data.name.length > 25 && !data.name.includes(" ")) 
            ? data.username 
            : (data.name || data.username);

          setProfile((prev: ProfileState) => ({
            ...prev,
            name: validName, // 👈 Masukkan nama yang sudah disaring ke sini
            username: data.username, 
            bio: data.bio,
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${data.username}&backgroundColor=8b5cf6`,
            
            layout: (data.layout as ProfileState["layout"]) || "center", 
            bgType: (data.bgType as ProfileState["bgType"]) || "gradient",
            bgValue: data.bgValue || "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
            font: data.font || "font-sans", 
            rounded: (data.rounded as ProfileState["rounded"]) || "lg", 
            shadow: (data.shadow as ProfileState["shadow"]) || "md",
            blocks: data.blocks?.length > 0 ? data.blocks : [
              { id: "1", type: "header", content: "👋 Halo Semua!", active: true },
              { id: "2", type: "link", content: "Link Pertama Saya", url: "https://", active: true },
            ]
          }));
          setBanks(data.banks);
        }
      });
    }
  }, [session?.user?.email]);

  // --- FUNGSI BANTUAN UNTUK BLOCKS (Dengan Tipe Data Ketat) ---
  const addBlock = (type: BlockType) => {
    const newBlock: Block = { id: Math.random().toString(36).substr(2, 9), type, content: "Konten Baru", active: true };
    setProfile({ ...profile, blocks: [...profile.blocks, newBlock] });
  };
  const removeBlock = (id: string) => {
    setProfile({ ...profile, blocks: profile.blocks.filter((b: Block) => b.id !== id) });
  };
  const updateBlock = (id: string, field: keyof Block, value: string) => {
    setProfile({ ...profile, blocks: profile.blocks.map((b: Block) => b.id === id ? { ...b, [field]: value } : b) });
  };
  const toggleBlockActive = (id: string) => {
    setProfile({ ...profile, blocks: profile.blocks.map((b: Block) => b.id === id ? { ...b, active: !b.active } : b) });
  };

  // --- FUNGSI SIMPAN DATABASE ---
  const handleSaveAll = () => {
    if (!session?.user?.email) return;
    startTransition(async () => {
      const res = await saveProfile({ email: session.user?.email as string, ...profile });
      if (res.success) alert("✅ Pengaturan berhasil disimpan!");
      else alert("❌ Gagal menyimpan profil.");
    });
  };

  const handleAddBank = (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email) return;
    startTransition(async () => {
      const res = await addBankAccount({ ...newBank, email: session.user?.email as string });
      if (res.success) {
        setBanks([...banks, { id: Date.now().toString(), ...newBank }]);
        setNewBank({ bankName: "BCA", accountNumber: "", holderName: "" });
        alert("💳 Rekening ditambahkan!");
      }
    });
  };

  const handleDeleteBank = (id: string) => {
    if (confirm("Hapus rekening ini?")) {
      startTransition(async () => {
        const res = await deleteBankAccount(id);
        if (res.success) setBanks(banks.filter((b: BankAccount) => b.id !== id));
      });
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-slate-200">
      
      {/* HEADER SIMPAN */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">Pengaturan Profil <Sparkles className="w-4 h-4 text-purple-600" /></h1>
            <p className="text-xs text-slate-500 mt-1">pesen.id/{profile.username}</p>
          </div>
          <button onClick={handleSaveAll} disabled={isPending} className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-full text-sm flex gap-2">
            {isPending ? "Menyimpan..." : <><Save className="w-4 h-4" /> Simpan</>}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* KOLOM KIRI (NAVIGASI & KONTEN TAB) */}
        <div className="lg:col-span-7 space-y-8 pb-20">
          
          {/* Menu Tab */}
          <div className="bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-2xl p-1 flex overflow-x-auto no-scrollbar">
            {[
              { id: "profile", icon: User, label: "Profil" },
              { id: "appearance", icon: Palette, label: "Tampilan" },
              { id: "advanced", icon: Layout, label: "Lanjutan" },
              { id: "payment", icon: CreditCard, label: "Pembayaran" },
  
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)} 
                className={`flex-1 min-w-max px-4 py-3 text-sm font-bold rounded-xl flex items-center justify-center gap-2 ${activeTab === tab.id ? "bg-white dark:bg-white/10 shadow-sm text-slate-900 dark:text-white" : "text-slate-500"}`}
              >
                <tab.icon className="w-4 h-4" /> <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Render Komponen Sesuai Tab yang Dipilih */}
          {activeTab === "profile" && <ProfileTab profile={profile} setProfile={setProfile} addBlock={addBlock} removeBlock={removeBlock} updateBlock={updateBlock} toggleBlockActive={toggleBlockActive} />}
          {activeTab === "appearance" && <AppearanceTab profile={profile} setProfile={setProfile} />}
          {activeTab === "advanced" && <AdvancedTab profile={profile} />}
          {activeTab === "payment" && <PaymentTab banks={banks} newBank={newBank} setNewBank={setNewBank} handleAddBank={handleAddBank} handleDeleteBank={handleDeleteBank} isPending={isPending} />}
          {activeTab === "security" && <SecuritySettings />}

        </div>

        {/* KOLOM KANAN (PREVIEW HP) */}
        <div className="hidden lg:block lg:col-span-5">
          <PhonePreview profile={profile} />
        </div>

      </div>
    </div>
  );
}