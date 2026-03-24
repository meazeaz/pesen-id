"use client";

import { Globe, Eye } from "lucide-react";
import { ProfileState } from "./constants";

export default function AdvancedTab({ profile }: { profile: ProfileState }) {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="bg-white dark:bg-[#121214] border border-slate-200 dark:border-white/5 rounded-3xl p-6">
        <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm flex items-center gap-2">
          <Globe className="w-4 h-4" /> Pengaturan SEO
        </h3>
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 ml-1">Meta Title</label>
            <input 
              type="text" 
              className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none"
              placeholder="Judul untuk SEO"
              defaultValue={profile.name}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 ml-1">Meta Description</label>
            <textarea 
              rows={2}
              className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none resize-none"
              placeholder="Deskripsi untuk SEO"
              defaultValue={profile.bio}
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#121214] border border-slate-200 dark:border-white/5 rounded-3xl p-6">
        <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm flex items-center gap-2">
          <Eye className="w-4 h-4" /> Analytics
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-sm text-slate-600">Total Views</span>
            <span className="font-bold">1,234</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-sm text-slate-600">Unique Visitors</span>
            <span className="font-bold">892</span>
          </div>
        </div>
      </div>
    </div>
  );
}