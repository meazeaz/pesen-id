import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { ShieldAlert } from "lucide-react";
import SecuritySettings from "@/components/dashboard/SecuritySettings"; // Import form yang tadi kita buat

export const metadata = {
  title: "Keamanan Akun - Pesen.id",
};

export default async function SecurityPage() {
  // Ambil data session untuk memastikan dia sudah login
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header Halaman */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          Keamanan & Password
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Kelola password Anda agar bisa login di perangkat lain menggunakan email <span className="font-bold text-slate-700 dark:text-slate-200">{session?.user?.email}</span>.
        </p>
      </div>

      {/* Info Box (Hanya Pemanis) */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-4 rounded-2xl flex gap-4 items-start">
        <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-xl mt-0.5">
           <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-500" />
        </div>
        <div>
           <h4 className="font-bold text-amber-800 dark:text-amber-400 text-sm mb-1">Penting untuk Pengguna Google</h4>
           <p className="text-sm text-amber-700 dark:text-amber-500/80 leading-relaxed">
             Jika Anda mendaftar menggunakan tombol Google, Anda tidak memiliki password secara *default*. Buat password di bawah ini jika Anda ingin login menggunakan form manual di HP/Laptop lain.
           </p>
        </div>
      </div>

      {/* Panggil Komponen Form Keamanan di Sini */}
      <SecuritySettings />

    </div>
  );
}