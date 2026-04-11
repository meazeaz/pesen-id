import { getAllUsers, getAllWithdrawals } from "@/app/actions/admin";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic"; // Memastikan data selalu segar setiap kali di-refresh

export default async function AdminDashboardPage() {
  // 1. Fetching data langsung di server secara paralel (Sangat Cepat)
  const [usersData, withdrawalsData] = await Promise.all([
    getAllUsers(),
    getAllWithdrawals()
  ]);

  // 2. Kirim data yang sudah matang ke Client Component
  return (
    <AdminClient 
      initialUsers={usersData} 
      initialWithdrawals={withdrawalsData} 
    />
  );
}