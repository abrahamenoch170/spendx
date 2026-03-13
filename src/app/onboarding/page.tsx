import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthModal } from '../../components/onboarding/AuthModal';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [toast, setToast] = useState<string | null>(null);

  const handleAuth = (provider: string) => {
    setToast(`Authentication successful with ${provider}`);
    setTimeout(() => {
      navigate('/app/onboarding/profile');
    }, 1500);
  };

  const handleAnonymous = () => {
    navigate('/app/onboarding/profile');
  };

  return (
    <div className="fixed inset-0 bg-spendx-black flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-spendx-black/60 backdrop-blur-sm" />
      
      <AuthModal 
        onAuth={handleAuth} 
        onAnonymous={handleAnonymous} 
      />

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 bg-spendx-lime text-spendx-black px-6 py-3 rounded-full font-black uppercase tracking-widest text-sm z-50"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
