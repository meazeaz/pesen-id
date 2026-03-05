"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function saveNewUsername(formData: FormData) {
  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string; // 👈 Tangkap password baru

  // 1. Cek apakah username sudah dipakai
  const existingUser = await prisma.user.findUnique({
    where: { username: username }
  });

  if (existingUser) {
    return { success: false, message: "Yahh, username ini sudah dipakai orang lain." };
  }

  // 2. Hash Password (Kita simpan di field 'name' sesuai arsitektur kita sebelumnya)
  const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

  // 3. Update username & password ke database
  await prisma.user.update({
    where: { email: email },
    data: { 
      username: username.toLowerCase().replace(/\s/g, ""),
      name: hashedPassword // Simpan hash password agar dia bisa login manual nanti
    }
  });

  // 4. Hancurkan tiket onboarding agar bisa masuk Dashboard
  const cookieStore = await cookies();
  cookieStore.delete("pesen_onboarding");

  redirect("/dashboard");
}