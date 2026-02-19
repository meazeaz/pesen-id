"use client";

import { useState } from "react";
import { 
  CreditCard, Plus, Trash2, Star, Landmark, 
  CheckCircle2, ShieldCheck, History, AlertCircle, X
} from "lucide-react";

// --- TIPE DATA ---
type BankAccount = {
  id: number;
  bankName: string;
  accountNumber: string;
  holderName: string;
  isPrimary: boolean;
  color: string; // Untuk variasi warna kartu
};

// --- DUMMY DATA AWAL ---
const INITIAL_BANKS: BankAccount[] = [
  {
    id: 1,
    bankName: "Bank Central Asia (BCA)",
    accountNumber: "8820 3341 9901",
    holderName: "ILHAM DEVELOPER",
    isPrimary: true,
    color: "bg-gradient-to-br from-slate-800 to-slate-900",
  },
  {
    id: 2,
    bankName: "Bank Mandiri",
    accountNumber: "1230 0048 2219",
    holderName: "ILHAM DEVELOPER",
    isPrimary: false,
    color: "bg-gradient-to-br from-blue-700 to-blue-900",
  }
];

export default function BankPage() {
  const [banks, setBanks] = useState<BankAccount[]>(INITIAL_BANKS);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    bankName: "Bank Central Asia (BCA)",
    accountNumber: "",
    holderName: "",
  });

  // --- HANDLERS ---
  const handleSetPrimary = (id: number) => {
    const updatedBanks = banks.map(bank => ({
      ...bank,
      isPrimary: bank.id === id
    }));
    setBanks(updatedBanks);
  };

  const handleDelete = (id: number) => {
    if (confirm("Hapus rekening ini?")) {
      setBanks(banks.filter(b => b.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBank: BankAccount = {
      id: Date.now(),
      bankName: formData.bankName,
      accountNumber: formData.accountNumber,
      holderName: formData.holderName.toUpperCase(),
      isPrimary: banks.length === 0, // Jika ini bank pertama, otomatis primary
      color: "bg-gradient-to-br from-purple-700 to-indigo-900" // Warna default kartu baru
    };
    setBanks([...banks, newBank]);
    setIsAdding(false);
    setFormData({ bankName: "Bank Central Asia (BCA)", accountNumber: "", holderName: "" });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      
      <div className="max-w-6xl mx-auto p-6 lg:p-8 space-y-8">

        {/* --- HEADER --- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Rekening Bank <ShieldCheck className="w-5 h-5 text-green-500" />
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Atur rekening tujuan untuk pencairan dana penjualan.
            </p>
          </div>
          
          {!isAdding && (
            <button 
              onClick={() => setIsAdding(true)}
              className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-xl text-sm shadow-lg hover:opacity-90 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Tambah Rekening
            </button>
          )}
        </div>

        {/* --- FORM TAMBAH REKENING (Toggle) --- */}
        {isAdding && (
          <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-lg animate-in slide-in-from-top-4 fade-in">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Input Rekening Baru</h3>
                <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
                   <X className="w-5 h-5" />
                </button>
             </div>
             
             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nama Bank</label>
                   <select 
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-purple-500 transition-all"
                      value={formData.bankName}
                      onChange={e => setFormData({...formData, bankName: e.target.value})}
                   >
                      <option>Bank Central Asia (BCA)</option>
                      <option>Bank Mandiri</option>
                      <option>Bank Rakyat Indonesia (BRI)</option>
                      <option>Bank Negara Indonesia (BNI)</option>
                      <option>Bank Syariah Indonesia (BSI)</option>
                      <option>Jenius / BTPN</option>
                      <option>Bank Jago</option>
                   </select>
                </div>
                <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nomor Rekening</label>
                   <input 
                      type="number"
                      required
                      placeholder="Contoh: 1234567890"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-purple-500 transition-all font-mono"
                      value={formData.accountNumber}
                      onChange={e => setFormData({...formData, accountNumber: e.target.value})}
                   />
                </div>
                <div className="md:col-span-2">
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nama Pemilik (Sesuai Buku Tabungan)</label>
                   <input 
                      type="text"
                      required
                      placeholder="Contoh: ILHAM SANTOSO"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-purple-500 transition-all uppercase"
                      value={formData.holderName}
                      onChange={e => setFormData({...formData, holderName: e.target.value})}
                   />
                   <p className="text-xs text-orange-500 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Pastikan nama sesuai agar pencairan tidak gagal.
                   </p>
                </div>
                <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                   <button type="button" onClick={() => setIsAdding(false)} className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Batal</button>
                   <button type="submit" className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-sm shadow-lg transition-all">Simpan Rekening</button>
                </div>
             </form>
          </div>
        )}

        {/* --- DAFTAR KARTU BANK --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {banks.map((bank) => (
              <div key={bank.id} className="group relative">
                 {/* Kartu Visual */}
                 <div className={`relative h-56 rounded-3xl p-6 text-white shadow-xl ${bank.color} overflow-hidden transition-transform group-hover:scale-[1.02] duration-300`}>
                    
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-10 -mb-10 blur-xl"></div>

                    <div className="flex flex-col justify-between h-full relative z-10">
                       <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                             <Landmark className="w-6 h-6 text-white/80" />
                             <span className="font-bold text-lg tracking-wide">{bank.bankName.split('(')[0]}</span>
                          </div>
                          {bank.isPrimary && (
                             <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 flex items-center gap-1">
                                <Star className="w-3 h-3 fill-white" /> Utama
                             </span>
                          )}
                       </div>

                       <div className="space-y-4">
                          <div className="flex items-center gap-3">
                             <div className="w-12 h-8 bg-yellow-500/90 rounded-md shadow-inner flex items-center justify-center">
                                <div className="w-8 h-5 border border-black/20 rounded-sm"></div>
                             </div>
                             <CreditCard className="w-6 h-6 text-white/50" />
                          </div>
                          
                          <p className="font-mono text-2xl tracking-widest drop-shadow-md">
                             {bank.accountNumber.replace(/(\d{4})/g, '$1 ').trim()}
                          </p>
                       </div>

                       <div className="flex justify-between items-end">
                          <div>
                             <p className="text-[10px] uppercase text-white/60 tracking-wider mb-0.5">Card Holder</p>
                             <p className="font-bold text-sm tracking-wide">{bank.holderName}</p>
                          </div>
                          <div className="text-[10px] font-bold bg-black/20 px-2 py-1 rounded text-white/70">DEBIT</div>
                       </div>
                    </div>
                 </div>

                 {/* Action Buttons (Below Card) */}
                 <div className="flex justify-between items-center mt-3 px-2">
                    {!bank.isPrimary ? (
                       <button 
                          onClick={() => handleSetPrimary(bank.id)}
                          className="text-xs font-bold text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1"
                       >
                          <CheckCircle2 className="w-4 h-4" /> Jadikan Utama
                       </button>
                    ) : (
                       <span className="text-xs font-bold text-green-600 dark:text-green-400 flex items-center gap-1 cursor-default">
                          <CheckCircle2 className="w-4 h-4" /> Rekening Utama
                       </span>
                    )}
                    
                    <button 
                       onClick={() => handleDelete(bank.id)}
                       className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1"
                    >
                       <Trash2 className="w-4 h-4" /> Hapus
                    </button>
                 </div>
              </div>
           ))}

           {/* Empty State Add Card */}
           {!isAdding && (
              <button 
                 onClick={() => setIsAdding(true)}
                 className="h-56 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl flex flex-col items-center justify-center text-slate-400 hover:text-purple-600 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all gap-3 group"
              >
                 <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6" />
                 </div>
                 <span className="font-bold text-sm">Tambah Rekening Baru</span>
              </button>
           )}
        </div>

        {/* --- INFO PEMBAYARAN --- */}
        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-2xl p-6">
           <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-2">
              <History className="w-4 h-4" /> Informasi Pencairan
           </h4>
           <ul className="text-sm text-blue-600/80 dark:text-blue-300/80 space-y-1.5 list-disc list-inside">
              <li>Pencairan dana diproses setiap hari kerja (Senin - Jumat) pukul 09.00 - 16.00 WIB.</li>
              <li>Minimal penarikan dana adalah Rp 50.000.</li>
              <li>Biaya admin Rp 6.500 untuk bank selain BCA, Mandiri, dan BRI.</li>
              <li>Pastikan nama pemilik rekening sesuai dengan nama di profil untuk menghindari penolakan.</li>
           </ul>
        </div>

      </div>
    </div>
  );
}