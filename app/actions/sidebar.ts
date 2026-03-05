"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function getSidebarData() {
  const session = await getServerSession();
  if (!session?.user?.email) return null;

  try {
    // 1. Ambil username untuk link toko
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { username: true } 
    });

    // 2. Siapkan kerangka Data. 
    // CATATAN: Karena tabel Pesanan (Order) dan Dompet belum kita buat struktur akhirnya,
    // kita gunakan angka 0 sementara. Nanti kita tinggal ganti dengan query database sungguhan.
    return {
      username: user?.username || "",
      terjual: 0, // Nanti diganti dengan: await prisma.order.count(...)
      saldo: 0    // Nanti diganti dengan total saldo dompet
    };
  } catch (error) {
    console.error("Gagal mengambil data sidebar:", error);
    return null;
  }
}