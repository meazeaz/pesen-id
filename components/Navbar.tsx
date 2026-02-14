"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(""); // State baru untuk melacak section aktif

  // Efek 1: Deteksi Scroll untuk Ubah Tampilan Navbar & Active State
  useEffect(() => {
    const handleScroll = () => {
      // 1. Logika Navbar Mengecil/Transparan
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // 2. Logika "Active State" (Scroll Spy)
      const sections = document.querySelectorAll("section"); // Ambil semua tag <section>
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Jika scroll window ada di area section tersebut (dikurangi offset navbar 100px)
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute("id") || "";
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Cara Kerja", href: "#cara-kerja", id: "cara-kerja" },
    { name: "Fitur", href: "#fitur", id: "fitur" },
    
    { name: "Testimoni", href: "#testimoni", id: "testimoni" },
    { name: "Harga", href: "#harga", id: "harga" },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled ? "py-2 px-4" : "py-6 px-6"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div 
          className={`transition-all duration-500 flex items-center justify-between px-6 h-16 rounded-2xl backdrop-blur-md ${
            scrolled 
              ? "bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-lg shadow-black/5" 
              : "bg-transparent border border-transparent"
          }`}
        >
          
          {/* Logo */}
          <a 
            href="#home" 
            className="group text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white text-sm shadow-md group-hover:rotate-12 transition-transform duration-300">
              P
            </div>
            <span className="hidden sm:block">pesen.id</span>
          </a>

          {/* Desktop Menu dengan Active State */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-xl border border-white/20">
            {menuItems.map((item) => (
              <a 
                key={item.name}
                href={item.href} 
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-white/50 dark:hover:bg-slate-700/50"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <div className="hidden md:flex items-center gap-3 border-l border-slate-200 dark:border-slate-700 pl-4 ml-1">
              <Link 
                href="/login" 
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition px-3"
              >
                Masuk
              </Link>
              <Link 
                href="/register" 
                className="text-sm font-bold bg-slate-900 dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2 group"
              >
                Daftar <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors hover:bg-slate-200 dark:hover:bg-slate-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (Animated) */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isOpen ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className="p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl space-y-2">
            {menuItems.map((item) => (
              <a 
                key={item.name}
                href={item.href} 
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 text-sm font-medium rounded-xl transition ${
                  activeSection === item.id
                    ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-bold"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
              <Link href="/login" className="px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 text-center hover:bg-slate-50 rounded-xl transition">Masuk</Link>
              <Link href="/register" className="px-4 py-3 text-sm font-bold bg-purple-600 text-white rounded-xl text-center shadow-lg hover:bg-purple-700 transition">Daftar Sekarang</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}