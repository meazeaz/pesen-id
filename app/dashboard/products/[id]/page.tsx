  import { prisma } from "@/lib/prisma";
  import { getServerSession } from "next-auth"; // 👈 Tambahkan ini
  import EditProductClient from "./EditProductClient";

  type Props = {
    params: Promise<{ id: string }>;
  };

  export default async function EditProductPage({ params }: Props) {
    const session = await getServerSession();
    
    // Jika tidak ada sesi (belum login), kembalikan layar error
    if (!session?.user?.email) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl font-bold">Akses Ditolak</h1>
          <p>Anda harus login terlebih dahulu.</p>
        </div>
      );
    }

    // Cari siapa user yang sedang login ini
    const currentUser = await prisma.user.findUnique({ where: { email: session.user.email }});
    if (!currentUser) return null;

    const resolvedParams = await params;
    const productId = resolvedParams.id;
    
    // 👈 KEAMANAN GANDA: Cari produk berdasarkan ID-nya DAN ID Pemiliknya
    const product = await prisma.product.findUnique({
      where: { 
          id: productId,
          // Baris di bawah ini memastikan hanya si pemilik yang bisa melihat halaman editnya
          userId: currentUser.id 
      },
    });

    if (!product) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-900 p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">🚨 Akses Ditolak atau Produk Tidak Ditemukan!</h1>
          <p>Produk dengan ID: <b className="font-mono">{resolvedParams.id}</b> tidak ada, atau Anda bukan pemilik produk ini.</p>
        </div>
      );
    }

    // Oper data asli dari database ke UI
    return <EditProductClient initialData={product} />;
  }