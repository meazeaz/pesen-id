"use client";

import { User, Layout, Type, Link as LinkIcon, Globe, GripVertical, Trash2, Instagram, Twitter, Image as ImageIcon } from "lucide-react";
import { BlockType, Block, ProfileState, ROUNDED_OPTIONS } from "./constants";

type Props = {
  profile: ProfileState;
  setProfile: (p: ProfileState) => void;
  addBlock: (type: BlockType) => void;
  removeBlock: (id: string) => void;
  updateBlock: (id: string, field: keyof Block, value: string) => void;
  toggleBlockActive: (id: string) => void;
};

export default function ProfileTab({ profile, setProfile, addBlock, removeBlock, updateBlock, toggleBlockActive }: Props) {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
      {/* Basic Info Card */}
      <div className="bg-white dark:bg-[#121214] border border-slate-200 dark:border-white/5 rounded-3xl p-6 space-y-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <User className="w-4 h-4" /> Informasi Utama
        </h3>
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Avatar Uploader */}
          <div className="relative group cursor-pointer mx-auto sm:mx-0">
            <div className={`w-24 h-24 overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-700 group-hover:border-purple-500 transition-all ${ROUNDED_OPTIONS.find(r => r.value === profile.rounded)?.class}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-black/60 p-2 rounded-full backdrop-blur-sm">
                <ImageIcon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          {/* Inputs */}
          <div className="flex-1 space-y-4 w-full">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 ml-1">Username</label>
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus-within:border-purple-500 transition-all">
                <span className="text-slate-400 text-sm">@</span>
                <input 
                  type="text" 
                  value={profile.username} 
                  onChange={e => setProfile({...profile, username: e.target.value})}
                  className="w-full bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none"
                  placeholder="username"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 ml-1">Nama Toko / Tampilan</label>
              <input 
                type="text" 
                value={profile.name} 
                onChange={e => setProfile({...profile, name: e.target.value})}
                className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                placeholder="Nama Anda"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 ml-1">Bio</label>
              <textarea 
                rows={3}
                value={profile.bio} 
                onChange={e => setProfile({...profile, bio: e.target.value})}
                className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-purple-500 outline-none transition-all resize-none"
                placeholder="Tulis bio Anda..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Block Builder */}
      <div className="space-y-4">
        <div className="flex justify-between items-end px-1">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Layout className="w-5 h-5" /> Susunan Konten
            </h3>
          </div>
          {/* Quick Add Buttons */}
          <div className="flex gap-2 bg-slate-200 dark:bg-white/5 p-1 rounded-lg border border-slate-300 dark:border-white/5">
            {[
              { id: 'header', icon: Type, label: 'Judul' },
              { id: 'link', icon: LinkIcon, label: 'Link' },
              { id: 'text', icon: Layout, label: 'Teks' },
              { id: 'social', icon: Globe, label: 'Sosial' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => addBlock(item.id as BlockType)}
                className="px-3 py-1.5 hover:bg-white dark:hover:bg-white/10 rounded-md text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 flex items-center gap-1.5"
              >
                <item.icon className="w-3.5 h-3.5" /> {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {profile.blocks.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50">
              <p className="text-slate-500 text-sm">Belum ada konten.</p>
            </div>
          )}

          {profile.blocks.map((block) => (
            <div key={block.id} className={`group relative bg-white dark:bg-[#18181b] border ${block.active ? 'border-slate-200' : 'opacity-50'} hover:border-purple-500/30 rounded-xl p-4 flex gap-4 transition-all`}>
              <div className="self-center text-slate-400 cursor-grab">
                <GripVertical className="w-5 h-5" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-slate-100 text-slate-600">
                      {block.type}
                    </span>
                    <button
                      onClick={() => toggleBlockActive(block.id)}
                      className={`text-xs px-2 py-0.5 rounded-full ${block.active ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                    >
                      {block.active ? 'Aktif' : 'Nonaktif'}
                    </button>
                  </div>
                  <button onClick={() => removeBlock(block.id)} className="text-slate-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  <input 
                    type="text" 
                    value={block.content}
                    onChange={e => updateBlock(block.id, 'content', e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-slate-900 dark:text-white border-b focus:border-purple-500 outline-none pb-1"
                    placeholder="Label..."
                  />
                  {(block.type === 'link' || block.type === 'social') && (
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-black/30 rounded-lg px-3 py-2 border">
                      <LinkIcon className="w-3 h-3 text-slate-400" />
                      <input 
                        type="text" 
                        value={block.url || ""}
                        onChange={e => updateBlock(block.id, 'url', e.target.value)}
                        className="w-full bg-transparent text-xs text-slate-600 dark:text-white outline-none"
                        placeholder="https://yourlink.com"
                      />
                    </div>
                  )}
                  {block.type === 'social' && (
                    <div className="flex gap-2 mt-2">
                      {['instagram', 'twitter', 'facebook', 'tiktok'].map(icon => (
                        <button
                          key={icon}
                          onClick={() => updateBlock(block.id, 'icon', icon)}
                          className={`p-2 rounded-lg border ${block.icon === icon ? 'bg-purple-100 border-purple-500 text-purple-600' : 'border-slate-200'}`}
                        >
                          {icon === 'instagram' && <Instagram className="w-4 h-4" />}
                          {icon === 'twitter' && <Twitter className="w-4 h-4" />}
                          {icon === 'facebook' && <span className="text-xs">fb</span>}
                          {icon === 'tiktok' && <span className="text-xs">tt</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}