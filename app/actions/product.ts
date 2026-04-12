"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth"; 

export async function getMyProducts() {
  const session = await getServerSession();
  if (!session?.user?.email) return [];

  try {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return [];

    const products = await prisma.product.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" } 
    });

    return products;
  } catch (error) {
    console.error("Gagal mengambil produk:", error);
    return [];
  }
}

export async function createProduct(data: any) {
  const session = await getServerSession();
  if (!session?.user?.email) return { success: false, message: "Akses ditolak" };

  const user = await prisma.user.findUnique({ 
    where: { email: session.user.email },
    include: { _count: { select: { products: true } } } 
  });
  if (!user) return { success: false, message: "User tidak ditemukan" };

  const isPro = Boolean(user.isPro);
  
  // LIMIT JUMLAH PRODUK
  if (!isPro && user._count.products >= 10) {
    return { 
      success: false, 
      message: "Limit tercapai! Akun Starter maksimal 10 produk. Upgrade ke Pro untuk unlimited." 
    };
  }

  // LIMIT UKURAN FILE
  const fileSize = Number(data.fileSize ?? 0);
  const maxFileSize = isPro ? 200 * 1024 * 1024 : 32 * 1024 * 1024; // 200MB vs 32MB
  if (data.fileUrl && fileSize > maxFileSize) {
    return {
      success: false,
      message: !isPro
        ? "Batas file untuk Starter hanya 32MB. Upgrade ke Pro Creator untuk upload hingga 200MB."
        : "Ukuran file melebihi batas 200MB."
    };
  }

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
        imageUrl: data.imageUrl, 
        fileUrl: data.fileUrl,   
      },
    });

    revalidatePath("/dashboard/products");
    return { success: true };
  } catch (error) {
    console.error("Gagal menambah produk:", error);
    return { success: false, message: "Terjadi kesalahan sistem saat menyimpan produk." };
  }
}

export async function deleteProduct(id: string) {
  const session = await getServerSession();
  if (!session?.user?.email) return { success: false, message: "Akses ditolak" };

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return { success: false, message: "User tidak ditemukan" };

  try {
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

export async function updateProduct(id: string, data: any) {
  const session = await getServerSession();
  if (!session?.user?.email) return { success: false, message: "Akses ditolak" };

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return { success: false, message: "User tidak ditemukan" };

  const isPro = Boolean(user.isPro);
  const fileSize = Number(data.fileSize ?? 0);
  const maxFileSize = isPro ? 200 * 1024 * 1024 : 32 * 1024 * 1024;

  if (data.fileUrl && fileSize > maxFileSize) {
    return {
      success: false,
      message: !isPro
        ? "Batas file untuk Starter hanya 32MB. Upgrade ke Pro Creator untuk upload hingga 200MB."
        : "Ukuran file melebihi batas 200MB."
    };
  }

  try {
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
        imageUrl: data.imageUrl,
        fileUrl: data.fileUrl,
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