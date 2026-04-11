"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers"; // 👈 KITA IMPORT ALAT PENGHAPUS COOKIE

export async function saveNewUsername(formData: FormData) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return { error: "Akses ditolak. Silakan login kembali." };
  }

  const username = formData.get("username") as string;

  if (!username) {
    return { error: "Username tidak boleh kosong" };
  }

  try {
    // 1. CEK DULU: Apakah username ini sudah ada yang punya?
    const existingUser = await prisma.user.findFirst({
      where: { username: username }
    });

    // Jika sudah ada yang pakai, tolak dan kirim pesan error (Fitur Username Unik)
    if (existingUser) {
      return { error: "Maaf, link toko ini sudah dipakai orang lain. Coba variasi nama lain!" };
    }

    // 2. SIMPAN JIKA BELUM ADA (Unik)
    await prisma.user.update({
      where: { email: session.user.email },
      data: { 
        username: username 
      }
    });

    // 3. 👈 KUNCI PERBAIKAN: HAPUS TIKET ONBOARDING!
    // Agar Middleware (Satpam) mengizinkan kita masuk ke Dashboard
    const cookieStore = await cookies();
    cookieStore.delete("pesen_onboarding");

    return { success: true };
  } catch (error) {
    console.error("Gagal simpan username:", error);
    return { error: "Terjadi kesalahan pada server." };
  }
}