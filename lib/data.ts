// lib/data.ts

// 1. Kita definisikan Tipe Data (biar TypeScript senang)
export type UserProfile = {
  username: string;
  displayName: string;
  bio: string;
  theme: string;
  products: {
    id: string;
    title: string;
    price: number;
    image: string;
  }[];
};

// 2. Simulasi Database (Data Dummy)
// Nanti ini diganti dengan database beneran
const DUMMY_DB = [
  {
    username: "ilham",
    displayName: "Ilham Ganteng",
    bio: "Web Developer yang suka ngopi. Beli karyaku disini ya!",
    theme: "bg-slate-900", // Ceritanya tema gelap
    products: [
      { id: "1", title: "E-book Belajar Next.js", price: 50000, image: "📘" },
      { id: "2", title: "Template Website Sekolah", price: 150000, image: "🏫" },
      { id: "3", title: "Jasa Curhat Coding", price: 25000, image: "☕" },
    ],
  },
];

// 3. Fungsi Fetching Data (Simulasi Server)
// Fungsi ini 'async' karena ceritanya butuh waktu buat ambil data dari server
export async function getUserByUsername(username: string): Promise<UserProfile | null> {
  // Kita pura-pura loading 1 detik biar kerasa kayak aplikasi beneran
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Cari data di array DUMMY_DB
  const user = DUMMY_DB.find((u) => u.username === username);

  return user || null;
}