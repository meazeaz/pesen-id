import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // 1. Tangkap "Surat Laporan" yang dikirim otomatis oleh server Xendit
    const data = await req.json();
    console.log("Menerima Laporan dari Xendit:", data);

    // 2. Ambil ID Pesanan (Xendit menyebutnya external_id) dan Statusnya
    const orderId = data.external_id;
    const xenditStatus = data.status; // Biasanya isinya "PAID" atau "EXPIRED"

    // 3. Jika tidak ada orderId, tolak laporannya
    if (!orderId) {
      return NextResponse.json({ message: "Data tidak lengkap" }, { status: 400 });
    }

    // 4. UPDATE DATABASE OTOMATIS BERDASARKAN LAPORAN XENDIT!
    if (xenditStatus === "PAID") {
      // Jika Xendit lapor sudah dibayar, ubah status di DB jadi 'paid'
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "paid" }
      });
      console.log(`✅ HORE! Pesanan ${orderId} otomatis lunas!`);
      
    } else if (xenditStatus === "EXPIRED" || xenditStatus === "FAILED") {
      // Jika Xendit lapor waktu habis / batal, ubah status di DB jadi 'failed'
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "failed" }
      });
      console.log(`❌ YAHH! Pesanan ${orderId} gagal/expired.`);
    }

    // 5. Wajib balas pesan Xendit dengan "Oke, laporannya sudah diterima" 
    // agar Xendit tidak nge-spam kirim laporan terus-terusan.
    return NextResponse.json({ message: "Webhook sukses diterima" }, { status: 200 });

  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}