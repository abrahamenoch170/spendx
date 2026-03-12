'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone } from 'lucide-react';
// Placeholder icons for social logos
const SocialIcon = ({ name }: { name: string }) => (
  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-black">
    {name[0]}
  </div>
);

export const SignInModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const handleSignIn = (provider: string) => {
    console.log(`Signing in with ${provider}`);
    onClose();
    window.location.href = '/onboarding/modes';
  };

  const providers = [
    { name: 'Google', icon: 'G' },
    { name: 'Apple', icon: 'A' },
    { name: 'Snapchat', icon: 'S' },
    { name: 'Instagram', icon: 'I' },
    { name: 'TikTok', icon: 'T' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md p-6 rounded-3xl glass-panel relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Sign In</h2>
            
            <div className="flex flex-col gap-3">
              {providers.map((p) => (
                <button 
                  key={p.name}
                  onClick={() => handleSignIn(p.name)}
                  className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold hover:bg-[var(--border-color)] transition-colors"
                >
                  <SocialIcon name={p.name} />
                  Continue with {p.name}
                </button>
              ))}
              <button 
                onClick={() => handleSignIn('Phone')}
                className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold hover:bg-[var(--border-color)] transition-colors"
              >
                <Phone className="w-5 h-5" />
                Continue with Phone Number
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
