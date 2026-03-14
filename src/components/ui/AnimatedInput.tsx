import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  validate?: (value: string) => boolean;
  errorMessage?: string;
}

export const AnimatedInput = ({ label, validate, errorMessage = 'This field is required', ...props }: AnimatedInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    const value = e.target.value;
    const valid = validate ? validate(value) : value.trim() !== '';
    
    setIsValid(valid);
    setError(valid ? null : errorMessage);
  };

  return (
    <div className="relative w-full">
      <label className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">
        {label}
      </label>
      <motion.div
        animate={{ 
          borderColor: isFocused ? 'var(--electric-cyan)' : (isValid === false ? '#FF804D' : 'rgba(255,255,255,0.1)') 
        }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="relative border-2 rounded-2xl overflow-hidden"
      >
        <motion.div
          animate={isValid === false ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <input
            {...props}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            className="w-full bg-white/5 p-4 outline-none text-white font-bold"
          />
        </motion.div>
        <AnimatePresence>
          {isValid === true && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--deep-teal)]"
            >
              <Check className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-[#FF804D] text-xs font-bold mt-2"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
