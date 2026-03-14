import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowLeft, TrendingUp, Users, Zap, ChevronRight } from 'lucide-react';
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

export const EnterpriseTab = () => {
  const { setActiveTab } = useTab();

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
          <div>
            <h1 className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">ENTERPRISE</h1>
            <p className="text-xs font-bold text-[var(--magenta)] uppercase tracking-widest mt-1">Partner Portal</p>
          </div>
        </div>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-1 overflow-y-auto p-6 space-y-8 relative z-10 no-scrollbar"
      >
        {/* Hero Section */}
        <motion.section variants={itemVariants} className="bg-gradient-to-br from-[var(--magenta)]/20 to-black border border-[var(--magenta)]/30 p-8 rounded-[2.5rem] relative overflow-hidden shadow-[0_0_30px_rgba(255,0,255,0.1)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--magenta)]/20 blur-[50px] rounded-full" />
          <Briefcase className="w-12 h-12 text-[var(--magenta)] mb-4" />
          <h2 className="text-2xl font-black tracking-tight mb-2">Grow your venue with Spendx</h2>
          <p className="text-white/60 text-sm font-medium mb-6">Reach thousands of active users looking for their next destination.</p>
          <button className="bg-[var(--magenta)] text-white font-black px-6 py-3 rounded-xl hover:bg-[#cc00cc] transition-colors shadow-[0_0_15px_rgba(255,0,255,0.3)]">
            Manage Venue
          </button>
        </motion.section>

        {/* Quick Stats */}
        <motion.section variants={itemVariants} className="grid grid-cols-2 gap-4">
          {[
            { label: 'Total Visits', value: '2.4k', icon: Users, color: 'var(--cyan)' },
            { label: 'Revenue', value: '£12.5k', icon: TrendingUp, color: 'var(--lime)' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 p-5 rounded-[2rem] border border-white/10 backdrop-blur-md shadow-lg">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3" style={{ color: stat.color }}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-[10px] text-white/50 font-black uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="font-black text-2xl">{stat.value}</p>
            </div>
          ))}
        </motion.section>

        {/* Active Campaigns */}
        <motion.section variants={itemVariants} className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-sm font-black text-white/40 uppercase tracking-widest">Active Campaigns</h3>
            <button className="flex items-center gap-1 text-[10px] font-black text-[var(--magenta)] uppercase tracking-widest hover:text-white transition-colors group">
              View All <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="space-y-3">
            {[
              { title: 'Friday Night Special', status: 'Active', reach: '1.2k', color: 'var(--lime)' },
              { title: 'Student Discount', status: 'Paused', reach: '850', color: 'white/40' },
            ].map((campaign, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 border border-white/10 p-5 rounded-[2rem] flex items-center justify-between backdrop-blur-md shadow-lg cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center">
                    <Zap className="w-6 h-6" style={{ color: campaign.color }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base">{campaign.title}</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest mt-1" style={{ color: campaign.color }}>
                      {campaign.status}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black">{campaign.reach}</p>
                  <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Reach</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};
