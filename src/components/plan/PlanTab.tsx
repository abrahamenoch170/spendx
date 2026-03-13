import React, { useState } from 'react';
import { History } from 'lucide-react';
import { ChatSection } from './ChatSection';
import { ToolsDrawer } from './ToolsDrawer';
import { PreviousTrips } from './PreviousTrips';
import { motion } from 'framer-motion';

export const PlanTab = () => {
  const [activeTab, setActiveTab] = useState<'tools' | 'trips'>('tools');

  return (
    <div className="flex flex-col h-full bg-[#050505] text-white">
      <div className="flex items-center justify-between p-6">
        <h1 className="text-3xl font-black uppercase tracking-tighter">Plan</h1>
        <div className="flex items-center gap-4">
          <span className="bg-white/10 text-xs px-3 py-1 rounded-full uppercase font-bold">Mode: We own the spotlight</span>
          <History className="w-6 h-6" />
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <ChatSection />
        </div>
        <div className="md:w-1/3 border-l border-white/10 flex flex-col">
          <div className="flex border-b border-white/10">
            <button className={`flex-1 p-4 font-bold ${activeTab === 'tools' ? 'text-[#D4FF00]' : 'text-white/50'}`} onClick={() => setActiveTab('tools')}>Planning Tools</button>
            <button className={`flex-1 p-4 font-bold ${activeTab === 'trips' ? 'text-[#D4FF00]' : 'text-white/50'}`} onClick={() => setActiveTab('trips')}>Previous Trips</button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'tools' ? <ToolsDrawer /> : <PreviousTrips />}
          </div>
        </div>
      </div>
    </div>
  );
};
