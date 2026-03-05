"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import crypto from "crypto"; 

// ==========================================
// 1. FUNGSI SIMPAN PROFIL TOKO & TAMPILAN
// ==========================================
export async function saveProfile(data: { 
  name: string; 
  bio: string; 
  email: string;
  layout: string; 
  bgType: string; 
  bgValue: string;
  font: string; 
  rounded: string; 
  shadow: string;
  blocks: any; // Menerima JSON array dari susunan link
}) {
  try {
    // Cari user berdasarkan email dari sesi login
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) return { success: false, message: "User tidak ditemukan" };

    // Update Nama di tabel User
    await prisma.user.update({
      where: { id: user.id },
      data: { name: data.name },
    });

    // Update Bio, Tampilan, dan Blok Konten di tabel Profile
    await prisma.profile.upsert({
      where: { userId: user.id },
      update: { 
        bio: data.bio,
        layout: data.layout,
        bgType: data.bgType,
        bgValue: data.bgValue,
        font: data.font,
        rounded: data.rounded,
        shadow: data.shadow,
        blocks: data.blocks 
      },
      create: { 
        userId: user.id, 
        bio: data.bio,
        layout: data.layout,
        bgType: data.bgType,
        bgValue: data.bgValue,
        font: data.font,
        rounded: data.rounded,
        shadow: data.shadow,
        blocks: data.blocks 
      },
    });

    revalidatePath("/dashboard/settings");
    return { success: true, message: "Pengaturan berhasil disimpan!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Gagal menyimpan pengaturan." };
  }
}

// ==========================================
// 2. FUNGSI TAMBAH REKENING BANK
// ==========================================
export async function addBankAccount(data: { bankName: string; accountNumber: string; holderName: string; email: string }) {
  try {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) return { success: false, message: "User tidak ditemukan" };

    await prisma.bankAccount.create({
      data: {
        userId: user.id,
        bankName: data.bankName,
        accountNumber: data.accountNumber,
        holderName: data.holderName,
      },
    });

    revalidatePath("/dashboard/settings");
    return { success: true, message: "Rekening berhasil ditambahkan!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Gagal menambahkan rekening." };
  }
}

// ==========================================
// 3. FUNGSI HAPUS REKENING
// ==========================================
export async function deleteBankAccount(id: string) {
  try {
    await prisma.bankAccount.delete({ where: { id } });
    revalidatePath("/dashboard/settings");
    return { success: true, message: "Rekening berhasil dihapus." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Gagal menghapus rekening." };
  }
}

// ==========================================
// 4. FUNGSI BARU: UPDATE / SETEL PASSWORD
// ==========================================
export async function updatePassword(formData: FormData) {
  const email = formData.get("email") as string;
  const newPassword = formData.get("newPassword") as string;

  if (!email || !newPassword || newPassword.length < 6) {
    return { success: false, message: "Password minimal 6 karakter." };
  }

  // Enkripsi password baru
  const hashedPassword = crypto.createHash("sha256").update(newPassword).digest("hex");

  try {
    // Simpan ke database
    await prisma.user.update({
      where: { email: email },
      data: { password: hashedPassword } // 👈 UBAH 'name' MENJADI 'password' DI SINI
    });

    return { success: true, message: "Password berhasil disetel! Sekarang kamu bisa login manual." };
  } catch (error) {
    console.error("Gagal update password:", error);
    return { success: false, message: "Terjadi kesalahan server saat menyimpan password." };
  }
}

// ==========================================
// 5. FUNGSI AMBIL DATA SPESIFIK USER (MULTI-TENANT)
// ==========================================
export async function getUserSettings(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      include: {
        profile: true, // Ambil data bio dan tampilan dari tabel profile
        bankAccounts: true // Ambil data rekening bank
      }
    });

    if (!user) return null;

    return {
      name: user.name || "",
      username: user.username || "",
      bio: user.profile?.bio || "",
      // Tarik pengaturan tampilan (berikan nilai default jika masih kosong di DB)
      layout: user.profile?.layout || "center",
      bgType: user.profile?.bgType || "gradient",
      bgValue: user.profile?.bgValue || "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
      font: user.profile?.font || "font-sans",
      rounded: user.profile?.rounded || "lg",
      shadow: user.profile?.shadow || "md",
      // Tarik blok konten (parse JSON-nya)
      blocks: user.profile?.blocks ? (user.profile.blocks as any) : [],
      banks: user.bankAccounts || []
    };
  } catch (error) {
    console.error("Gagal mengambil data user:", error);
    return null;
  }
}