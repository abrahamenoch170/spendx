'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mic, 
  MoreHorizontal, 
  Camera, 
  Image as ImageIcon, 
  Smile,
  Zap,
  MessageSquare
} from 'lucide-react';
import { useTab } from '../context/TabContext';

// Mock Data
const CHATS = [
  { id: 'c1', name: 'AI Planner', lastMsg: 'How about a rooftop bar?', avatar: 'https://api.dicebear.com/9.x/bottts/svg?seed=AI', unread: 2 },
  { id: 'c2', name: 'Squad: Night Out', lastMsg: 'Everyone ready?', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Squad', unread: 0 },
];

export const ChatTab = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const { isStudent } = useTab();

  return (
    <div className="flex flex-col h-full bg-[var(--bg-color)] pb-32">
      {/* Header */}
      <div className="p-6 flex justify-between items-center bg-[var(--bg-color)]/80 backdrop-blur-xl border-b border-white/5">
        <h1 className="text-2xl font-black uppercase tracking-tighter">Chat</h1>
        <button className="p-3 bg-[var(--card-bg)] rounded-2xl">
          <Camera className="w-6 h-6" />
        </button>
      </div>

      {/* Quick Prompts */}
      {isStudent && (
        <div className="px-6 py-2">
          <button className="px-4 py-2 bg-[var(--lime)]/10 text-[var(--lime)] rounded-full text-xs font-bold border border-[var(--lime)]/20">
            Study spot finder
          </button>
        </div>
      )}

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {CHATS.map(chat => (
          <motion.button
            key={chat.id}
            onClick={() => setActiveChat(chat.id)}
            className="w-full bg-[var(--card-bg)] p-4 rounded-3xl border border-white/5 flex items-center gap-4 hover:bg-white/5 transition-all"
          >
            <div className="relative">
              <img src={chat.avatar} alt="" className="w-12 h-12 rounded-full bg-white/10" />
              {chat.unread > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--lime)] rounded-full flex items-center justify-center text-[10px] font-black text-black">
                  {chat.unread}
                </div>
              )}
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-bold">{chat.name}</h4>
              <p className="text-xs text-white/40 truncate">{chat.lastMsg}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Chat Room (Mock) */}
      <AnimatePresence>
        {activeChat && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="fixed inset-0 bg-[var(--bg-color)] z-[1100] flex flex-col"
          >
            <div className="p-6 flex items-center gap-4 border-b border-white/5">
              <button onClick={() => setActiveChat(null)} className="p-2">
                <MoreHorizontal className="w-6 h-6" />
              </button>
              <h2 className="text-lg font-black uppercase tracking-tighter">Chat Room</h2>
            </div>
            
            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
              <div className="bg-[var(--card-bg)] p-4 rounded-2xl rounded-bl-none max-w-[80%]">
                <p className="text-sm">Hey! How about a rooftop bar for tonight?</p>
              </div>
              <div className="bg-[var(--lime)]/10 p-4 rounded-2xl rounded-br-none max-w-[80%] ml-auto border border-[var(--lime)]/20">
                <p className="text-sm">Sounds good! Any specific vibe?</p>
              </div>
            </div>

            <div className="p-4 bg-[var(--card-bg)] flex items-center gap-2">
              <button className="p-3 text-white/40"><ImageIcon className="w-6 h-6" /></button>
              <input 
                type="text" 
                placeholder="Message..." 
                className="flex-1 bg-white/5 rounded-full px-4 py-3 text-sm outline-none"
              />
              <button className="p-3 text-[var(--lime)]"><Mic className="w-6 h-6" /></button>
              <button className="p-3 bg-[var(--lime)] rounded-full text-black"><Send className="w-5 h-5" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
