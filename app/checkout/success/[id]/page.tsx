import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CheckoutSuccessClient from "./CheckoutSuccessClient";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CheckoutSuccessPage({ params }: Props) {
  const resolvedParams = await params;
  const orderId = resolvedParams.id;

  // 1. Cari data pesanan berdasarkan ID di URL
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: { include: { product: true } },
      review: true, // 👈 Cek apakah pesanan ini sudah pernah diulas
    },
  });

  // Jika pesanan tidak ada, tampilkan halaman 404
  if (!order) {
    return notFound();
  }

  // 2. Siapkan data untuk dikirim ke UI
  const orderData = {
    id: order.id,
    customerName: order.customerName,
    amount: order.totalAmount,
    status: order.status,
    productId: order.items[0]?.productId || "",
    productTitle: order.items[0]?.product?.title || "Produk Digital",
    userId: order.userId, // ID Pemilik Toko (Kreator)
    hasReviewed: !!order.review, // true jika sudah diulas, false jika belum
  };

  return <CheckoutSuccessClient order={orderData} />;
}