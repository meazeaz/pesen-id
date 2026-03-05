import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import WalletClient from "./WalletClient";

export default async function WalletPage() {
  const session = await getServerSession();
  
  if (!session?.user?.email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Silakan login terlebih dahulu.</p>
      </div>
    );
  }

  // 1. Dapatkan KTP User (sekaligus tarik rekening bank pertamanya)
  const user = await prisma.user.findUnique({ 
    where: { email: session.user.email },
    include: {
      bankAccounts: true // 👈 Ambil data rekening bank dari database
    }
  });
  
  if (!user) return null;

  // 2. Tarik Total Pemasukan (Dari pesanan yang Lunas / Paid)
  const incomeData = await prisma.order.aggregate({
    where: { userId: user.id, status: "paid" },
    _sum: { totalAmount: true },
  });
  const totalIncome = incomeData._sum.totalAmount || 0;

  // Catatan: Karena kita belum punya tabel penarikan (Withdrawal) 
  // Untuk sementara, total expense (pengeluaran) kita set 0. 
  // Saldo Aktif = Total Income - Total Expense
  const totalExpense = 0; 
  const activeBalance = totalIncome - totalExpense;

  // 3. Tarik Riwayat Pemasukan (Dari tabel Order)
  const recentOrders = await prisma.order.findMany({
    where: { userId: user.id, status: "paid" },
    orderBy: { createdAt: "desc" },
    take: 10,
    include: { items: { include: { product: true } } }
  });

  // 4. Format Riwayat Pemasukan agar cocok dengan UI Anda
  const formattedTransactions = recentOrders.map(order => ({
    id: `TRX-${order.id.slice(0, 6).toUpperCase()}`,
    desc: `Penjualan: ${order.items[0]?.product?.title || "Produk dihapus"}`,
    date: order.createdAt.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    amount: order.totalAmount,
    type: "income",
    status: "success"
  }));

  // 5. Siapkan Data Rekening Bank (Ambil yang pertama, jika ada)
  const primaryBank = user.bankAccounts.length > 0 ? user.bankAccounts[0] : null;

  // 6. Kemas semua data asli ini
  const realData = {
    activeBalance: activeBalance,
    totalIncome: totalIncome,
    totalExpense: totalExpense,
    bankData: primaryBank ? {
      bankName: primaryBank.bankName,
      accountNumber: primaryBank.accountNumber,
      holderName: primaryBank.holderName
    } : null,
    transactions: formattedTransactions
  };

  // 7. Lempar ke UI
  return <WalletClient walletData={realData} />;
}