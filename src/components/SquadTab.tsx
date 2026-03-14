import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Users, Plus, MapPin, ChevronRight, Phone, MessageCircle, ArrowLeft } from 'lucide-react';
import { useTab } from '../context/TabContext';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export const SquadTab = () => {
  const { setActiveTab } = useTab();
  const squadMembers = [
    { id: 1, name: 'Sam', status: 'At The Alchemist', time: '2m ago', seed: 'sam', active: true },
    { id: 2, name: 'Jordan', status: 'Heading to Soho', time: '15m ago', seed: 'jordan', active: true },
    { id: 3, name: 'Alex', status: 'Offline', time: '2h ago', seed: 'alex', active: false },
    { id: 4, name: 'Taylor', status: 'Offline', time: '5h ago', seed: 'taylor', active: false },
  ];

  return (
    <div className="flex flex-col h-full bg-[#050505] text-white pb-24 overflow-hidden relative font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,255,255,0.05),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(204,255,0,0.05),transparent_40%)] pointer-events-none" />
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
          <div>
            <h1 className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">SQUAD</h1>
            <p className="text-xs font-bold text-[var(--cyan)] uppercase tracking-widest mt-1">2 Active Now</p>
          </div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-md"
        >
          <Plus className="w-6 h-6" />
        </motion.button>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-1 overflow-y-auto p-6 space-y-8 relative z-10 no-scrollbar"
      >
        {/* Active Squad Map Preview */}
        <motion.section variants={itemVariants} className="relative h-48 rounded-[2.5rem] overflow-hidden border border-white/10 group cursor-pointer shadow-2xl">
          <div className="absolute inset-0 bg-[#111] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          
          {/* Fake Map Markers */}
          <div className="absolute top-1/2 left-1/3 w-10 h-10 rounded-full border-2 border-[var(--lime)] bg-black z-20 overflow-hidden shadow-[0_0_15px_rgba(204,255,0,0.5)]">
            <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=sam`} alt="Sam" className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-1/3 right-1/3 w-10 h-10 rounded-full border-2 border-[var(--cyan)] bg-black z-20 overflow-hidden shadow-[0_0_15px_rgba(0,255,255,0.5)]">
            <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=jordan`} alt="Jordan" className="w-full h-full object-cover" />
          </div>

          <div className="absolute bottom-5 left-5 right-5 z-20 flex justify-between items-end">
            <div>
              <h3 className="font-black text-xl tracking-tight">Live Map</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> 2 members sharing location
              </p>
            </div>
            <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:text-black transition-all">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        </motion.section>

        {/* Squad List */}
        <motion.section variants={itemVariants} className="space-y-4">
          <h3 className="text-sm font-black text-white/40 uppercase tracking-widest px-2">Your People</h3>
          
          <div className="space-y-3">
            {squadMembers.map((member) => (
              <motion.div 
                key={member.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 border border-white/10 p-4 rounded-[2rem] flex items-center gap-4 backdrop-blur-md shadow-lg"
              >
                <div className="relative">
                  <div className={`w-14 h-14 rounded-[1.25rem] border-2 overflow-hidden bg-black ${member.active ? 'border-[var(--lime)]' : 'border-white/10'}`}>
                    <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${member.seed}`} alt={member.name} className={`w-full h-full object-cover ${!member.active && 'grayscale opacity-50'}`} />
                  </div>
                  {member.active && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[var(--lime)] rounded-full border-2 border-black shadow-[0_0_10px_var(--lime)]" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-bold text-lg">{member.name}</h4>
                  <p className={`text-xs font-medium ${member.active ? 'text-white/80' : 'text-white/40'}`}>
                    {member.status}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/5">
                    <MessageCircle className="w-4 h-4 text-white/70" />
                  </button>
                  {member.active && (
                    <button className="w-10 h-10 rounded-full bg-[var(--lime)]/10 hover:bg-[var(--lime)]/20 flex items-center justify-center transition-colors border border-[var(--lime)]/30">
                      <Phone className="w-4 h-4 text-[var(--lime)]" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};
