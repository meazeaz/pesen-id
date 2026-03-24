import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import StatsClient from "./StatsClient";

export default async function StatsPage() {
  const session = await getServerSession();
  
  if (!session?.user?.email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Silakan login terlebih dahulu.</p>
      </div>
    );
  }

  // 1. Dapatkan Data User
  const user = await prisma.user.findUnique({ 
    where: { email: session.user.email },
    include: { profile: true } 
  });
  if (!user) return null;

  // 2. Tarik Data Views/Clicks (Ini nanti akan bergerak kalau sistem CCTV Analytics sudah kita buat)
  const views = user.profile?.views || 0;
  const clicks = user.profile?.clicks || 0;
  const ctr = views > 0 ? ((clicks / views) * 100).toFixed(1) + "%" : "0%";

  // Ambil Total Pendapatan Uang Real-Time
  const revenueData = await prisma.order.aggregate({
    where: { userId: user.id, status: "paid" },
    _sum: { totalAmount: true },
  });
  const revenue = revenueData._sum.totalAmount || 0;

  // ==========================================================
  // 3. [PERBAIKAN] HITUNG TOP PRODUK DARI TRANSAKSI ASLI
  // ==========================================================
  // Ambil semua nota pesanan yang SUKSES (Paid) milik user ini
  const paidOrdersList = await prisma.order.findMany({
    where: { userId: user.id, status: "paid" },
    include: { items: { include: { product: true } } }
  });

  // Hitung produk mana yang paling banyak muncul di nota sukses
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hitungPenjualan: any = {};

  paidOrdersList.forEach(order => {
    order.items.forEach(item => {
      if (item.product) {
        const idProduk = item.productId;
        if (!hitungPenjualan[idProduk]) {
          hitungPenjualan[idProduk] = {
            title: item.product.title,
            category: item.product.category || "Produk",
            terjual: 0
          };
        }
        hitungPenjualan[idProduk].terjual += 1; // Tambah +1 setiap ada di nota
      }
    });
  });

  // Ubah formatnya untuk dikirim ke layar (Diurutkan dari yang paling laku)
  const formattedTopLinks = Object.values(hitungPenjualan)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .sort((a: any, b: any) => b.terjual - a.terjual)
    .slice(0, 5) // Ambil 5 ranking teratas saja
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((p: any) => ({
      title: p.title,
      clicks: p.terjual, // Variabel clicks di UI kita pakai untuk menampilkan angka Terjual
      type: p.category
    }));

  // ==========================================================
  // 4. MESIN GRAFIK PENDAPATAN 14 HARI (100% REAL DATA)
  // ==========================================================
  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 13);

  const recentOrders = await prisma.order.findMany({
    where: {
      userId: user.id,
      status: "paid",
      createdAt: { gte: fourteenDaysAgo },
    },
    select: { createdAt: true, totalAmount: true },
  });

  const chartMap = new Map();
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
    chartMap.set(dateStr, { date: dateStr, revenue: 0, sales: 0 });
  }

  recentOrders.forEach((order) => {
    const dateStr = order.createdAt.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
    if (chartMap.has(dateStr)) {
      const existing = chartMap.get(dateStr);
      existing.revenue += order.totalAmount;
      existing.sales += 1;
    }
  });

  const trendData = Array.from(chartMap.values());
  const maxRevenue = Math.max(...trendData.map(d => d.revenue), 1);
  const maxSales = Math.max(...trendData.map(d => d.sales), 1);

  const chartData = trendData.map(d => ({
    date: d.date,
    revenue: d.revenue,
    sales: d.sales,
    revHeight: Math.round((d.revenue / maxRevenue) * 100),
    salesHeight: Math.round((d.sales / maxSales) * 100),
  }));

  // 5. Kalkulasi Sumber Traffic & Perangkat (Angkanya Menunggu Sistem CCTV)
  const trafficSources = [
    { id: "instagram", name: "Instagram", count: Math.round(views * 0.45), percent: views > 0 ? 45 : 0 },
    { id: "tiktok", name: "TikTok", count: Math.round(views * 0.28), percent: views > 0 ? 28 : 0 },
    { id: "direct", name: "Direct / WA", count: Math.round(views * 0.15), percent: views > 0 ? 15 : 0 },
  ];

  const devices = [
    { id: "mobile", name: "Mobile", count: Math.round(views * 0.85), percent: views > 0 ? 85 : 0, color: "bg-purple-500" },
    { id: "desktop", name: "Desktop", count: Math.round(views * 0.15), percent: views > 0 ? 15 : 0, color: "bg-blue-500" },
  ];

  const realStats = {
    views, clicks, ctr, revenue,
    topLinks: formattedTopLinks,
    chartData, trafficSources, devices
  };

  return <StatsClient stats={realStats} />;
}