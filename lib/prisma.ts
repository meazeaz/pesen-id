import { PrismaClient } from "@prisma/client";

// Mendeklarasikan variabel prisma di scope global agar TypeScript mengenalinya
declare global {
  var prisma: PrismaClient | undefined;
}

// Mencegah Prisma membuat koneksi baru setiap kali Next.js melakukan hot-reload (save file)
export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"], // Opsional: Menampilkan log SQL di terminal untuk mempermudah proses debug
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}