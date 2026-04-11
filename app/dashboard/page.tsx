import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import DashboardClient from "./DashboardClient";

// 👇 Tambahkan ini agar angka saldo selalu fresh (tidak ter-cache oleh Next.js)
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession();
  
  if (!session?.user?.email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Silakan login terlebih dahulu.</p>
      </div>
    );
  }

  // Cari KTP (ID) User yang sedang login
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return null;

  // 1. Ambil Total Pendapatan (Pesanan LUNAS)
  const revenueData = await prisma.order.aggregate({
    where: { userId: user.id, status: "paid" },
    _sum: { totalAmount: true },
  });
  const totalRevenue = revenueData._sum.totalAmount || 0;

  // 👇 TAMBAHAN: Ambil Total Penarikan Dana (PENDING & SUCCESS)
  const expenseData = await prisma.withdrawal.aggregate({
    where: { userId: user.id, status: { in: ["PENDING", "SUCCESS"] } },
    _sum: { amount: true },
  });
  const totalExpense = expenseData._sum.amount || 0;

  // 👇 TAMBAHAN: Saldo Aktif = Total Uang Masuk - Total Uang Keluar
  const activeBalance = totalRevenue - totalExpense;

  // 2. Ambil Total Transaksi (Semua status)
  const totalSales = await prisma.order.count({
    where: { userId: user.id }
  });

  // 3. Ambil Total Produk Aktif
  const totalProducts = await prisma.product.count({
    where: { userId: user.id, status: "active" },
  });

  // 4. [LOGIKA ASLI ANDA] Hitung Penjualan 7 Hari Terakhir untuk Grafik
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const recentPaidOrders = await prisma.order.findMany({
    where: {
      userId: user.id,
      status: "paid",
      createdAt: { gte: sevenDaysAgo }
    },
    select: { totalAmount: true, createdAt: true }
  });

  const dailyRevenue = Array(7).fill(0);
  let maxDailyRevenue = 0;

  recentPaidOrders.forEach(order => {
    const dayDiff = Math.floor((order.createdAt.getTime() - sevenDaysAgo.getTime()) / (1000 * 60 * 60 * 24));
    if (dayDiff >= 0 && dayDiff < 7) {
      dailyRevenue[dayDiff] += order.totalAmount;
      if (dailyRevenue[dayDiff] > maxDailyRevenue) maxDailyRevenue = dailyRevenue[dayDiff];
    }
  });

  const chartData = maxDailyRevenue > 0 
    ? dailyRevenue.map(amount => Math.round((amount / maxDailyRevenue) * 100))
    : dailyRevenue;

  // Helper Waktu (Logika Asli Anda)
  const formatTimeAgo = (date: Date) => {
    const diff = Math.floor((new Date().getTime() - date.getTime()) / 1000); 
    if (diff < 60) return "Baru saja";
    if (diff < 3600) return `${Math.floor(diff / 60)} menit yang lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam yang lalu`;
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  };

  // --- 👇 TAMBAHAN: GABUNGAN ORDER DAN PENARIKAN ---
  
  const recentOrders = await prisma.order.findMany({
    where: { userId: user.id },
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true } } }
  });

  const recentWithdrawals = await prisma.withdrawal.findMany({
    where: { userId: user.id },
    take: 5,
    orderBy: { createdAt: "desc" }
  });

  const formattedOrders = recentOrders.map(order => ({
    id: `ORD-${order.id}`,
    type: "order" as const,
    title: order.status === "paid" ? "Pesanan Berhasil" : order.status === "pending" ? "Pesanan Baru" : "Pesanan Gagal",
    description: `${order.customerName || "Pembeli"} memproses ${order.items[0]?.product?.title || "Produk"}`,
    time: formatTimeAgo(order.createdAt),
    amount: order.totalAmount,
    status: (order.status === "paid" ? "success" : order.status === "pending" ? "pending" : "failed") as "success" | "pending" | "failed",
    rawDate: order.createdAt // Untuk sorting
  }));

  const formattedWithdrawals = recentWithdrawals.map(w => ({
    id: `WD-${w.id}`,
    type: "withdrawal" as const,
    title: w.status === "SUCCESS" ? "Pencairan Berhasil" : w.status === "REJECTED" ? "Pencairan Gagal" : "Pencairan Diproses",
    description: `Tarik dana ke ${w.bankName} (${w.accountNumber})`,
    time: formatTimeAgo(w.createdAt),
    amount: w.amount,
    status: (w.status === "SUCCESS" ? "success" : w.status === "PENDING" ? "pending" : "failed") as "success" | "pending" | "failed",
    rawDate: w.createdAt // Untuk sorting
  }));

  // Gabungkan array, urutkan dari yang terbaru, lalu hapus properti rawDate
  const recentActivities = [...formattedOrders, ...formattedWithdrawals]
    .sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime())
    .slice(0, 5)
    .map(({ rawDate, ...rest }) => rest);

  // 6. Susun data untuk dikirim ke UI
  const dashboardStats = {
    totalSaldo: activeBalance, // Menggunakan saldo yang sudah dikurangi penarikan
    totalPenjualan: totalSales,
    totalProdukAktif: totalProducts,
    chartHeights: chartData, 
    rawChartAmounts: dailyRevenue, 
    recentActivities: recentActivities
  };

  return <DashboardClient stats={dashboardStats} />;
}