import React from 'react';
import { motion } from 'framer-motion';
import { ModeCard } from '../../../components/onboarding/ModeCard';
import { useOnboardingStore } from '../../../store/onboardingStore';
import { useNavigate } from 'react-router-dom';

const MODES = [
  { id: 'solo', title: 'I move alone', subtitle: 'Solo planner for personal outings.' },
  { id: 'couple', title: 'I and my lover', subtitle: 'Date planning mode for couples.' },
  { id: 'group', title: 'We own the spotlight', subtitle: 'Friends coordinating group outings.' },
  { id: 'host', title: 'Party host', subtitle: 'User creates events and invites people.' },
  { id: 'enterprise', title: 'Enterprise', subtitle: 'Corporate planning for team activities.' },
];

export default function ModeSelectPage() {
  const { mode, setMode } = useOnboardingStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-spendx-black text-spendx-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">Choose Your Vibe</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {MODES.map((m) => (
          <ModeCard
            key={m.id}
            title={m.title}
            subtitle={m.subtitle}
            isSelected={mode === m.id}
            onClick={() => setMode(m.id)}
          />
        ))}
      </div>
      {mode && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate('/app/home')}
          className="mt-12 w-full max-w-xs py-4 bg-spendx-lime text-spendx-black rounded-2xl font-black text-xl uppercase"
        >
          Next
        </motion.button>
      )}
    </div>
  );
}
