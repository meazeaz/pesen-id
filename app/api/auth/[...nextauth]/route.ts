import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { cookies } from "next/headers";

const handler = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Mohon isi email dan password.");
        }
        
        // 1. Cari user berdasarkan email
        const user = await prisma.user.findFirst({
          where: { email: credentials.email }
        });
        
        if (!user) {
          throw new Error("Email ini belum terdaftar. Silakan daftar dulu.");
        }

        // 2. Hash password yang diketik user
        const hashedPassword = crypto.createHash("sha256").update(credentials.password).digest("hex");
        
        // 3. Logika Pintar: Cek apakah dia daftar via Google
        // (Karena kita sementara menyimpan hash 64 karakter di field 'name' untuk user manual)
        if (user.name !== hashedPassword) {
          if (user.name && user.name.length !== 64) {
             throw new Error("Akun ini terdaftar via Google. Silakan klik tombol 'Masuk dengan Google' di atas.");
          }
          throw new Error("Email atau Password salah.");
        }
        
        return { id: user.id, email: user.email, name: user.name };
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google") {
          if (!user.email) return false;

          const existingUser = await prisma.user.findFirst({ where: { email: user.email } });

          // Jika BARU PERTAMA KALI LOGIN GOOGLE
          if (!existingUser) {
            const tempUsername = "user_" + Math.random().toString(36).substring(2, 8);
            const newUser = await prisma.user.create({
              data: {
                email: user.email,
                username: tempUsername,
                name: user.name || "Google User",
              }
            });
            await prisma.profile.create({
              data: { userId: newUser.id, bio: "Halo! Saya baru bergabung di Pesen.id", themeId: "custom" }
            });
            
            const cookieStore = await cookies();
            cookieStore.set("pesen_onboarding", user.email);
            return true; 
          }

          // Jika SEBELUMNYA BELUM SELESAI ONBOARDING
          if (existingUser.username && existingUser.username.startsWith("user_")) {
            const cookieStore = await cookies();
            cookieStore.set("pesen_onboarding", user.email);
            return true;
          }
          
          return true; // Lolos, masuk dashboard
        }
        return true;
      } catch (error) {
        console.error("Terjadi error di database saat Google Login:", error);
        return false;
      }
    },
    async jwt({ token, account, user }) {
      if (user) token.id = user.id;
      if (account?.provider === "google" && token.email) {
        const dbUser = await prisma.user.findFirst({ where: { email: token.email } });
        if (dbUser) token.id = dbUser.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id && session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    }
  },
  pages: { signIn: '/login', error: '/login' },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };