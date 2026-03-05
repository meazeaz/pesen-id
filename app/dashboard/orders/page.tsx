import { getMyOrders } from "@/app/actions/order"; // 👈 Import fungsi baru kita
import OrderListClient from "./OrderListClient";

export default async function OrdersPage() {
  
  // 1. Ambil HANYA data order milik user yang sedang login
  const dbOrders = await getMyOrders();

  // 2. Rapikan datanya agar formatnya pas dengan UI desain Anda
  const formattedOrders = dbOrders.map((order) => ({
    id: order.id,
    customer: order.customerName,
    email: order.customerEmail,
    phone: order.customerPhone || "-",
    // Generate avatar kartun otomatis berdasarkan nama customer
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(order.customerName)}`,
    amount: order.totalAmount,
    status: order.status,
    method: order.paymentMethod || "Website Pesen.id", 
    date: new Date(order.createdAt).toLocaleDateString("id-ID", {
      day: "numeric", month: "short", year: "numeric"
    }),
    product: order.items[0]?.product?.title || "Produk telah dihapus", 
  }));

  // 3. Panggil UI Anda dan berikan data yang sudah dirapikan
  return <OrderListClient initialOrders={formattedOrders} />;
}