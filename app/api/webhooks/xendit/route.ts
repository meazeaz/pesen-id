import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const orderId = data.external_id as string;
    const status = data.status;

    if (!orderId) return NextResponse.json({ message: "Data tidak lengkap" }, { status: 400 });

    if (status === "PAID") {
      
      // 👇 CEK APAKAH INI PEMBAYARAN UPGRADE PRO?
      if (orderId.startsWith("UPG-")) {
        const userId = orderId.split("-")[1];

        // Hitung 30 Hari dari sekarang
        const dateNow = new Date();
        const proUntilDate = new Date(dateNow.getTime() + 30 * 24 * 60 * 60 * 1000); 

        await prisma.user.update({
          where: { id: userId },
          data: { 
            isPro: true,
            proUntil: proUntilDate // Set masa kadaluarsa!
          }
        });

        await prisma.notification.create({
          data: {
            userId: userId,
            title: "Upgrade Pro Berhasil! 👑",
            message: `Selamat! Akun Anda menjadi Pro Creator selama 30 Hari (hingga ${proUntilDate.toLocaleDateString('id-ID')}).`,
            type: "success",
          }
        });

        console.log(`👑 User ${userId} UPGRADE KE PRO selama 30 Hari!`);
        return NextResponse.json({ message: "Upgrade sukses" }, { status: 200 });
      }

      // LOGIKA PEMBELIAN PRODUK BIASA
      const order = await prisma.order.update({
        where: { id: orderId },
        data: { status: "paid", paidAt: new Date(), paymentId: data.id }
      });

      await prisma.notification.create({
        data: {
          userId: order.userId,
          title: "Pesanan Baru Masuk! 🎉",
          message: `Hore! Ada pesanan lunas sebesar Rp ${order.totalAmount} dari ${order.customerName}.`,
          type: "order",
        }
      });
      console.log(`✅ Order ${orderId} LUNAS!`);
      
    } else if (status === "EXPIRED" || status === "FAILED") {
       if (!orderId.startsWith("UPG-")) {
         await prisma.order.update({
           where: { id: orderId },
           data: { status: status === "EXPIRED" ? "expired" : "failed" }
         });
       }
    }

    return NextResponse.json({ message: "Webhook diproses" }, { status: 200 });

  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}