"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";

// ==========================================
// 1. FUNGSI AMBIL DAFTAR PESANAN (KHUSUS PEMILIK TOKO)
// ==========================================
export async function getMyOrders() {
  const session = await getServerSession();
  if (!session?.user?.email) return [];

  try {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return [];

    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return orders;
  } catch (error) {
    console.error("Gagal mengambil daftar pesanan:", error);
    return [];
  }
}

// ==========================================
// 2. FUNGSI MEMBUAT PESANAN (UNTUK PEMBELI)
// ==========================================
export async function createOrder(formData: FormData) {
  const productId = formData.get("productId") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const price = Number(formData.get("price"));

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new Error("Gagal membuat pesanan: Produk tidak ditemukan");
  }

  // 👇 PERHATIKAN: Saat pertama kali dibuat, statusnya selalu "pending"
  // Karena pembeli baru niat bayar, belum keluarin uang.
  const newOrder = await prisma.order.create({
    data: {
      userId: product.userId, 
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      totalAmount: price,
      status: "pending", 
      items: {
        create: {
          productId: product.id,
          price: product.price,
        },
      },
    },
  });

  redirect(`/checkout/success/${newOrder.id}`);
}

// ==========================================
// 3. FUNGSI UBAH STATUS MANUAL (OLEH PENJUAL DI DASHBOARD)
// ==========================================
export async function updateOrderStatus(orderId: string, newStatus: string) {
  const session = await getServerSession();
  if (!session?.user?.email) return { success: false, message: "Akses ditolak" };

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return { success: false, message: "User tidak ditemukan" };

  try {
    await prisma.order.updateMany({
      where: { 
        id: orderId,
        userId: user.id 
      },
      data: { status: newStatus },
    });
    
    revalidatePath("/dashboard/orders");
    return { success: true };
  } catch (error) {
    console.error("Gagal update:", error);
    return { success: false, message: "Gagal mengupdate" };
  }
}