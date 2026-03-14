import React from 'react';
import { motion } from 'framer-motion';
import { Search, Edit, MoreHorizontal, Circle, ArrowLeft } from 'lucide-react';
import { useTab } from '../context/TabContext';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export const ChatTab = () => {
  const { setActiveTab } = useTab();
  const chats = [
    { id: 1, name: 'The Boys', message: 'Jordan: We still on for tonight?', time: '2m', unread: 3, seed: 'boys', isGroup: true },
    { id: 2, name: 'Sam', message: 'Meet at the station at 8', time: '1h', unread: 0, seed: 'sam', isGroup: false },
    { id: 3, name: 'Friday Plans', message: 'Alex: I booked the table', time: 'Yesterday', unread: 0, seed: 'friday', isGroup: true },
    { id: 4, name: 'Taylor', message: 'Sent an attachment', time: 'Tuesday', unread: 0, seed: 'taylor', isGroup: false },
  ];

  return (
    <div className="flex flex-col h-full bg-[#050505] text-white pb-24 overflow-hidden relative font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,255,0.05),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(0,255,255,0.05),transparent_40%)] pointer-events-none" />
      <div className="grain-overlay opacity-30 mix-blend-overlay pointer-events-none" />

      <header className="relative z-20 p-6 bg-black/40 backdrop-blur-2xl border-b border-white/5 sticky top-0 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveTab('home')}
            className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-md"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <h1 className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">CHAT</h1>
        </div>
        <div className="flex gap-3">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-md"
          >
            <Search className="w-5 h-5" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-[var(--magenta)] rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,0,255,0.3)]"
          >
            <Edit className="w-5 h-5" />
          </motion.button>
        </div>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-1 overflow-y-auto p-6 space-y-4 relative z-10 no-scrollbar"
      >
        {chats.map((chat) => (
          <motion.div 
            key={chat.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 border border-white/10 p-4 rounded-[2rem] flex items-center gap-4 backdrop-blur-md shadow-lg cursor-pointer group"
          >
            <div className="relative">
              <div className={`w-14 h-14 rounded-full border-2 overflow-hidden bg-black border-white/10 group-hover:border-[var(--magenta)] transition-colors`}>
                <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${chat.seed}`} alt={chat.name} className="w-full h-full object-cover" />
              </div>
              {chat.unread > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--magenta)] rounded-full border-2 border-black flex items-center justify-center shadow-[0_0_10px_var(--magenta)]">
                  <span className="text-[9px] font-black text-white">{chat.unread}</span>
                </div>
              )}
            </div>
            
            <div className="flex-1 overflow-hidden">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-bold text-lg truncate pr-2">{chat.name}</h4>
                <span className={`text-[10px] font-black uppercase tracking-widest ${chat.unread > 0 ? 'text-[var(--magenta)]' : 'text-white/40'}`}>
                  {chat.time}
                </span>
              </div>
              <p className={`text-sm truncate ${chat.unread > 0 ? 'text-white font-medium' : 'text-white/50'}`}>
                {chat.message}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
