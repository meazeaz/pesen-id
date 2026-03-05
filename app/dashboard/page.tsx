import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import DashboardClient from "./DashboardClient";

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

  // 1. Ambil Total Pendapatan (Hanya pesanan LUNAS milik user ini)
  const revenueData = await prisma.order.aggregate({
    where: { 
      userId: user.id,
      status: "paid" 
    },
    _sum: { totalAmount: true },
  });
  const totalRevenue = revenueData._sum.totalAmount || 0;

  // 2. Ambil Total Transaksi (Semua status milik user ini)
  const totalSales = await prisma.order.count({
    where: { userId: user.id }
  });

  // 3. Ambil Total Produk Aktif (Milik user ini)
  const totalProducts = await prisma.product.count({
    where: { 
      userId: user.id,
      status: "active" 
    },
  });

  // 4. Ambil 5 Pesanan Terbaru untuk List Aktivitas (Milik user ini)
  const recentOrders = await prisma.order.findMany({
    where: { userId: user.id },
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      items: { include: { product: true } }
    }
  });

  // 5. [AJAX/DATA DINAMIS] Hitung Penjualan 7 Hari Terakhir untuk Grafik
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

  // Buat array berisi 7 angka (0) untuk 7 hari terakhir
  const dailyRevenue = Array(7).fill(0);
  let maxDailyRevenue = 0;

  recentPaidOrders.forEach(order => {
    // Hitung jarak hari antara order dan 7 hari yang lalu
    const dayDiff = Math.floor((order.createdAt.getTime() - sevenDaysAgo.getTime()) / (1000 * 60 * 60 * 24));
    if (dayDiff >= 0 && dayDiff < 7) {
      dailyRevenue[dayDiff] += order.totalAmount;
      if (dailyRevenue[dayDiff] > maxDailyRevenue) maxDailyRevenue = dailyRevenue[dayDiff];
    }
  });

  // Ubah angka nominal menjadi persentase (0-100) untuk tinggi grafik CSS
  // Jika tidak ada penjualan sama sekali, defaultnya jadi array kosong [0,0,0...]
  const chartData = maxDailyRevenue > 0 
    ? dailyRevenue.map(amount => Math.round((amount / maxDailyRevenue) * 100))
    : dailyRevenue;

  const rawDailyRevenue = dailyRevenue; // Simpan nominal aslinya untuk tooltip

  // Helper Waktu
  const formatTimeAgo = (date: Date) => {
    const diff = Math.floor((new Date().getTime() - date.getTime()) / 1000); 
    if (diff < 60) return "Baru saja";
    if (diff < 3600) return `${Math.floor(diff / 60)} menit yang lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam yang lalu`;
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  };

  // 6. Susun data untuk dikirim ke UI
  const dashboardStats = {
    totalSaldo: totalRevenue,
    totalPenjualan: totalSales,
    totalProdukAktif: totalProducts,
    chartHeights: chartData, // [10, 50, 100, 20, 0, 0, 80] dll
    rawChartAmounts: rawDailyRevenue, // [10000, 50000, 100000, 20000, 0, 0, 80000] dll
    recentActivities: recentOrders.map(order => ({
      id: order.id,
      type: "order" as const,
      title: `Pesanan ${order.status === "paid" ? "Berhasil" : order.status === "pending" ? "Baru" : "Gagal"} #${order.id.slice(0,6)}`,
      description: `${order.customerName} memproses ${order.items[0]?.product?.title || "Produk dihapus"}`,
      time: formatTimeAgo(order.createdAt),
      amount: order.totalAmount,
      amountType: order.status === "paid" ? "plus" as const : "minus" as const
    }))
  };

  return <DashboardClient stats={dashboardStats} />;
}