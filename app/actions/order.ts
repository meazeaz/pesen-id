"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth"; // 👈 Kunci utama deteksi login

// ==========================================
// 1. FUNGSI AMBIL DAFTAR PESANAN (KHUSUS PEMILIK TOKO)
// ==========================================
export async function getMyOrders() {
  const session = await getServerSession();
  if (!session?.user?.email) return [];

  try {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return [];

    // HANYA ambil pesanan yang masuk ke toko user ini (berdasarkan userId)
    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: {
            product: true, // Sertakan info produknya
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

  const newOrder = await prisma.order.create({
    data: {
      userId: product.userId, // Pesanan ini masuk ke "KTP" pemilik produk
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
// 3. FUNGSI UBAH STATUS PESANAN (UNTUK PEMILIK TOKO)
// ==========================================
export async function updateOrderStatus(orderId: string, newStatus: string) {
  const session = await getServerSession();
  if (!session?.user?.email) return { success: false, message: "Akses ditolak" };

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return { success: false, message: "User tidak ditemukan" };

  try {
    // KEAMANAN GANDA: Pastikan hanya pemilik toko yang bisa ubah status pesanan ini
    await prisma.order.updateMany({
      where: { 
        id: orderId,
        userId: user.id // Hanya update jika ID Pesanan DAN ID Pemilik Toko cocok!
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