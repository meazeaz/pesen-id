"use client";

import { useState, useEffect, useTransition } from "react";
import { 
  getAllUsers, getProUsers, toggleProStatus, deleteUserByAdmin, 
  getAllWithdrawals, processWithdrawal, broadcastNotification
} from "@/app/actions/admin";
import { 
  Crown, Users, Trash2, XCircle, 
  ShieldCheck, Settings, LogOut, Search, 
  Plus, Banknote, CheckCircle2, Clock, X, Megaphone, Send, Server
} from "lucide-react";
import AddAdminModal from "@/components/admin/AddAdminModal";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [users, setUsers] = useState<any[]>([]);
  const [proUsers, setProUsers] = useState<any[]>([]);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  
  const [activeMenu, setActiveMenu] = useState("users"); // "users", "admins", "withdrawals", atau "settings"
  const [showProOnly, setShowProOnly] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const loadData = async () => {
    const [usersData, proUsersData, withdrawalsData] = await Promise.all([
      getAllUsers(),
      getProUsers(),
      getAllWithdrawals()
    ]);
    setUsers(usersData);
    setProUsers(proUsersData);
    setWithdrawals(withdrawalsData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = () => {
    document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/admin;";
    router.push("/admin");
  };

  const handleBroadcast = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formElement = e.currentTarget;

    if (confirm("Kirim pengumuman ini ke SELURUH kreator di aplikasi?")) {
      startTransition(async () => {
        const res = await broadcastNotification(formData);
        if (res.success) {
          alert("✅ " + res.message);
          formElement.reset(); // Kosongkan form setelah sukses
        } else {
          alert("❌ " + res.message);
        }
      });
    }
  };

  const formatRupiah = (num: number) => 
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);

  const formatDate = (dateString: string) => 
    new Date(dateString).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const filteredUsers = users.filter((u) => {
    const isUserRole = activeMenu === "users" ? u.role === "USER" : u.role === "ADMIN";
    const matchesProFilter = activeMenu === "users" && showProOnly ? u.isPro === true : true;
    const searchMatch = u.username.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    return isUserRole && matchesProFilter && searchMatch;
  });

  const filteredWithdrawals = withdrawals.filter((w) => {
    return w.user.username.toLowerCase().includes(searchQuery.toLowerCase()) || w.holderName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans text-slate-900">
      
      {/* --- SIDEBAR ADMIN --- */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-slate-950 text-white p-6 hidden lg:flex flex-col shadow-2xl z-50">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center font-black shadow-lg shadow-purple-500/20 text-xl">P</div>
          <div>
             <span className="font-bold text-lg block leading-none">Pesen.id</span>
             <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">Super Admin</span>
          </div>
        </div>

        <nav className="space-y-1 flex-1">
          <button 
            onClick={() => setActiveMenu("users")}
            className={`w-full p-3.5 rounded-2xl flex items-center gap-3 font-bold transition-all ${activeMenu === "users" ? "bg-purple-600 shadow-lg shadow-purple-600/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
          >
            <Users className="w-5 h-5" /> Kelola Kreator
          </button>

          <button 
            onClick={() => setActiveMenu("withdrawals")}
            className={`w-full p-3.5 rounded-2xl flex items-center justify-between font-bold transition-all ${activeMenu === "withdrawals" ? "bg-purple-600 shadow-lg shadow-purple-600/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
          >
            <div className="flex items-center gap-3"><Banknote className="w-5 h-5" /> Tarik Dana</div>
            {withdrawals.filter(w => w.status === "PENDING").length > 0 && (
              <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{withdrawals.filter(w => w.status === "PENDING").length}</span>
            )}
          </button>
          
          <button 
            onClick={() => setActiveMenu("admins")}
            className={`w-full p-3.5 rounded-2xl flex items-center gap-3 font-bold transition-all ${activeMenu === "admins" ? "bg-purple-600 shadow-lg shadow-purple-600/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
          >
            <ShieldCheck className="w-5 h-5" /> Staf Admin
          </button>

          <div className="pt-4 mt-4 border-t border-white/5 opacity-80">
             <p className="text-[10px] font-bold uppercase tracking-widest px-4 mb-2 text-slate-500">Sistem</p>
             <button 
               onClick={() => setActiveMenu("settings")}
               className={`w-full p-3.5 rounded-2xl flex items-center gap-3 font-bold transition-all ${activeMenu === "settings" ? "bg-slate-800 text-white border border-slate-700" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
             >
                <Settings className="w-5 h-5" /> Pengaturan Web
             </button>
          </div>
        </nav>

        <button onClick={handleLogout} className="p-4 bg-red-500/10 text-red-500 rounded-2xl flex items-center gap-3 font-bold hover:bg-red-500 hover:text-white transition-all mt-auto">
           <LogOut className="w-5 h-5" /> Keluar Panel
        </button>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="lg:ml-72 flex-1 p-6 lg:p-10">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              {activeMenu === "users" ? "Manajemen Kreator" : 
               activeMenu === "admins" ? "Manajemen Staf Admin" : 
               activeMenu === "withdrawals" ? "Permintaan Tarik Dana" : "Pengaturan Sistem"}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {activeMenu === "withdrawals" ? "Proses pencairan dana pendapatan kreator ke rekening tujuan." : 
               activeMenu === "settings" ? "Broadcast pengumuman dan kelola server." : 
               "Daftar pengguna yang terdaftar di database."}
            </p>
          </div>
          
          {/* Menu Action Atas (Sembunyikan saat di menu Pengaturan Web) */}
          {activeMenu !== "settings" && (
            <div className="flex gap-3 w-full md:w-auto">
               <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Cari data..." 
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
               </div>
               {activeMenu === "users" && (
                 <button 
                   type="button"
                   onClick={() => setShowProOnly(!showProOnly)}
                   className="px-4 py-2 rounded-2xl text-xs font-bold border border-purple-200 text-purple-700 bg-purple-50 hover:bg-purple-100 transition-all"
                 >
                   {showProOnly ? "Tampilkan Semua" : "Tampilkan Pro"}
                 </button>
               )}
               {activeMenu !== "withdrawals" && (
                 <button 
                   onClick={() => setShowAddModal(true)}
                   className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl text-sm shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2"
                 >
                    <Plus className="w-4 h-4" /> {activeMenu === "admins" ? "Tambah Admin" : "User Baru"}
                 </button>
               )}
            </div>
          )}
        </header>

        {/* --- KONTEN: PENGATURAN WEB (SISTEM) --- */}
        {activeMenu === "settings" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Card 1: Broadcast Pengumuman */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                <Megaphone className="w-5 h-5 text-purple-600" /> Broadcast Pengumuman
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Pesan ini akan dikirimkan ke lonceng notifikasi seluruh kreator (User) yang terdaftar di Pesen.id.
              </p>
              
              <form onSubmit={handleBroadcast} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Judul Pengumuman</label>
                  <input 
                    name="title" 
                    required 
                    placeholder="Cth: Maintenance Server Nanti Malam" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Isi Pesan</label>
                  <textarea 
                    name="message" 
                    required 
                    rows={4} 
                    placeholder="Tuliskan informasi lengkap di sini..." 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tipe Pesan</label>
                  <select name="type" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-sm">
                    <option value="info">📢 Informasi (Info Biasa)</option>
                    <option value="success">🎉 Kabar Baik / Promo</option>
                    <option value="warning">⚠️ Peringatan / Maintenance</option>
                  </select>
                </div>
                <button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full py-3.5 mt-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-purple-600 transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {isPending ? "Mengirim..." : <><Send className="w-4 h-4"/> Kirim ke {users.filter(u => u.role === "USER").length} Kreator</>}
                </button>
              </form>
            </div>

            {/* Card 2: Informasi Sistem (Aesthetic Murni) */}
            <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-8 shadow-2xl h-fit">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
                <Server className="w-5 h-5 text-blue-400" /> Status Sistem Internal
              </h3>
              
              <div className="space-y-5">
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Environment</p>
                    <p className="font-mono text-sm mt-1 text-green-400">Production</p>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
                </div>

                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Database Status</p>
                    <p className="font-mono text-sm mt-1 text-blue-400">Connected (PostgreSQL)</p>
                  </div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
                </div>

                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Next.js Version</p>
                    <p className="font-mono text-sm mt-1">v15.0.0 (App Router)</p>
                  </div>
                </div>

                <div className="pt-4 text-center">
                  <p className="text-[10px] text-slate-500 font-medium">Semua sistem beroperasi normal. Tidak ada tindakan yang diperlukan.</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* --- KONTEN: STATISTIK HEADER (Tampil Selain di Pengaturan) --- */}
        {activeMenu !== "settings" && (
          <div className="grid gap-4 sm:grid-cols-3 mb-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400 font-bold mb-3">Total Kreator</p>
              <p className="text-3xl font-black text-slate-900">{users.filter((user) => user.role === "USER").length}</p>
              <p className="text-sm text-slate-500 mt-2">Semua pengguna dengan peran USER.</p>
            </div>
            <div className="rounded-3xl border border-purple-100 bg-purple-50/80 p-6 shadow-sm shadow-purple-200/10">
              <p className="text-[11px] uppercase tracking-[0.22em] text-purple-600 font-bold mb-3">Pro Creator</p>
              <p className="text-3xl font-black text-purple-700">{proUsers.length}</p>
              <p className="text-sm text-purple-600 mt-2">Jumlah akun yang sudah upgrade ke paket Pro Creator.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400 font-bold mb-3">Total Admin</p>
              <p className="text-3xl font-black text-slate-900">{users.filter((user) => user.role === "ADMIN").length}</p>
              <p className="text-sm text-slate-500 mt-2">Jumlah akun dengan hak akses admin.</p>
            </div>
          </div>
        )}

        {/* --- TABEL PENARIKAN DANA --- */}
        {activeMenu === "withdrawals" && (
          <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm ring-1 ring-black/5">
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="bg-slate-50/50 border-b border-slate-100">
                     <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Kreator</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Nominal</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Rekening Tujuan</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Status</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Aksi Manual</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                   {filteredWithdrawals.map((wd) => (
                     <tr key={wd.id} className="group hover:bg-slate-50/50 transition-all duration-200">
                       <td className="px-8 py-5">
                         <div className="flex items-center gap-4">
                           <img src={wd.user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${wd.user.username}`} className="w-10 h-10 rounded-xl bg-slate-100 object-cover" alt="avatar"/>
                           <div>
                             <p className="text-sm font-bold text-slate-900">{wd.user.name}</p>
                             <p className="text-[10px] text-slate-400">{formatDate(wd.createdAt)}</p>
                           </div>
                         </div>
                       </td>
                       <td className="px-8 py-5">
                          <span className="text-sm font-black text-purple-600">{formatRupiah(wd.amount)}</span>
                       </td>
                       <td className="px-8 py-5">
                          <p className="text-xs font-bold text-slate-900 uppercase">{wd.bankName}</p>
                          <p className="text-sm font-mono text-slate-600">{wd.accountNumber}</p>
                          <p className="text-[10px] text-slate-500 uppercase">A.N. {wd.holderName}</p>
                       </td>
                       <td className="px-8 py-5 text-center">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                             wd.status === 'SUCCESS' ? 'bg-green-50 text-green-600 border-green-200' :
                             wd.status === 'PENDING' ? 'bg-yellow-50 text-yellow-600 border-yellow-200 animate-pulse' :
                             'bg-red-50 text-red-600 border-red-200'
                           }`}>
                             {wd.status === 'SUCCESS' && <CheckCircle2 className="w-3 h-3"/>}
                             {wd.status === 'PENDING' && <Clock className="w-3 h-3"/>}
                             {wd.status === 'REJECTED' && <X className="w-3 h-3"/>}
                             {wd.status}
                          </span>
                       </td>
                       <td className="px-8 py-5 text-right">
                         {wd.status === "PENDING" ? (
                           <div className="flex justify-end gap-2">
                              <button 
                                onClick={async () => {
                                  if(confirm("Tandai uang sudah ditransfer?")) {
                                    await processWithdrawal(wd.id, "SUCCESS");
                                    loadData();
                                  }
                                }}
                                className="px-3 py-1.5 bg-green-500 text-white text-xs font-bold rounded-lg hover:bg-green-600 transition shadow-sm"
                              >
                                Approve
                              </button>
                              <button 
                                onClick={async () => {
                                  if(confirm("Tolak penarikan ini?")) {
                                    await processWithdrawal(wd.id, "REJECTED");
                                    loadData();
                                  }
                                }}
                                className="px-3 py-1.5 bg-red-50 text-red-500 text-xs font-bold rounded-lg border border-red-100 hover:bg-red-500 hover:text-white transition"
                              >
                                Tolak
                              </button>
                           </div>
                         ) : (
                             <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Selesai</span>
                         )}
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
             {filteredWithdrawals.length === 0 && (
               <div className="p-20 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4"><Banknote className="w-8 h-8 text-slate-300" /></div>
                  <p className="text-slate-400 font-bold">Belum ada permintaan penarikan dana.</p>
               </div>
             )}
          </div>
        )}

        {/* --- TABEL USER & ADMIN --- */}
        {(activeMenu === "users" || activeMenu === "admins") && (
          <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm ring-1 ring-black/5">
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="bg-slate-50/50 border-b border-slate-100">
                     <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Identitas</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Karya</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Penjualan</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Aksi</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                   {filteredUsers.map((user) => (
                     <tr key={user.id} className="group hover:bg-slate-50/50 transition-all duration-200">
                       <td className="px-8 py-5">
                         <div className="flex items-center gap-4">
                           <img src={user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}&backgroundColor=8b5cf6`} className="w-11 h-11 rounded-full border-2 border-white shadow-sm bg-slate-100 object-cover" alt="avatar"/>
                           <div>
                             <p className="text-sm font-black text-slate-900">{user.name || user.username}</p>
                             <p className="text-[11px] text-slate-400 font-medium">@{user.username}</p>
                           </div>
                         </div>
                       </td>
                       <td className="px-8 py-5">
                         {user.role === "ADMIN" ? (
                           <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full border border-blue-100 uppercase"><ShieldCheck className="w-3 h-3" /> System Admin</div>
                         ) : user.isPro ? (
                           <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-600 text-[10px] font-black rounded-full border border-purple-100 uppercase"><Crown className="w-3 h-3 fill-current" /> Pro Creator</div>
                         ) : (
                           <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full border border-slate-200 uppercase">Basic User</div>
                         )}
                       </td>
                       <td className="px-8 py-5 text-center"><span className="px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-700">{user._count.products}</span></td>
                       <td className="px-8 py-5 text-center font-black text-xs text-slate-900">{user._count.orders}</td>
                       <td className="px-8 py-5 text-right">
                         <div className="flex justify-end gap-2">
                           {user.role === "USER" && (
                             <button 
                               onClick={async () => { await toggleProStatus(user.id, user.isPro); loadData(); }}
                               className={`p-2 rounded-xl border transition-all ${user.isPro ? "bg-red-50 text-red-500 border-red-100" : "bg-purple-50 text-purple-600 border-purple-100"}`}
                               title={user.isPro ? "Turunkan ke Basic" : "Jadikan Pro"}
                             >
                               {user.isPro ? <XCircle className="w-4 h-4" /> : <Crown className="w-4 h-4" />}
                             </button>
                           )}
                           <button onClick={async () => { if(confirm("Hapus akun permanen?")) { await deleteUserByAdmin(user.id); loadData(); } }} className="p-2 bg-white text-slate-400 border border-slate-200 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button>
                         </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        )}

      </main>

      {showAddModal && <AddAdminModal onClose={() => { setShowAddModal(false); loadData(); }} />}
    </div>
  );
}