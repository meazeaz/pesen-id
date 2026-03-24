"use server";

import { prisma } from "@/lib/prisma";

export async function createCheckout(data: {
  productId: string;
  customerName: string;
  customerEmail: string;
  baseUrl: string; // 👈 Tambahan agar Xendit tahu harus melempar pembeli kemana setelah sukses
}) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: data.productId },
      include: { user: true },
    });

    if (!product) return { success: false, message: "Produk tidak ditemukan." };

    const orderId = `TRX-${Date.now()}`;
    const amount = product.price;

    // 1. Simpan pesanan ke Database kita (Prisma)
    await prisma.order.create({
      data: {
        id: orderId,
        userId: product.user.id,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        totalAmount: amount,
        status: "pending",
        items: {
          create: {
            productId: product.id,
            price: amount,
          }
        }
      },
    });

    // 2. Tembak data ke Xendit untuk membuat Halaman Pembayaran (Invoice)
    const secretKey = process.env.XENDIT_SECRET_KEY + ':'; 
    const encodedKey = Buffer.from(secretKey).toString('base64');

    const response = await fetch('https://api.xendit.co/v2/invoices', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encodedKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        external_id: orderId,
        amount: amount,
        description: `Pembelian: ${product.title}`,
        customer: {
          given_names: data.customerName,
          email: data.customerEmail
        },
        // 👇 Xendit akan otomatis mengarahkan pembeli ke sini setelah sukses bayar!
        success_redirect_url: `${data.baseUrl}/checkout/success/${orderId}`,
        failure_redirect_url: data.baseUrl
      })
    });

    const xenditData = await response.json();

    if (!response.ok) {
      console.error("Xendit Error:", xenditData);
      return { success: false, message: "Gagal membuat invoice di Xendit." };
    }

    // 3. Kembalikan URL pembayaran Xendit ke frontend
    return { 
      success: true, 
      invoiceUrl: xenditData.invoice_url 
    };

  } catch (err) {
    console.error("Checkout Error:", err);
    return { success: false, message: "Terjadi kesalahan pada mesin kasir." };
  }
}