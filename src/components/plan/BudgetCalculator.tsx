import React, { useMemo } from 'react';
import { useAppStore } from '../../store/appStore';
import { Minus, Plus, RefreshCw } from 'lucide-react';

export const BudgetCalculator = () => {
  const { 
    activeMode, totalCost, manualPerPersonCost, customGroupSize, squads,
    setTotalCost, setManualPerPersonCost, setCustomGroupSize 
  } = useAppStore();

  const groupSize = useMemo(() => {
    switch (activeMode) {
      case 'solo': return 1;
      case 'stealth': return 2; // Assuming couple-like
      case 'group': 
        const squad = squads.find(s => s.id === 'sq1');
        return squad ? squad.members.length : 1;
      case 'emergency':
      case 'discovery':
        return customGroupSize;
      default: return 1;
    }
  }, [activeMode, customGroupSize, squads]);

  const calculatedPerPerson = useMemo(() => {
    return groupSize > 0 ? totalCost / groupSize : 0;
  }, [totalCost, groupSize]);

  const displayPerPerson = manualPerPersonCost !== null ? manualPerPersonCost : calculatedPerPerson;

  return (
    <div className="bg-[#0A0A0A] p-6 rounded-3xl border border-white/10 mt-6">
      <h2 className="text-xl font-light mb-6">Budget Calculator</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-xs text-white/50">Total Cost</p>
          <input 
            type="number" 
            value={totalCost} 
            onChange={(e) => setTotalCost(Number(e.target.value))}
            className="w-full bg-transparent text-2xl font-bold mt-1 outline-none"
          />
        </div>
        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-xs text-white/50">Per Person</p>
          <input 
            type="number" 
            value={displayPerPerson.toFixed(2)} 
            onChange={(e) => setManualPerPersonCost(Number(e.target.value))}
            className="w-full bg-transparent text-2xl font-bold mt-1 outline-none"
          />
        </div>
      </div>

      {(activeMode === 'emergency' || activeMode === 'discovery') && (
        <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl mb-6">
          <p className="text-sm">Group Size</p>
          <div className="flex items-center gap-4">
            <button onClick={() => setCustomGroupSize(Math.max(1, customGroupSize - 1))} className="p-2 bg-white/10 rounded-full"><Minus size={16} /></button>
            <span className="font-bold">{customGroupSize}</span>
            <button onClick={() => setCustomGroupSize(customGroupSize + 1)} className="p-2 bg-white/10 rounded-full"><Plus size={16} /></button>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button 
          onClick={() => setManualPerPersonCost(null)} 
          className="flex-1 p-4 rounded-xl border border-white/10 flex items-center justify-center gap-2"
        >
          <RefreshCw size={16} /> Reset
        </button>
        <button 
          onClick={() => setManualPerPersonCost(calculatedPerPerson)} 
          className="flex-1 p-4 rounded-xl bg-[#CCFF00] text-black font-bold"
        >
          Split Equally
        </button>
      </div>
    </div>
  );
};
