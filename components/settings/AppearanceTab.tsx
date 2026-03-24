"use client";

import { useState } from "react";
import { Layout, Palette, Sparkles, Sun, Check, Type } from "lucide-react";
import { ProfileState, LAYOUTS, GRADIENTS, SOLID_COLORS, FONTS, ROUNDED_OPTIONS, SHADOW_OPTIONS } from "./constants";

// 👇 Mendefinisikan tipe data resmi untuk tab
type SubTabType = "layout" | "background" | "style";

export default function AppearanceTab({ profile, setProfile }: { profile: ProfileState, setProfile: (p: ProfileState) => void }) {
  const [subTab, setSubTab] = useState<SubTabType>("layout");

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="flex gap-2 border-b border-slate-200 dark:border-white/10 pb-1">
        {[
          { id: "layout", label: "Layout", icon: Layout },
          { id: "background", label: "Background", icon: Palette },
          { id: "style", label: "Gaya", icon: Sparkles }
        ].map((tab) => (
          <button 
            key={tab.id}
            // 👇 Kata "any" diganti dengan tipe resmi
            onClick={() => setSubTab(tab.id as SubTabType)}
            className={`text-xs font-bold uppercase tracking-wider px-4 py-2 border-b-2 transition-all flex items-center gap-2 ${
              subTab === tab.id ? "border-purple-600 text-purple-600 dark:text-white" : "border-transparent text-slate-500"
            }`}
          >
            <tab.icon className="w-3 h-3" /> {tab.label}
          </button>
        ))}
      </div>

      {/* Layout Selector */}
      {subTab === "layout" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {LAYOUTS.map((layout) => (
            <button
              key={layout.id}
              // 👇 Kata "any" diganti dengan referensi tipe dari ProfileState
              onClick={() => setProfile({...profile, layout: layout.id as ProfileState["layout"]})}
              className={`group relative bg-white dark:bg-[#121214] border-2 rounded-2xl p-4 text-left transition-all 
              ${profile.layout === layout.id ? "border-purple-600 bg-purple-50 dark:bg-[#1a1a20]" : "border-slate-200"}`}
            >
              <Layout className="w-6 h-6 text-slate-400 mb-3" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">{layout.name}</h4>
              <p className="text-xs text-slate-500">{layout.desc}</p>
              {profile.layout === layout.id && (
                <div className="absolute top-2 right-2 bg-purple-600 rounded-full p-1"><Check className="w-3 h-3 text-white" /></div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Background Selector */}
      {subTab === "background" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#121214] border border-slate-200 rounded-3xl p-6">
            <h3 className="font-bold text-sm mb-4">Tipe Background</h3>
            <div className="flex gap-3">
              {[
                { id: "gradient", label: "Gradient", icon: Palette },
                { id: "solid", label: "Solid", icon: Sun },
              ].map((type) => (
                <button
                  key={type.id}
                  // 👇 Kata "any" diganti dengan referensi tipe dari ProfileState
                  onClick={() => setProfile({...profile, bgType: type.id as ProfileState["bgType"]})}
                  className={`flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 ${
                    profile.bgType === type.id ? 'bg-purple-100 border-purple-500 text-purple-700' : 'border-slate-200 text-slate-500'
                  }`}
                >
                  <type.icon className="w-4 h-4" /> {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#121214] border border-slate-200 rounded-3xl p-6">
            <h3 className="font-bold text-sm mb-4">Pilihan Warna</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {(profile.bgType === "gradient" ? GRADIENTS : SOLID_COLORS).map((color, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setProfile({...profile, bgValue: color.value})}
                  className={`h-24 rounded-2xl relative overflow-hidden transition-all ${color.value} ring-2 ${profile.bgValue === color.value ? "ring-purple-600" : "ring-transparent"}`}
                >
                  <span className="absolute bottom-2 left-3 text-[10px] font-bold text-white/90 uppercase shadow-sm">{color.name}</span>
                  {profile.bgValue === color.value && (
                    <div className="absolute top-2 right-2 bg-white/20 p-1.5 rounded-full"><Check className="w-3 h-3 text-white" /></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Style Options */}
      {subTab === "style" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#121214] border border-slate-200 rounded-3xl p-6">
            <h3 className="font-bold text-sm mb-4 flex items-center gap-2"><Type className="w-4 h-4" /> Font</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {FONTS.map((font) => (
                <button
                  key={font.value}
                  onClick={() => setProfile({...profile, font: font.value})}
                  className={`py-3 px-2 rounded-xl border text-center ${profile.font === font.value ? 'bg-purple-100 border-purple-500 text-purple-700' : 'border-slate-200 text-slate-600'} ${font.value}`}
                >
                  <span className="text-sm">{font.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#121214] border border-slate-200 rounded-3xl p-6">
            <h3 className="font-bold text-sm mb-4">Sudut & Bayangan</h3>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {ROUNDED_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  // 👇 Kata "any" diganti dengan referensi tipe dari ProfileState
                  onClick={() => setProfile({...profile, rounded: opt.value as ProfileState["rounded"]})}
                  className={`py-3 px-2 rounded-xl border text-center ${profile.rounded === opt.value ? 'bg-purple-100 border-purple-500 text-purple-700' : 'border-slate-200 text-slate-600'}`}
                >
                  <span className="text-xs">{opt.name}</span>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {SHADOW_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  // 👇 Kata "any" diganti dengan referensi tipe dari ProfileState
                  onClick={() => setProfile({...profile, shadow: opt.value as ProfileState["shadow"]})}
                  className={`py-3 px-2 rounded-xl border text-center ${profile.shadow === opt.value ? 'bg-purple-100 border-purple-500 text-purple-700' : 'border-slate-200 text-slate-600'}`}
                >
                  <span className="text-xs">{opt.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}