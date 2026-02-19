"use client";

import { Star, MessageSquare, ThumbsUp, MoreHorizontal, Filter } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "Agus Kotak",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Agus",
    rating: 5,
    product: "E-book Next.js Mastery",
    comment: "Gila sih ini, materinya daging semua! Sangat recommended buat yang mau belajar dari nol.",
    date: "2 jam lalu",
    likes: 12
  },
  {
    id: 2,
    name: "Sari Roti",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sari",
    rating: 4,
    product: "Template Notion",
    comment: "Bagus, tapi ada beberapa bagian yang agak bingung setting-nya. Overall oke.",
    date: "1 hari lalu",
    likes: 3
  },
  {
    id: 3,
    name: "Doni Tata",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Doni",
    rating: 5,
    product: "Jasa Konsultasi",
    comment: "Mas Ilham ramah banget, masalah coding saya kelar dalam 30 menit. Mantap!",
    date: "3 hari lalu",
    likes: 8
  }
];

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-slate-100 p-6 lg:p-8 font-sans transition-colors duration-300">
      
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
           <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                 Ulasan Pelanggan <span className="text-sm bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 px-2 py-0.5 rounded-full border border-yellow-200 dark:border-yellow-900/30">4.8/5.0</span>
              </h1>
              <p className="text-slate-500 text-sm mt-1">Apa kata mereka tentang produkmu.</p>
           </div>
           <button className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-white dark:hover:bg-white/5 transition">
              <Filter className="w-4 h-4" /> Filter
           </button>
        </div>

        {/* Reviews List */}
        <div className="grid gap-4">
           {REVIEWS.map((review) => (
              <div key={review.id} className="bg-white dark:bg-[#121212] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-500/30 transition-colors">
                 <div className="flex items-start gap-4">
                    <img src={review.avatar} className="w-10 h-10 rounded-full bg-slate-100" />
                    <div className="flex-1">
                       <div className="flex justify-between items-start">
                          <div>
                             <h4 className="font-bold text-sm">{review.name}</h4>
                             <p className="text-xs text-slate-500">Membeli <span className="font-medium text-slate-700 dark:text-slate-300">{review.product}</span></p>
                          </div>
                          <span className="text-xs text-slate-400">{review.date}</span>
                       </div>
                       
                       <div className="flex gap-0.5 my-2">
                          {[1,2,3,4,5].map(star => (
                             <Star key={star} className={`w-4 h-4 ${star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200 dark:text-slate-700"}`} />
                          ))}
                       </div>

                       <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-black/20 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                          "{review.comment}"
                       </p>

                       <div className="flex items-center gap-4 mt-4">
                          <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-purple-600 transition">
                             <MessageSquare className="w-3.5 h-3.5" /> Balas
                          </button>
                          <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition">
                             <ThumbsUp className="w-3.5 h-3.5" /> {review.likes}
                          </button>
                       </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                       <MoreHorizontal className="w-5 h-5" />
                    </button>
                 </div>
              </div>
           ))}
        </div>

      </div>
    </div>
  );
}