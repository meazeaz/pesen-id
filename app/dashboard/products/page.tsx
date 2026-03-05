import { getMyProducts } from "@/app/actions/product"; // 👈 Import mesin kita
import ProductListClient from "./ProductListClient";

export default async function ProductsPage() {
  
  // 1. Ambil HANYA produk milik user yang login menggunakan Server Action kita
  const dbProducts = await getMyProducts();

  // 2. Sesuaikan format data agar cocok dengan tabel di Client
  const formattedProducts = dbProducts.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    price: p.price,
    status: p.status,
    sales: p.salesCount || 0, // 👈 Ambil dari database asli
    image: "📦", // Set emoji default sementara
  }));

  // 3. Oper data ke komponen Client
  return <ProductListClient initialProducts={formattedProducts} />;
}