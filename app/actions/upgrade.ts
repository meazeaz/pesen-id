"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function createUpgradeCheckout(baseUrl: string) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) return { success: false, message: "Harap login terlebih dahulu." };

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) return { success: false, message: "User tidak ditemukan." };
    if (user.isPro) return { success: false, message: "Anda masih dalam masa langganan Pro!" };

    const upgradeId = `UPG-${user.id}-${Date.now()}`;
    const amount = 49000; 

    const secretKey = process.env.XENDIT_SECRET_KEY + ':'; 
    const encodedKey = Buffer.from(secretKey).toString('base64');

    const response = await fetch('https://api.xendit.co/v2/invoices', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encodedKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        external_id: upgradeId,
        amount: amount,
        description: `Langganan Pro Creator (1 Bulan) - ${user.username}`,
        customer: {
          given_names: user.name || user.username,
          email: user.email
        },
        success_redirect_url: `${baseUrl}/dashboard?upgrade=success`,
        failure_redirect_url: `${baseUrl}/dashboard/settings`
      })
    });

    const xenditData = await response.json();

    if (!response.ok) {
      console.error("Xendit Error:", xenditData);
      return { success: false, message: "Gagal membuat tagihan Xendit." };
    }

    return { success: true, invoiceUrl: xenditData.invoice_url };

  } catch (err) {
    console.error("Upgrade Checkout Error:", err);
    return { success: false, message: "Terjadi kesalahan sistem." };
  }
}

export async function forceUpgradeToPro() {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) return { success: false, message: "Belum login" };

    // Hitung 30 Hari dari sekarang
    const dateNow = new Date();
    const proUntilDate = new Date(dateNow.getTime() + 30 * 24 * 60 * 60 * 1000);

    // Paksa update status isPro dan durasinya
    await prisma.user.update({
      where: { email: session.user.email },
      data: { 
        isPro: true,
        proUntil: proUntilDate
      }
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Gagal menggunakan cheat" };
  }
}