"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function getSidebarData() {
  const session = await getServerSession();
  
  // Kalau belum login, kembalikan data kosong
  if (!session?.user?.email) return null;

  try {
    // 1. Cari KTP User yang sedang login
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) return null;

    // 2. Hitung Total Terjual (Dari jumlah nota yang statusnya "paid")
    const totalTerjual = await prisma.order.count({
      where: {
        userId: user.id,
        status: "paid"
      }
    });

    // 3. Hitung Saldo Aktif (Dari total uang di nota yang statusnya "paid")
    const totalPendapatan = await prisma.order.aggregate({
      where: {
        userId: user.id,
        status: "paid"
      },
      _sum: {
        totalAmount: true
      }
    });

    // 4. Kirim data aslinya ke komponen Sidebar UI Anda
    return {
      username: user.username,
      terjual: totalTerjual,
      saldo: totalPendapatan._sum.totalAmount || 0
    };

  } catch (error) {
    console.error("Gagal mengambil data sidebar:", error);
    return { username: "", terjual: 0, saldo: 0 };
  }
}