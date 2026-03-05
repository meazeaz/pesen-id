import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import ReviewsClient from "./ReviewsClient";

export default async function ReviewsPage() {
  const session = await getServerSession();
  
  if (!session?.user?.email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Silakan login terlebih dahulu.</p>
      </div>
    );
  }

  // Cari ID User yang login
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return null;

  // Tarik semua ulasan yang masuk ke toko user ini
  const dbReviews = await prisma.review.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { product: true } // Tarik juga nama produk yang diulas
  });

  // Hitung Rata-rata Bintang (Rating)
  const totalReviews = dbReviews.length;
  const averageRating = totalReviews > 0
    ? (dbReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : "0.0";

  // Rapikan data untuk dikirim ke desain UI Anda
  const formattedReviews = dbReviews.map((r) => ({
    id: r.id,
    name: r.customerName,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(r.customerName)}`,
    rating: r.rating,
    product: r.product?.title || "Produk dihapus",
    comment: r.comment,
    date: r.createdAt.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
    likes: 0 // Default 0 karena belum ada fitur Like Ulasan di database
  }));

  return <ReviewsClient initialReviews={formattedReviews} averageRating={averageRating} />;
}