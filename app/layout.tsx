import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"; 
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import AuthProvider from "@/components/AuthProvider"; // 👈 Import Pemancar Sesi

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pesen.id",
  description: "Platform Bio Link & Produk Digital",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        
        {/* 1. KITA PASANG PEMANCAR SESI DI PALING LUAR */}
        <AuthProvider>
          
          {/* 2. LALU KITA PASANG TEMA GELAP/TERANG DI DALAMNYA */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* 3. INI ADALAH ISI HALAMAN WEB ANDA */}
            {children}
          </ThemeProvider>
          
        </AuthProvider>

      </body>
    </html>
  );
}