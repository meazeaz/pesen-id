import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Webhook diterima dari Xendit:", data);

    const orderId = data.external_id;
    const status = data.status;

    if (!orderId) {
      return NextResponse.json({ message: "Data tidak lengkap" }, { status: 400 });
    }

    if (status === "PAID") {
      // 1. Update status pesanan jadi LUNAS
      const order = await prisma.order.update({
        where: { id: orderId },
        data: { 
          status: "paid", 
          paidAt: new Date(), 
          paymentId: data.id 
        }
      });

      // 2. Kirim Notifikasi ke Dashboard Kreator
      await prisma.notification.create({
        data: {
          userId: order.userId,
          title: "Pesanan Baru Masuk! 🎉",
          message: `Hore! Ada pesanan lunas sebesar Rp ${order.totalAmount} dari ${order.customerName}.`,
          type: "order",
        }
      });
      
      console.log(`✅ Order ${orderId} LUNAS!`);
      
    } else if (status === "EXPIRED") {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "expired" }
      });
      console.log(`⏰ Order ${orderId} KADALUARSA.`);

    } else if (status === "FAILED") {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "failed" }
      });
      console.log(`❌ Order ${orderId} GAGAL.`);
    }

    return NextResponse.json({ message: "Webhook sukses" }, { status: 200 });

  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}