"use client";

import { 
  User, Layout, Type, Link as LinkIcon, Globe, 
  GripVertical, Trash2, Instagram, Twitter, Image as ImageIcon,
  Plus, Youtube, Minus
} from "lucide-react";
import { BlockType, Block, ProfileState, ROUNDED_OPTIONS } from "./constants";
import { Droppable, Draggable } from "@hello-pangea/dnd";

type Props = {
  profile: ProfileState;
  setProfile: (p: ProfileState) => void;
  addBlock: (type: BlockType) => void;
  removeBlock: (id: string) => void;
  updateBlock: (id: string, field: keyof Block, value: string) => void;
  toggleBlockActive: (id: string) => void;
};

export default function ProfileTab({ 
  profile, setProfile, addBlock, removeBlock, updateBlock, toggleBlockActive 
}: Props) {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
      
      {/* 1. SEKSI INFORMASI UTAMA */}
      <div className="bg-white dark:bg-[#121214] border border-slate-200 dark:border-white/5 rounded-3xl p-6 space-y-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <User className="w-4 h-4" /> Informasi Utama
        </h3>
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="relative group cursor-pointer mx-auto sm:mx-0">
            <div className={`w-24 h-24 overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-700 group-hover:border-purple-500 transition-all ${ROUNDED_OPTIONS.find(r => r.value === profile.rounded)?.class || "rounded-2xl"}`}>
              <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-black/60 p-2 rounded-full backdrop-blur-sm">
                <ImageIcon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          
          <div className="flex-1 space-y-4 w-full">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Username Kamu</label>
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all">
                <span className="text-slate-400 text-sm font-bold">pesen.id/</span>
                <input 
                  type="text" 
                  value={profile.username} 
                  onChange={e => setProfile({...profile, username: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "")})}
                  className="w-full bg-transparent text-sm text-slate-900 dark:text-white font-bold focus:outline-none"
                  placeholder="username"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Nama Tampilan</label>
              <input 
                type="text" 
                value={profile.name} 
                onChange={e => setProfile({...profile, name: e.target.value})}
                className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all font-medium"
                placeholder="Contoh: Toko Buku Ilham"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Bio Singkat</label>
              <textarea 
                rows={3}
                value={profile.bio} 
                onChange={e => setProfile({...profile, bio: e.target.value})}
                className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all resize-none"
                placeholder="Ceritakan sedikit tentang dirimu atau produkmu..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. SEKSI BLOCK BUILDER */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 px-1">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Layout className="w-5 h-5 text-purple-600" /> Susunan Konten
            </h3>
            <p className="text-xs text-slate-500">Sosial media otomatis tampil di bawah bio. Tambahkan konten lain di sini.</p>
          </div>
          <div className="flex flex-wrap gap-2 bg-slate-100 dark:bg-white/5 p-1.5 rounded-xl border border-slate-200 dark:border-white/5 shadow-inner">
            {[
              { id: 'link', icon: LinkIcon, label: 'Link' },
              { id: 'social', icon: Globe, label: 'Sosial' },
              { id: 'text', icon: Layout, label: 'Teks' },
              { id: 'header', icon: Type, label: 'Judul' },
              { id: 'youtube', icon: Youtube, label: 'Video YT' },
              { id: 'divider', icon: Minus, label: 'Garis' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => addBlock(item.id as BlockType)}
                className="px-3 py-1.5 hover:bg-white dark:hover:bg-white/10 rounded-lg text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:text-purple-600 flex items-center gap-1.5 transition-all shadow-sm active:scale-95 border border-transparent hover:border-slate-200 dark:hover:border-white/10"
              >
                <item.icon className="w-3.5 h-3.5" /> {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* AREA DRAG & DROP */}
        <Droppable droppableId="blocks-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3 min-h-[100px]">
              {profile.blocks.length === 0 && (
                <div className="text-center py-16 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50 dark:bg-black/20 animate-in fade-in zoom-in-95">
                  <div className="w-14 h-14 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Plus className="w-6 h-6 text-slate-400" />
                  </div>
                  <p className="text-slate-400 text-sm font-medium">Susunan konten masih kosong.</p>
                  <p className="text-[11px] text-slate-500 mt-1">Klik tombol di atas untuk menambahkan konten baru.</p>
                </div>
              )}

              {profile.blocks.map((block, index) => (
                <Draggable key={block.id} draggableId={block.id} index={index}>
                  {(provided, snapshot) => (
                    <div 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`group relative bg-white dark:bg-[#18181b] border ${
                        snapshot.isDragging ? 'border-purple-500 shadow-2xl ring-2 ring-purple-500/20 rotate-[0.5deg] z-50' : 'border-slate-200 dark:border-white/5'
                      } ${!block.active && !snapshot.isDragging ? 'opacity-60' : 'opacity-100'} rounded-2xl p-4 flex gap-4 transition-all duration-200`}
                    >
                      <div {...provided.dragHandleProps} className="self-center text-slate-300 hover:text-purple-500 cursor-grab active:cursor-grabbing p-1 transition-colors">
                        <GripVertical className="w-5 h-5" />
                      </div>

                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-800/50">
                              {block.type}
                            </span>
                            <button
                              onClick={() => toggleBlockActive(block.id)}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                                block.active ? 'bg-green-50 text-green-600 border-green-200 dark:bg-green-900/10 dark:text-green-400 dark:border-green-900/30' : 'bg-slate-50 text-slate-400 border-slate-200 dark:bg-black/20 dark:border-white/5'
                              }`}
                            >
                              {block.active ? 'Tampil' : 'Sembunyi'}
                            </button>
                          </div>
                          <button onClick={() => removeBlock(block.id)} className="text-slate-400 hover:text-red-500 p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-3">
                          {block.type !== 'divider' && (
                            <input 
                              type="text" 
                              value={block.content}
                              onChange={e => updateBlock(block.id, 'content', e.target.value)}
                              className="w-full bg-transparent text-sm font-bold text-slate-900 dark:text-white border-b border-transparent focus:border-purple-500 outline-none pb-1 transition-all placeholder:font-normal"
                              placeholder={block.type === 'header' ? "Masukkan Judul Seksi..." : block.type === 'youtube' ? "Keterangan Video..." : "Masukkan Teks/Label..."}
                            />
                          )}
                          
                          {(block.type === 'link' || block.type === 'social' || block.type === 'youtube') && (
                            <div className="flex items-center gap-2 bg-slate-50 dark:bg-black/40 rounded-xl px-3 py-2.5 border border-slate-100 dark:border-white/5 focus-within:border-purple-500/50 transition-all">
                              <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
                              <input 
                                type="text" 
                                value={block.url || ""}
                                onChange={e => updateBlock(block.id, 'url', e.target.value)}
                                className="w-full bg-transparent text-xs text-slate-600 dark:text-slate-300 outline-none font-medium"
                                placeholder={block.type === 'youtube' ? "https://youtube.com/watch?v=..." : "https://..."}
                              />
                            </div>
                          )}

                          {block.type === 'social' && (
                            <div className="flex flex-wrap gap-2 pt-1">
                              {['instagram', 'twitter', 'tiktok', 'youtube'].map(icon => (
                                <button
                                  key={icon}
                                  onClick={() => updateBlock(block.id, 'icon', icon)}
                                  className={`p-2 rounded-xl border transition-all ${
                                    block.icon === icon ? 'bg-purple-600 border-purple-600 text-white shadow-md' : 'bg-white dark:bg-black/20 border-slate-200 dark:border-white/5 text-slate-400 hover:border-purple-500'
                                  }`}
                                >
                                  {icon === 'instagram' && <Instagram className="w-4 h-4" />}
                                  {icon === 'twitter' && <Twitter className="w-4 h-4" />}
                                  {icon === 'tiktok' && <span className="text-[10px] font-bold">Tk</span>}
                                  {icon === 'youtube' && <span className="text-[10px] font-bold">YT</span>}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}