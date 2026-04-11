"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toggleProStatus, deleteUserByAdmin, processWithdrawal } from "@/app/actions/admin";
import { 
  User, Crown, Users, Trash2, XCircle, 
  ShieldCheck, Settings, LogOut, Search, 
  Plus, Banknote, CheckCircle2, Clock, X
} from "lucide-react";
import AddAdminModal from "@/components/admin/AddAdminModal";

// Tipe Data Props
type AdminClientProps = {
  initialUsers: any[];
  initialWithdrawals: any[];
};

export default function AdminClient({ initialUsers, initialWithdrawals }: AdminClientProps) {
  const router = useRouter();
  
  // State Management
  const [activeMenu, setActiveMenu] = useState("users"); // "users", "admins", atau "withdrawals"
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fungsi Refresh Data (Memanggil ulang Server Component secara diam-diam)
  const refreshData = () => {
    setIsRefreshing(true);
    router.refresh(); 
    // router.refresh() akan meminta RSC mengambil data terbaru dari server, 
    // lalu memperbarui UI tanpa membuat seluruh halaman berkedip (reload).
    setTimeout(() => setIsRefreshing(false), 500); 
  };

  const handleLogout = () => {
    document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/admin;";
    router.push("/admin");
  };

  // Helpers
  const formatRupiah = (num: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  // Filter Logic berdasarkan initialData
  const filteredUsers = initialUsers.filter((u) => {
    const roleMatch = activeMenu === "users" ? u.role === "USER" : u.role === "ADMIN";
    const searchMatch = u.username.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    return roleMatch && searchMatch;
  });

  const filteredWithdrawals = initialWithdrawals.filter((w) => {
    return w.user.username.toLowerCase().includes(searchQuery.toLowerCase()) || w.holderName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans text-slate-900">
      
      {/* --- SIDEBAR --- */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-slate-950 text-white p-6 hidden lg:flex flex-col shadow-2xl z-50">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center font-black shadow-lg shadow-purple-500/20 text-xl">P</div>
          <div>
             <span className="font-bold text-lg block leading-none">Pesen.id</span>
             <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">Super Admin</span>
          </div>
        </div>

        <nav className="space-y-1 flex-1">
          <button onClick={() => setActiveMenu("users")} className={`w-full p-3.5 rounded-2xl flex items-center gap-3 font-bold transition-all ${activeMenu === "users" ? "bg-purple-600 shadow-lg shadow-purple-600/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
            <Users className="w-5 h-5" /> Kelola Kreator
          </button>

          {/* MENU TARIK DANA */}
          <button onClick={() => setActiveMenu("withdrawals")} className={`w-full p-3.5 rounded-2xl flex items-center justify-between font-bold transition-all ${activeMenu === "withdrawals" ? "bg-purple-600 shadow-lg shadow-purple-600/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
            <div className="flex items-center gap-3"><Banknote className="w-5 h-5" /> Tarik Dana</div>
            {initialWithdrawals.filter(w => w.status === "PENDING").length > 0 && (
              <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{initialWithdrawals.filter(w => w.status === "PENDING").length}</span>
            )}
          </button>
          
          <button onClick={() => setActiveMenu("admins")} className={`w-full p-3.5 rounded-2xl flex items-center gap-3 font-bold transition-all ${activeMenu === "admins" ? "bg-purple-600 shadow-lg shadow-purple-600/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
            <ShieldCheck className="w-5 h-5" /> Staf Admin
          </button>
        </nav>

        <button onClick={handleLogout} className="p-4 bg-red-500/10 text-red-500 rounded-2xl flex items-center gap-3 font-bold hover:bg-red-500 hover:text-white transition-all">
           <LogOut className="w-5 h-5" /> Keluar Panel
        </button>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className={`lg:ml-72 flex-1 p-6 lg:p-10 transition-opacity duration-200 ${isRefreshing ? 'opacity-50' : 'opacity-100'}`}>
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              {activeMenu === "users" ? "Manajemen Kreator" : activeMenu === "admins" ? "Manajemen Staf Admin" : "Permintaan Tarik Dana"}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {activeMenu === "withdrawals" ? "Proses pencairan dana pendapatan kreator." : "Daftar pengguna yang terdaftar di database."}
            </p>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Cari data..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500/20" />
             </div>
             {activeMenu !== "withdrawals" && (
               <button onClick={() => setShowAddModal(true)} className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl text-sm shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2">
                  <Plus className="w-4 h-4" /> {activeMenu === "admins" ? "Tambah Admin" : "User Baru"}
               </button>
             )}
          </div>
        </header>

        {/* --- TABEL PENARIKAN (WITHDRAWALS) --- */}
        {activeMenu === "withdrawals" && (
          <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400">Kreator</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400">Nominal</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400">Rekening Tujuan</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 text-center">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredWithdrawals.map((wd) => (
                    <tr key={wd.id} className="hover:bg-slate-50/50 transition-all">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <img src={wd.user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${wd.user.username}`} className="w-10 h-10 rounded-xl bg-slate-100 object-cover" alt="avatar"/>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{wd.user.name}</p>
                            <p className="text-[10px] text-slate-400">{formatDate(wd.createdAt)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5"><span className="text-sm font-black text-purple-600">{formatRupiah(wd.amount)}</span></td>
                      <td className="px-8 py-5">
                         <p className="text-xs font-bold text-slate-900 uppercase">{wd.bankName}</p>
                         <p className="text-sm font-mono text-slate-600">{wd.accountNumber}</p>
                         <p className="text-[10px] text-slate-500 uppercase">A.N. {wd.holderName}</p>
                      </td>
                      <td className="px-8 py-5 text-center">
                         <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${wd.status === 'SUCCESS' ? 'bg-green-50 text-green-600' : wd.status === 'PENDING' ? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-600'}`}>
                            {wd.status}
                         </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        {wd.status === "PENDING" && (
                          <div className="flex justify-end gap-2">
                             <button onClick={async () => { if(confirm("Tandai sudah ditransfer?")) { await processWithdrawal(wd.id, "SUCCESS"); refreshData(); } }} className="px-3 py-1.5 bg-green-500 text-white text-xs font-bold rounded-lg hover:bg-green-600">Approve</button>
                             <button onClick={async () => { if(confirm("Tolak penarikan?")) { await processWithdrawal(wd.id, "REJECTED"); refreshData(); } }} className="px-3 py-1.5 bg-red-50 text-red-500 text-xs font-bold rounded-lg border border-red-100 hover:bg-red-500 hover:text-white">Tolak</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredWithdrawals.length === 0 && <div className="p-20 text-center"><p className="text-slate-400 font-bold">Belum ada penarikan dana.</p></div>}
          </div>
        )}

        {/* --- TABEL USER & ADMIN --- */}
        {activeMenu !== "withdrawals" && (
          <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400">Identitas</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 text-center">Karya</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-all">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <img src={user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`} className="w-11 h-11 rounded-full border-2 border-white shadow-sm bg-slate-100 object-cover" alt="avatar"/>
                          <div>
                            <p className="text-sm font-black text-slate-900">{user.name || user.username}</p>
                            <p className="text-[11px] text-slate-400 font-medium">@{user.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        {user.role === "ADMIN" ? <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full">System Admin</span> : user.isPro ? <span className="px-3 py-1 bg-purple-50 text-purple-600 text-[10px] font-black rounded-full">Pro Creator</span> : <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full">Basic User</span>}
                      </td>
                      <td className="px-8 py-5 text-center"><span className="px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-bold">{user._count.products}</span></td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          {user.role === "USER" && <button onClick={async () => { await toggleProStatus(user.id, user.isPro); refreshData(); }} className="p-2 rounded-xl border border-slate-200"><Crown className="w-4 h-4 text-purple-600" /></button>}
                          <button onClick={async () => { if(confirm("Hapus permanen?")) { await deleteUserByAdmin(user.id); refreshData(); } }} className="p-2 bg-white text-red-500 border border-slate-200 rounded-xl"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredUsers.length === 0 && <div className="p-20 text-center"><p className="text-slate-400 font-bold">Data tidak ditemukan.</p></div>}
          </div>
        )}

      </main>

      {/* MODAL */}
      {showAddModal && <AddAdminModal onClose={() => { setShowAddModal(false); refreshData(); }} />}
    </div>
  );
}