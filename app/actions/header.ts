"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function getHeaderData() {
  const session = await getServerSession();
  if (!session?.user?.email) return null;

  try {
    // 1. Cari user berdasarkan email yang sedang login
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true, // KUNCI: Kita butuh ID-nya untuk mencari notifikasi
        name: true,
        username: true,
        image: true,
        role: true,
        isPro: true,
      }
    });

    if (!user) return null;

    // 2. Cari notifikasi berdasarkan ID user (Bukan email)
    const notifications = await prisma.notification.findMany({
      where: { userId: user.id }, 
      orderBy: { createdAt: "desc" },
      take: 5
    });

    // 3. Hitung yang belum dibaca berdasarkan ID user
    const unreadCount = await prisma.notification.count({
      where: { userId: user.id, isRead: false }
    });

    return { user, notifications, unreadCount };
  } catch (error) {
    console.error("Gagal ambil data header:", error);
    return null;
  }
}

export async function markNotificationsAsRead() {
    const session = await getServerSession();
    if (!session?.user?.email) return;

    try {
        const user = await prisma.user.findUnique({ 
          where: { email: session.user.email },
          select: { id: true }
        });
        
        if (!user) return;

        // Update notifikasi menjadi terbaca berdasarkan ID user
        await prisma.notification.updateMany({
            where: { userId: user.id, isRead: false },
            data: { isRead: true }
        });
        
        revalidatePath("/dashboard");
    } catch (error) {
        console.error("Gagal update notifikasi", error);
    }
}