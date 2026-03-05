"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Fungsi untuk menyimpan ulasan dari pembeli
export async function createReview(data: {
  orderId: string;
  productId: string;
  userId: string;
  customerName: string;
  rating: number;
  comment: string;
}) {
  try {
    // Pastikan order ini belum pernah diulas sebelumnya
    const existingReview = await prisma.review.findUnique({
      where: { orderId: data.orderId }
    });

    if (existingReview) {
      return { success: false, message: "Pesanan ini sudah pernah diulas." };
    }

    // Simpan ulasan ke database
    await prisma.review.create({
      data: {
        orderId: data.orderId,
        productId: data.productId,
        userId: data.userId, // ID Pemilik Toko
        customerName: data.customerName,
        rating: data.rating,
        comment: data.comment,
      }
    });

    revalidatePath("/dashboard/reviews");
    return { success: true, message: "Ulasan berhasil dikirim!" };
  } catch (error) {
    console.error("Gagal menyimpan ulasan:", error);
    return { success: false, message: "Terjadi kesalahan server saat menyimpan ulasan." };
  }
}