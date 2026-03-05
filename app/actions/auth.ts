"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";

// ==========================================
// 1. FUNGSI REGISTRASI (REGISTER)
// ==========================================
export async function registerUser(formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // 1. Cek apakah email atau username sudah dipakai
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { username: username }
        ]
      }
    });

    if (existingUser) {
      return { success: false, message: "Email atau Username sudah terdaftar!" };
    }

    // 2. Buat User Baru di Database (Catatan: Di app sungguhan, password HARUS di-hash pakai bcrypt/argon2. Untuk contoh ini, kita simpan langsung/hash sederhana)
    // Di sini kita hash sederhana menggunakan crypto bawaan Node.js untuk keamanan dasar
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        // Kita menggunakan field 'name' sementara untuk menyimpan hash password
        // (Idealnya schema Prisma Anda ditambah field 'password')
        name: hashedPassword, 
      }
    });

    // 3. Buat default Profile untuk user baru
    await prisma.profile.create({
      data: {
        userId: newUser.id,
        bio: `Halo! Saya ${username}. Selamat datang di toko saya.`,
        themeId: "custom",
      }
    });

    // 4. Langsung Login-kan (Set Cookie)
    const cookieStore = await cookies();
    cookieStore.set("auth_session", newUser.id, {
      httpOnly: true, // Aman dari XSS
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Gagal mendaftar:", error);
    return { success: false, message: "Terjadi kesalahan server." };
  }
}

// ==========================================
// 2. FUNGSI MASUK (LOGIN)
// ==========================================
export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    // Cari user dengan email DAN password (yang disimpan di field 'name') yang cocok
    const user = await prisma.user.findFirst({
      where: {
        email: email,
        name: hashedPassword,
      }
    });

    if (!user) {
      return { success: false, message: "Email atau Password salah." };
    }

    // Set Cookie Sesi
    const cookieStore = await cookies();
    cookieStore.set("auth_session", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Gagal login:", error);
    return { success: false, message: "Terjadi kesalahan server." };
  }
}

// ==========================================
// 3. FUNGSI KELUAR (LOGOUT)
// ==========================================
export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_session");
  redirect("/login");
}