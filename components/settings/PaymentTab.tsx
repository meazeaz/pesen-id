"use client";

import { CreditCard, Building2, Trash2, Plus } from "lucide-react";
import { BankAccount } from "./constants";

type Props = {
  banks: BankAccount[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  newBank: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setNewBank: (b: any) => void;
  handleAddBank: (e: React.FormEvent) => void;
  handleDeleteBank: (id: string) => void;
  isPending: boolean;
};

export default function PaymentTab({ banks, newBank, setNewBank, handleAddBank, handleDeleteBank, isPending }: Props) {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="bg-white dark:bg-[#121214] border border-slate-200 rounded-3xl p-6 shadow-sm">
        <h2 className="font-bold text-lg mb-6 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-purple-500"/> Rekening Penerimaan Dana
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* List Bank */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Rekening Aktif</h3>
            {banks.length > 0 ? banks.map(bank => (
              <div key={bank.id} className="p-4 border border-slate-200 rounded-2xl flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-200 shadow-sm">
                    <Building2 className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="font-bold text-sm uppercase">{bank.bankName} - {bank.accountNumber}</p>
                    <p className="text-xs text-slate-500">a.n {bank.holderName}</p>
                  </div>
                </div>
                <button onClick={() => handleDeleteBank(bank.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4"/>
                </button>
              </div>
            )) : (
              <p className="text-sm text-slate-500 border border-dashed border-slate-300 p-4 rounded-xl text-center">Belum ada rekening.</p>
            )}
          </div>

          {/* Form Tambah Bank */}
          <form onSubmit={handleAddBank} className="bg-slate-50 dark:bg-[#1a1a1a] p-5 rounded-2xl border border-slate-200">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2"><Plus className="w-4 h-4"/> Tambah Rekening</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-500">Nama Bank / E-Wallet</label>
                <select 
                  value={newBank.bankName} 
                  onChange={e => setNewBank({...newBank, bankName: e.target.value})} 
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none"
                >
                  <option value="BCA">BCA</option>
                  <option value="Mandiri">Mandiri</option>
                  <option value="BNI">BNI</option>
                  <option value="GoPay">GoPay</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-500">No. Rekening / HP</label>
                <input 
                  type="number" required placeholder="Nomor Rekening" 
                  value={newBank.accountNumber} 
                  onChange={e => setNewBank({...newBank, accountNumber: e.target.value})} 
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none font-mono" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-500">Nama Pemilik</label>
                <input 
                  type="text" required placeholder="Sesuai buku tabungan" 
                  value={newBank.holderName} 
                  onChange={e => setNewBank({...newBank, holderName: e.target.value})} 
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none uppercase" 
                />
              </div>
              <button type="submit" disabled={isPending} className="w-full py-2.5 bg-purple-600 text-white font-bold rounded-lg text-sm hover:bg-purple-700 disabled:opacity-50">
                {isPending ? "Menyimpan..." : "Tambah Rekening"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}