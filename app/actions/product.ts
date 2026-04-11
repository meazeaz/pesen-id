"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth"; // 👈 Kunci utama untuk mendeteksi siapa yang login

// ==========================================
// 1. FUNGSI AMBIL DAFTAR PRODUK (READ)
// ==========================================
// Fungsi baru ini sangat penting untuk menampilkan produk di tabel Dashboard
export async function getMyProducts() {
  const session = await getServerSession();
  if (!session?.user?.email) return [];

  try {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return [];

    // HANYA ambil produk yang KTP-nya (userId) sama dengan user yang login
    const products = await prisma.product.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" } // Urutkan dari yang terbaru dibuat
    });

    return products;
  } catch (error) {
    console.error("Gagal mengambil produk:", error);
    return [];
  }
}

// ==========================================
// 2. FUNGSI UNTUK MENAMBAH PRODUK (CREATE)
// ==========================================
export async function createProduct(data: any) {
  // 1. Deteksi sesi user yang sedang login
  const session = await getServerSession();
  if (!session?.user?.email) return { success: false, message: "Akses ditolak" };

  // 2. Cari data user di database berdasarkan email sesi
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return { success: false, message: "User tidak ditemukan" };

  try {
    await prisma.product.create({
      data: {
        userId: user.id, 
        title: data.title,
        description: data.description,
        price: Number(data.price),
        discountPrice: data.discountPrice ? Number(data.discountPrice) : null,
        category: data.category,
        status: data.status || "active",
        features: data.features || [],
        imageUrl: data.imageUrl, // 👈 TAMBAHKAN INI
        fileUrl: data.fileUrl,   // 👈 TAMBAHKAN INI
      },
    });

    revalidatePath("/dashboard/products");
    return { success: true };
  } catch (error) {
    console.error("Gagal menambah produk:", error);
    return { success: false, message: "Terjadi kesalahan sistem saat menyimpan produk." };
  }
}

// ==========================================
// 3. FUNGSI UNTUK MENGHAPUS PRODUK (DELETE)
// ==========================================
export async function deleteProduct(id: string) {
  const session = await getServerSession();
  if (!session?.user?.email) return { success: false, message: "Akses ditolak" };

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return { success: false, message: "User tidak ditemukan" };

  try {
    // 👈 KEAMANAN GANDA: Gunakan deleteMany untuk memastikan ID Produk DAN ID Pemilik cocok!
    // Ini mencegah hacker menghapus produk orang lain.
    await prisma.product.deleteMany({
      where: { 
        id: id,
        userId: user.id 
      },
    });
    
    revalidatePath("/dashboard/products");
    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus produk:", error);
    return { success: false, message: "Gagal menghapus produk" };
  }
}

// ==========================================
// 4. FUNGSI UNTUK MENGEDIT PRODUK (UPDATE)
// ==========================================
export async function updateProduct(id: string, data: any) {
  const session = await getServerSession();
  if (!session?.user?.email) return { success: false, message: "Akses ditolak" };

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return { success: false, message: "User tidak ditemukan" };

  try {
    // 👈 KEAMANAN GANDA: Pastikan hanya pemilik asli yang bisa mengupdate datanya
    await prisma.product.updateMany({
      where: { 
        id: id,
        userId: user.id 
      },
      data: {
        title: data.title,
        description: data.description,
        price: Number(data.price),
        discountPrice: data.discountPrice ? Number(data.discountPrice) : null,
        category: data.category,
        status: data.status,
        features: data.features || [],
      },
    });

    revalidatePath("/dashboard/products");
    revalidatePath(`/dashboard/products/${id}`);
    
    return { success: true };
  } catch (error) {
    console.error("Gagal mengupdate produk:", error);
    return { success: false, message: "Gagal mengupdate produk" };
  }
}