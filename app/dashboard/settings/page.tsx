"use client";

import { useState, useEffect, useTransition } from "react";
import { useSession } from "next-auth/react"; 
import { User, Palette, Save, Layout, CreditCard, Sparkles } from "lucide-react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

import { saveProfile, addBankAccount, deleteBankAccount, getUserSettings } from "@/app/actions/settings";
import { ProfileState, BankAccount, BlockType, Block } from "@/components/settings/constants";

import PhonePreview from "@/components/settings/PhonePreview";
import ProfileTab from "@/components/settings/ProfileTab";
import AppearanceTab from "@/components/settings/AppearanceTab";
import AdvancedTab from "@/components/settings/AdvancedTab";
import PaymentTab from "@/components/settings/PaymentTab";

// Tab 'security' dihapus dari daftar tipe
type TabType = "profile" | "appearance" | "advanced" | "payment";

export default function SettingsPage() {
  const { data: session } = useSession(); 
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const [profile, setProfile] = useState<ProfileState>({
    name: "Memuat...", username: "memuat", bio: "", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Load",
    layout: "center", themeId: "custom", bgType: "gradient", bgValue: "bg-slate-900", font: "font-sans", rounded: "lg", shadow: "md", blocks: []
  });

  const [banks, setBanks] = useState<BankAccount[]>([]);
  const [newBank, setNewBank] = useState({ bankName: "BCA", accountNumber: "", holderName: "" });

  useEffect(() => {
    if (session?.user?.email) {
      getUserSettings(session.user.email).then((data) => {
        if (data) {
          setProfile((prev: ProfileState) => ({
            ...prev,
            name: data.name || data.username,
            username: data.username, 
            bio: data.bio,
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${data.username}&backgroundColor=8b5cf6`,
            layout: (data.layout as ProfileState["layout"]) || "center", 
            bgType: (data.bgType as ProfileState["bgType"]) || "gradient",
            bgValue: data.bgValue || "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
            font: data.font || "font-sans", 
            rounded: (data.rounded as ProfileState["rounded"]) || "lg", 
            shadow: (data.shadow as ProfileState["shadow"]) || "md",
            blocks: data.blocks || []
          }));
          setBanks(data.banks);
        }
      });
    }
  }, [session?.user?.email]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(profile.blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setProfile({ ...profile, blocks: items });
  };

  const addBlock = (type: BlockType) => {
    const newBlock: Block = { 
      id: `block-${Date.now()}`, 
      type, 
      content: type === "header" ? "Judul Baru" : "Teks Baru", 
      active: true,
      url: (type === "link" || type === "social") ? "https://" : undefined
    };
    setProfile({ ...profile, blocks: [newBlock, ...profile.blocks] });
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-slate-100 font-sans">
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-lg sm:text-xl font-bold flex items-center gap-2">
              Edit Toko <Sparkles className="w-4 h-4 text-purple-600" />
            </h1>
            <p className="text-[10px] text-slate-500 font-mono">pesen.id/{profile.username}</p>
          </div>
          <button onClick={handleSaveAll} disabled={isPending} className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-sm flex gap-2 transition-all shadow-lg shadow-purple-500/20">
            {isPending ? "Menyimpan..." : <><Save className="w-4 h-4" /> Simpan</>}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 flex flex-col lg:flex-row gap-6 lg:gap-10">
        <div className="flex-1 min-w-0 space-y-6 pb-20">
          <div className="bg-slate-200/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-1.5 flex overflow-x-auto no-scrollbar shadow-sm">
            {[
              { id: "profile", icon: User, label: "Konten" },
              { id: "appearance", icon: Palette, label: "Tampilan" },
              { id: "advanced", icon: Layout, label: "Advanced (Pro)" },
              { id: "payment", icon: CreditCard, label: "Pencairan" },
            ].map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as TabType)} 
                className={`flex-1 min-w-[100px] px-3 py-2.5 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
                  activeTab === tab.id ? "bg-white dark:bg-slate-900 shadow-sm text-purple-600 dark:text-purple-400" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <tab.icon className="w-4 h-4 shrink-0" /> <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-[2rem] p-4 sm:p-6 shadow-sm">
            {activeTab === "profile" && (
              <DragDropContext onDragEnd={onDragEnd}>
                <ProfileTab profile={profile} setProfile={setProfile} addBlock={addBlock} removeBlock={removeBlock} updateBlock={updateBlock} toggleBlockActive={toggleBlockActive} />
              </DragDropContext>
            )}
            {activeTab === "appearance" && <AppearanceTab profile={profile} setProfile={setProfile} />}
            {activeTab === "advanced" && <AdvancedTab profile={profile} />}
            {activeTab === "payment" && <PaymentTab banks={banks} newBank={newBank} setNewBank={setNewBank} handleAddBank={handleAddBank} handleDeleteBank={handleDeleteBank} isPending={isPending} />}
          </div>
        </div>

        <div className="w-full lg:w-[320px] shrink-0 relative flex justify-center pb-20">
          <PhonePreview profile={profile} />
        </div>
      </div>
    </div>
  );
}