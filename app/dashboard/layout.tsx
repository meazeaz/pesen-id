import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// --- KOMPONEN ---
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader"; 
import { getHeaderData } from "@/app/actions/header"; 
import NextAuthProvider from "@/components/auth/NextAuthProvider";

export const metadata: Metadata = {
  title: "Dashboard Admin - Pesen.id",
  description: "Kelola produk, pesanan, dan profil bio link Anda.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  // 1. Cek sesi login
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  
  // 2. Ambil data header (notifikasi & profil) dari database
  const headerData = await getHeaderData();

  return (
    // Bungkus semua dengan NextAuthProvider agar useSession di Sidebar/Header tidak error
    <NextAuthProvider>
      <div className="flex min-h-screen w-full bg-slate-50 dark:bg-[#09090b] transition-colors duration-300">
        
        {/* 3. Sidebar Menu */}
        <Sidebar />

        {/* 4. Main Content Wrapper */}
        <div 
          className="flex-1 flex flex-col min-w-0 transition-all duration-300 max-md:!pl-0"
          style={{ paddingLeft: "var(--sidebar-width, 16rem)" }}
        >
          
          {/* --- HEADER DINAMIS --- */}
          <DashboardHeader headerData={headerData} />

          {/* --- AREA KONTEN (Dashboard, Produk, dll) --- */}
          <main className="flex-1 overflow-x-hidden relative">
            {children}
          </main>
          
        </div>
      </div>
    </NextAuthProvider>
  );
}