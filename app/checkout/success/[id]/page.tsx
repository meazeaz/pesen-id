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
      review: true, // Cek apakah pesanan ini sudah pernah diulas
    },
  });

  // Jika pesanan tidak ada, tampilkan halaman 404
  if (!order) {
    return notFound();
  }

  // 2. Siapkan data komplit untuk Resi Digital UI
  const orderData = {
    id: order.id,
    customerName: order.customerName,
    customerEmail: order.customerEmail, // 👈 Tambahan Email
    date: order.createdAt.toISOString(), // 👈 Tambahan Tanggal
    amount: order.totalAmount,
    status: order.status,
    productId: order.items[0]?.productId || "",
    productTitle: order.items[0]?.product?.title || "Produk Digital",
    fileUrl: order.items[0]?.product?.fileUrl || "", // 👈 PENTING: Link File untuk di-download
    userId: order.userId, 
    hasReviewed: !!order.review, 
  };

  return <CheckoutSuccessClient order={orderData} />;
}