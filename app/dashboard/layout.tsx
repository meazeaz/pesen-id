import type { Metadata } from "next";
import Sidebar from "@/components/dashboard/Sidebar";

export const metadata: Metadata = {
  title: "Dashboard Admin - Pesen.id",
  description: "Kelola produk dan profil bio link Anda.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#09090b]">
      
      {/* 1. Sidebar (Client Component) */}
      {/* Dirender di server sebagai HTML statis awal, lalu di-hydrate di client untuk interaksi */}
      <Sidebar />

      {/* 2. Main Content (Server/Client Hybrid) */}
      <div className="flex-1 flex flex-col transition-all duration-300 md:pl-64">
        
        {/* Area Konten Dinamis (Page Settings, Products, dll akan masuk sini) */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        
      </div>
    </div>
  );
}