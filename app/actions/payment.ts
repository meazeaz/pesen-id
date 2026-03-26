"use server"; // Ini adalah Server Action di Next.js

import { prisma } from "@/lib/prisma";
import { invoiceClient } from "@/lib/xendit-client";

// Fungsi untuk membuat invoice baru
export async function createInvoice(orderId: string) {
  try {
    // 1. Ambil data pesanan dari database
    const order = await prisma.order.findUnique({
      where: { id: orderId }
    });

    if (!order) {
      return { error: "Pesanan tidak ditemukan" };
    }

    // 2. Buat invoice di Xendit (Format SDK Terbaru: pakai 'data' dan camelCase)
    const invoice = await invoiceClient.createInvoice({
      data: {
        externalId: order.id,              // ID pesanan kita (contoh: "ckzj3...")
        amount: order.totalAmount,         // Jumlah yang harus dibayar
        payerEmail: order.customerEmail,   // Email pembeli
        description: `Pesanan ${order.id}`,// Deskripsi
        invoiceDuration: 86400,            // Kadaluarsa 24 jam (dalam detik)
      }
    });

    // 3. Simpan ID invoice dari Xendit ke database (untuk keperluan tracking)
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentId: invoice.id }
    });

    // 4. Kembalikan URL pembayaran ke frontend (Format terbaru: invoiceUrl)
    return { 
      success: true, 
      invoiceUrl: invoice.invoiceUrl 
    };

  } catch (error) {
    console.error("Gagal membuat invoice:", error);
    return { error: "Gagal membuat invoice pembayaran" };
  }
}