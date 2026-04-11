"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";

export async function requestWithdrawal(amount: number) {
  const session = await getServerSession();
  if (!session?.user?.email) return { success: false, message: "Akses ditolak" };

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { bankAccounts: true }
  });

  if (!user || user.bankAccounts.length === 0) {
    return { success: false, message: "Harap tambahkan rekening di pengaturan dulu!" };
  }

  // 1. Hitung Saldo Real
  const incomeData = await prisma.order.aggregate({
    where: { userId: user.id, status: "paid" },
    _sum: { totalAmount: true },
  });
  
  const withdrawnData = await prisma.withdrawal.aggregate({
    where: { userId: user.id, status: { in: ["PENDING", "SUCCESS"] } },
    _sum: { amount: true },
  });

  const totalIncome = incomeData._sum.totalAmount || 0;
  const alreadywithdrawn = withdrawnData._sum.amount || 0;
  const currentBalance = totalIncome - alreadywithdrawn;

  if (amount > currentBalance) {
    return { success: false, message: "Saldo tidak mencukupi!" };
  }

  if (amount < 10000) {
    return { success: false, message: "Minimal penarikan Rp 10.000" };
  }

  // 2. Buat Request
  const primaryBank = user.bankAccounts[0];
  try {
    // A. Catat Penarikan
    await prisma.withdrawal.create({
      data: {
        userId: user.id,
        amount: amount,
        bankName: primaryBank.bankName,
        accountNumber: primaryBank.accountNumber,
        holderName: primaryBank.holderName,
        status: "PENDING"
      }
    });

    // B. Kirim Notifikasi (Ditaruh di sini agar aman)
    await prisma.notification.create({
      data: {
        userId: user.id, 
        title: "Permintaan Penarikan Dana",
        message: `Permintaan pencairan dana sebesar Rp ${amount} sedang diproses oleh Admin.`,
        type: "info",
      }
    });

    revalidatePath("/dashboard/wallet");
    return { success: true, message: "Permintaan dikirim! Tunggu konfirmasi admin." };
  } catch (error) {
    return { success: false, message: "Gagal memproses permintaan." };
  }
}