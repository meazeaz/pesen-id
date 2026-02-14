import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0a0a0a]">
      {/* Sidebar (Kiri) */}
      <Sidebar />

      {/* Konten Utama (Kanan) */}
      <div className="flex-1 flex flex-col transition-all duration-300 md:pl-64">
        <DashboardHeader />
        
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}