import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { createOrder } from "@/app/actions/order"; 
import { ArrowRight, CreditCard } from "lucide-react";

const formatRupiah = (num: number) => 
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);

export default async function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!product) return notFound();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-slate-100 font-sans py-10 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        
        <div>
          <h1 className="text-2xl font-bold mb-2">Checkout</h1>
          <p className="text-slate-500 mb-8 text-sm">Lengkapi data untuk menerima akses produk.</p>

          <form action={createOrder} className="space-y-5">
            <input type="hidden" name="productId" value={product.id} />
            <input type="hidden" name="price" value={product.price} />

            <div>
              <label className="block text-sm font-bold mb-2">Nama Lengkap</label>
              <input name="name" type="text" required placeholder="Nama Anda" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-black focus:border-purple-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Email</label>
              <input name="email" type="email" required placeholder="email@anda.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-black focus:border-purple-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">No WhatsApp</label>
              <input name="phone" type="tel" required placeholder="0812..." className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-black focus:border-purple-500 outline-none" />
            </div>

            <button type="submit" className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 mt-4">
               Bayar Sekarang <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="bg-white dark:bg-[#121212] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 h-fit sticky top-10">
           <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
             <CreditCard className="w-5 h-5 text-purple-600" /> Ringkasan Pesanan
           </h3>
           <div className="flex gap-4 mb-6 border-b border-slate-100 dark:border-slate-800 pb-6">
              <div className="w-20 h-24 bg-slate-100 rounded-lg flex items-center justify-center text-2xl border border-slate-200 overflow-hidden">
                 {product.imageUrl ? <img src={product.imageUrl} className="w-full h-full object-cover" alt="img"/> : "📦"}
              </div>
              <div>
                 <h4 className="font-bold text-sm line-clamp-2">{product.title}</h4>
                 <span className="text-xs bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded text-slate-500 mt-1 inline-block">{product.category}</span>
              </div>
           </div>
           <div className="flex justify-between items-center border-t border-dashed border-slate-300 dark:border-slate-700 pt-4">
              <span className="font-bold text-lg">Total</span>
              <span className="font-extrabold text-2xl text-purple-600">{formatRupiah(product.price)}</span>
           </div>
        </div>

      </div>
    </div>
  );
}