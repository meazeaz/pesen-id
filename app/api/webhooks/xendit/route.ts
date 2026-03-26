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

    // --- LOGIKA UPDATE STATUS OTOMATIS ---
    if (status === "PAID") {
      await prisma.order.update({
        where: { id: orderId },
        data: { 
          status: "paid", 
          paidAt: new Date(), 
          paymentId: data.id 
        }
      });
      console.log(`✅ Order ${orderId} LUNAS!`);
      
    } else if (status === "EXPIRED") {
      // Pembeli telat bayar / waktu habis
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "expired" }
      });
      console.log(`⏰ Order ${orderId} KADALUARSA.`);

    } else if (status === "FAILED") {
      // Pembayaran gagal oleh bank
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