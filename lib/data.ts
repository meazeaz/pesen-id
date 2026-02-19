// lib/data.ts

// --- 1. Definisi Tipe Data ---

export type Product = {
  id: string;
  title: string;
  price: string;    // String agar mudah diformat (Rp ...)
  category: string; // Kategori untuk badge
  image: string;    // Emoji atau URL Gambar
  description: string; // Deskripsi lengkap produk
  features: string[];  // List keunggulan (misal: "Halaman PDF", "Video HD")
};

export type UserProfile = {
  username: string;
  name: string;
  bio: string;
  location: string;
  avatar: string;
  stats: {
    products: number;
    sales: number;
  };
  // ✅ MODIFIKASI BARU: Field Social Media (Opsional)
  socials?: {
    instagram?: string;
    tiktok?: string;
    whatsapp?: string;
    website?: string;
  };
  products: Product[];
  
};

// --- 2. Simulasi Database (Dummy Data Lengkap) ---
const DUMMY_DB: UserProfile[] = [
  {
    username: "ilham",
    name: "Ilham Ganteng",
    bio: "Web Developer yang suka ngopi. Beli karyaku disini ya!",
    location: "Jakarta, Indonesia",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ilham",
    stats: { products: 3, sales: 120 },
    
    
    // ✅ Data Social Media untuk Ilham
    socials: {
      instagram: "https://instagram.com/ilham",
      whatsapp: "https://wa.me/628123456789",
      website: "https://ilham.com",
    },
    
    products: [
      { 
        id: "1", 
        title: "E-book Belajar Next.js", 
        price: "Rp 50.000", 
        category: "E-book", 
        image: "📘",
        description: "Panduan lengkap belajar Next.js 14 dari nol sampai mahir. Membahas App Router, Server Components, dan integrasi Database.",
        features: ["150 Halaman PDF", "Source Code Project", "Update Gratis Selamanya"]
      },
      { 
        id: "2", 
        title: "Template Website Sekolah", 
        price: "Rp 150.000", 
        category: "Template", 
        image: "🏫",
        description: "Template website sekolah modern, responsif, dan mudah dikustomisasi. Cocok untuk SD, SMP, SMA.",
        features: ["Desain Responsif", "SEO Friendly", "Mudah Diedit"]
      },
      { 
        id: "3", 
        title: "Jasa Curhat Coding", 
        price: "Rp 25.000", 
        category: "Jasa", 
        image: "☕",
        description: "Stuck ngoding? Error merah semua? Yuk ngobrol santai sambil cari solusinya bareng saya.",
        features: ["Sesi 30 Menit", "Via Google Meet", "Solusi Praktis"]
      },
    ],
  },
  {
    username: "sandhika",
    name: "Sandhika Galih",
    bio: "Content Creator & Web Programming Unpas",
    location: "Bandung, Indonesia",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sandhika",
    stats: { products: 10, sales: 5000 },
    // ✅ Data Social Media untuk Sandhika
    socials: {
      instagram: "https://instagram.com/sandhikagalih",
      tiktok: "https://tiktok.com/@sandhikagalih",
    },
    products: [
      { 
        id: "101", 
        title: "Tutorial HTML Dasar", 
        price: "Gratis", 
        category: "Course", 
        image: "💻",
        description: "Video tutorial dasar HTML untuk pemula. Belajar struktur web dari awal.",
        features: ["Video HD", "Akses Selamanya", "Materi Terstruktur"]
      },
    ],
  },
];

// --- 3. Fungsi Fetching Data ---

// Fungsi A: Ambil Data User
export async function getUserByUsername(username: string): Promise<UserProfile | null> {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulasi loading
  const user = DUMMY_DB.find((u) => u.username === username);
  return user || null;
}

// Fungsi B: Ambil User DAN Produk Spesifik
export async function getUserAndProduct(username: string, productId: string) {
  const user = await getUserByUsername(username);
  if (!user) return null;

  const product = user.products.find((p) => p.id === productId);
  if (!product) return null;

  return { user, product };
}