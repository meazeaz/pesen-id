"use client";

import { useState } from "react";
import { 
  Search, MoreVertical, Phone, Video, Send, 
  Paperclip, Smile, ChevronLeft, Check, CheckCheck, Clock
} from "lucide-react";

// --- DUMMY DATA CHAT ---
const CONTACTS = [
  { id: 1, name: "Budi Santoso", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi", lastMsg: "Apakah stok e-book masih ada?", time: "10:30", unread: 2, status: "online" },
  { id: 2, name: "Siti Aminah", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siti", lastMsg: "Terima kasih kak, file sudah diterima.", time: "Kemarin", unread: 0, status: "offline" },
  { id: 3, name: "Joko Anwar", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joko", lastMsg: "Bisa minta refund tidak?", time: "Kemarin", unread: 0, status: "online" },
  { id: 4, name: "Rina Nose", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rina", lastMsg: "Cara downloadnya gimana ya?", time: "Senin", unread: 1, status: "offline" },
];

const INITIAL_MESSAGES = [
  { id: 1, sender: "other", text: "Halo kak, selamat siang.", time: "10:28" },
  { id: 2, sender: "other", text: "Apakah stok e-book masih ada? Saya mau beli borongan.", time: "10:30" },
];

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputMsg, setInputMsg] = useState("");

  const activeContact = CONTACTS.find(c => c.id === selectedChat);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: "me",
      text: inputMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setInputMsg("");
  };

  return (
    // Fixed Height Layout agar tidak scroll window utama
    <div className="h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)] flex flex-col md:flex-row bg-slate-50 dark:bg-[#09090b] overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 m-4 md:m-6">
      
      {/* --- SIDEBAR LIST KONTAK --- */}
      <div className={`w-full md:w-80 bg-white dark:bg-[#121212] border-r border-slate-200 dark:border-slate-800 flex flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
        
        {/* Header List */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
           <h2 className="text-xl font-bold mb-4 dark:text-white">Pesan</h2>
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari chat..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-[#1a1a1a] rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500 transition-all dark:text-white placeholder:text-slate-500"
              />
           </div>
        </div>

        {/* List Items */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
           {CONTACTS.map((contact) => (
              <button 
                key={contact.id}
                onClick={() => setSelectedChat(contact.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                   selectedChat === contact.id 
                      ? "bg-purple-50 dark:bg-purple-900/20" 
                      : "hover:bg-slate-50 dark:hover:bg-white/5"
                }`}
              >
                 <div className="relative">
                    <img src={contact.avatar} className="w-10 h-10 rounded-full bg-slate-200" />
                    {contact.status === 'online' && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#121212] rounded-full"></div>}
                 </div>
                 <div className="flex-1 text-left overflow-hidden">
                    <div className="flex justify-between items-center mb-0.5">
                       <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">{contact.name}</h4>
                       <span className="text-[10px] text-slate-400">{contact.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{contact.lastMsg}</p>
                 </div>
                 {contact.unread > 0 && (
                    <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                       {contact.unread}
                    </div>
                 )}
              </button>
           ))}
        </div>
      </div>

      {/* --- AREA CHAT WINDOW --- */}
      {selectedChat ? (
         <div className="flex-1 flex flex-col bg-slate-50/50 dark:bg-[#0c0c0c]">
            
            {/* Header Chat */}
            <div className="h-16 px-4 flex items-center justify-between bg-white dark:bg-[#121212] border-b border-slate-200 dark:border-slate-800 shadow-sm z-10">
               <div className="flex items-center gap-3">
                  <button onClick={() => setSelectedChat(null)} className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-full">
                     <ChevronLeft className="w-5 h-5" />
                  </button>
                  <img src={activeContact?.avatar} className="w-9 h-9 rounded-full bg-slate-200" />
                  <div>
                     <h3 className="font-bold text-sm text-slate-900 dark:text-white">{activeContact?.name}</h3>
                     <p className="text-xs text-green-500 flex items-center gap-1">
                        {activeContact?.status === 'online' ? 'Sedang online' : 'Terakhir dilihat 1 jam lalu'}
                     </p>
                  </div>
               </div>
               <div className="flex gap-2">
                  <button className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-full transition"><Phone className="w-4 h-4" /></button>
                  <button className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-full transition"><Video className="w-4 h-4" /></button>
                  <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition"><MoreVertical className="w-4 h-4" /></button>
               </div>
            </div>

            {/* Isi Pesan (Bubbles) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
               {/* Tanggal Divider */}
               <div className="flex justify-center">
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-200 dark:bg-white/10 px-3 py-1 rounded-full">Hari Ini</span>
               </div>

               {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`max-w-[75%] md:max-w-[60%] p-3 rounded-2xl text-sm relative group ${
                        msg.sender === 'me' 
                           ? 'bg-purple-600 text-white rounded-br-none shadow-lg shadow-purple-500/20' 
                           : 'bg-white dark:bg-[#1e1e1e] dark:text-slate-200 border border-slate-100 dark:border-slate-800 rounded-bl-none shadow-sm'
                     }`}>
                        <p className="leading-relaxed">{msg.text}</p>
                        <div className={`flex items-center gap-1 justify-end mt-1 text-[10px] ${msg.sender === 'me' ? 'text-purple-200' : 'text-slate-400'}`}>
                           <span>{msg.time}</span>
                           {msg.sender === 'me' && <CheckCheck className="w-3 h-3" />}
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-3 md:p-4 bg-white dark:bg-[#121212] border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
               <button type="button" className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition">
                  <Paperclip className="w-5 h-5" />
               </button>
               <input 
                  type="text" 
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Ketik pesan..." 
                  className="flex-1 bg-slate-100 dark:bg-[#1a1a1a] border border-transparent focus:border-purple-500 dark:text-white rounded-full px-4 py-2.5 text-sm outline-none transition-all"
               />
               <button type="button" className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition hidden sm:block">
                  <Smile className="w-5 h-5" />
               </button>
               <button 
                  type="submit"
                  disabled={!inputMsg.trim()} 
                  className="p-2.5 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-purple-500/30"
               >
                  <Send className="w-4 h-4" />
               </button>
            </form>

         </div>
      ) : (
         /* --- EMPTY STATE (Jika belum pilih chat) --- */
         <div className="flex-1 hidden md:flex flex-col items-center justify-center text-center p-8 opacity-50 select-none">
            <div className="w-32 h-32 bg-slate-200 dark:bg-[#1a1a1a] rounded-full flex items-center justify-center mb-6">
               <div className="text-6xl">💬</div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Live Chat Pelanggan</h3>
            <p className="text-slate-500 max-w-xs mt-2">Pilih salah satu percakapan untuk mulai membalas pesan pelanggan Anda.</p>
         </div>
      )}

    </div>
  );
}