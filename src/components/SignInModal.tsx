import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone } from 'lucide-react';

export const SignInModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
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
              <button className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors">
                <Mail className="w-5 h-5" />
                Continue with Google
              </button>
              <button className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold hover:bg-[var(--border-color)] transition-colors">
                Continue with Apple/Snapchat/Instagram
              </button>
              <button className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold hover:bg-[var(--border-color)] transition-colors">
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
