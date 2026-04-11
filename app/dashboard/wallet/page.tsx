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

  // 1. Dapatkan KTP User
  const user = await prisma.user.findUnique({ 
    where: { email: session.user.email },
    include: {
      bankAccounts: true
    }
  });
  
  if (!user) return null;

  // 2. Tarik Total Pemasukan (Dari pesanan yang Lunas)
  const incomeData = await prisma.order.aggregate({
    where: { userId: user.id, status: "paid" },
    _sum: { totalAmount: true },
  });
  const totalIncome = incomeData._sum.totalAmount || 0;

  // 3. Tarik Total Pengeluaran (Penarikan yang Sukses ATAU masih Pending)
  // Pending dihitung agar user tidak bisa menarik uang melebihi saldo jika ada request gantung
  const withdrawnData = await prisma.withdrawal.aggregate({
    where: { userId: user.id, status: { in: ["PENDING", "SUCCESS"] } },
    _sum: { amount: true },
  });
  
  const totalExpense = withdrawnData._sum.amount || 0; 
  const activeBalance = totalIncome - totalExpense;

  // 4. Tarik Riwayat Pemasukan
  const recentOrders = await prisma.order.findMany({
    where: { userId: user.id, status: "paid" },
    orderBy: { createdAt: "desc" },
    take: 10,
    include: { items: { include: { product: true } } }
  });

  // 5. Tarik Riwayat Penarikan Dana
  const recentWithdrawals = await prisma.withdrawal.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  // 6. Format Riwayat Pemasukan
  const formattedOrders = recentOrders.map(order => ({
    id: `TRX-${order.id.slice(0, 6).toUpperCase()}`,
    desc: `Penjualan: ${order.items[0]?.product?.title || "Produk dihapus"}`,
    date: order.createdAt.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    amount: order.totalAmount,
    type: "income",
    status: "success",
    rawDate: order.createdAt // Untuk sorting
  }));

  // 7. Format Riwayat Penarikan
  const formattedWithdrawals = recentWithdrawals.map(w => ({
    id: `WD-${w.id.slice(0, 6).toUpperCase()}`,
    desc: `Tarik Dana ke ${w.bankName}`,
    date: w.createdAt.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    amount: w.amount,
    type: "expense",
    status: w.status.toLowerCase(), // success, pending, rejected
    rawDate: w.createdAt
  }));

  // 8. Gabungkan kedua riwayat dan urutkan dari yang paling baru
  const allTransactions = [...formattedOrders, ...formattedWithdrawals]
    .sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime())
    .slice(0, 10);

  const primaryBank = user.bankAccounts.length > 0 ? user.bankAccounts[0] : null;

  const realData = {
    activeBalance: activeBalance,
    totalIncome: totalIncome,
    totalExpense: totalExpense,
    bankData: primaryBank ? {
      bankName: primaryBank.bankName,
      accountNumber: primaryBank.accountNumber,
      holderName: primaryBank.holderName
    } : null,
    transactions: allTransactions
  };

  return <WalletClient walletData={realData} />;
}