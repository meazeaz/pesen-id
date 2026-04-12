import Link from "next/link";
import { Instagram, Twitter, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a0a0a] pt-16 pb-8 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
                P
              </div>
              <span className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">Pesen.id</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed pr-4">
              Platform Bio Link dan e-commerce digital paling inovatif di Indonesia. Ubah karya digitalmu menjadi penghasilan nyata.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-purple-100 hover:text-purple-600 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links: Produk */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-sm">Produk</h4>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li><Link href="#fitur" className="hover:text-purple-600 transition-colors">Fitur Utama</Link></li>
              <li><Link href="#harga" className="hover:text-purple-600 transition-colors">Harga Paket</Link></li>
              <li><Link href="#" className="hover:text-purple-600 transition-colors">Katalog Tema</Link></li>
              <li><Link href="#" className="hover:text-purple-600 transition-colors">Studi Kasus Kreator</Link></li>
            </ul>
          </div>

          {/* Links: Bantuan */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-sm">Bantuan</h4>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li><Link href="#" className="hover:text-purple-600 transition-colors">Pusat Bantuan</Link></li>
              <li><Link href="#" className="hover:text-purple-600 transition-colors">Syarat & Ketentuan</Link></li>
              <li><Link href="#" className="hover:text-purple-600 transition-colors">Kebijakan Privasi</Link></li>
              <li><Link href="#" className="hover:text-purple-600 transition-colors">Panduan Integrasi Xendit</Link></li>
            </ul>
          </div>

          {/* Hubungi Kami */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-sm">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-slate-400 shrink-0" />
                <span>support@pesen.id</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                <span>Jl. Soekarno Hatta No. 9, Kota Malang, Jawa Timur, Indonesia</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>&copy; {new Date().getFullYear()} Pesen.id - Hak Cipta Dilindungi.</p>
          <p>Dibuat dengan Affandi Abdul Aziz.</p>
        </div>
      </div>
    </footer>
  );
}