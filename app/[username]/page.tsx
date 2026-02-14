import { getUserByUsername } from "@/lib/data";
import ProductCard from "@/components/ProductCard"; // Pastikan path ini benar sesuai struktur folder kamu
import { notFound } from "next/navigation";

// 1. Update Tipe Data: params sekarang adalah Promise
type PageProps = {
  params: Promise<{ username: string }>;
};

export default async function ProfilePage({ params }: PageProps) {
  // 2. WAJIB: Lakukan 'await' dulu sebelum mengambil property username
  const { username } = await params; 

  // 3. Fetch data menggunakan username yang sudah di-await
  const user = await getUserByUsername(username);

  // 4. Jika user tidak ditemukan
  if (!user) {
    return notFound();
  }

  // 5. Render HTML
  return (
    <main className={`min-h-screen ${user.theme} px-4 py-12 flex flex-col items-center`}>
      {/* Bagian Foto & Bio */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-gray-500 rounded-full mx-auto mb-4 border-4 border-white shadow-lg overflow-hidden">
             {/* Avatar Placeholder */}
             <div className="w-full h-full bg-gradient-to-tr from-blue-400 to-purple-500"></div>
        </div>
        <h1 className="text-2xl font-bold text-white">{user.displayName}</h1>
        <p className="text-gray-400 mt-2 max-w-sm">{user.bio}</p>
      </div>

      {/* Bagian List Produk */}
      <div className="w-full max-w-md space-y-4">
        {user.products.map((produk) => (
          <ProductCard
            key={produk.id}
            title={produk.title}
            price={produk.price}
            image={produk.image}
          />
        ))}
      </div>
    </main>
  );
}