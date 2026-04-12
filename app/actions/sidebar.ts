"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function getSidebarData() {
  const session = await getServerSession();
  
  if (!session?.user?.email) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) return null;

    const totalTerjual = await prisma.order.count({
      where: {
        userId: user.id,
        status: "paid"
      }
    });

    const totalPendapatan = await prisma.order.aggregate({
      where: {
        userId: user.id,
        status: "paid"
      },
      _sum: {
        totalAmount: true
      }
    });

    // 👇 KUNCI PERBAIKAN: Tambahkan isPro di sini agar Sidebar tahu!
    return {
      username: user.username,
      terjual: totalTerjual,
      saldo: totalPendapatan._sum.totalAmount || 0,
      isPro: user.isPro || false 
    };

  } catch (error) {
    console.error("Gagal mengambil data sidebar:", error);
    return { username: "", terjual: 0, saldo: 0, isPro: false };
  }
}