import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Check } from 'lucide-react';
import { usePlanStore } from '../../store/planStore';

export const BudgetTab = () => {
  const { budgets, updateBudgetEntry } = usePlanStore();

  const total = useMemo(() => budgets.reduce((acc, b) => acc + b.amount, 0), [budgets]);

  const applySuggestion = (id: string, amount: number) => {
    updateBudgetEntry(id, amount);
  };

  return (
    <div className="p-6 h-full bg-[var(--pure-black)] text-white">
      <h2 className="text-2xl font-bold mb-6">Budget Suggestions</h2>
      <div className="space-y-6">
        {budgets.map((budget) => (
          <BudgetRow key={budget.id} budget={budget} onApply={() => applySuggestion(budget.id, budget.suggestion || 0)} />
        ))}
      </div>
      <div className="mt-8 p-4 bg-white/5 rounded-2xl flex justify-between items-center">
        <span className="text-sm uppercase tracking-widest text-white/50">Total</span>
        <motion.span 
          key={total}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-3xl font-black text-[var(--electric-cyan)]"
        >
          ${total}
        </motion.span>
      </div>
    </div>
  );
};

const BudgetRow = ({ budget, onApply }: { budget: any, onApply: () => void }) => {
  const { name, amount, suggestion, confidence } = budget;

  const stars = Array.from({ length: 3 }, (_, i) => {
    const fill = Math.min(Math.max((confidence || 0) / 5 * 3 - i, 0), 1);
    return fill;
  });

  return (
    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <h3 className="font-bold">{name}</h3>
          <Sparkles className="w-4 h-4 text-[var(--electric-cyan)] animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/50">Suggested: ${suggestion}</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onApply}
            className="p-2 rounded-full border border-[var(--acid-lime)] text-[var(--acid-lime)]"
          >
            <Check className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
      <div className="flex gap-1">
        {stars.map((fill, i) => (
          <Star 
            key={i} 
            className={`w-5 h-5 ${fill > 0 ? 'text-[var(--electric-cyan)] fill-[var(--electric-cyan)]' : 'text-white/20'}`} 
          />
        ))}
      </div>
    </div>
  );
};
