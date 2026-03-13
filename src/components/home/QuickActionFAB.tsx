import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const QuickActionFAB = () => {
  const navigate = useNavigate();
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => navigate('/app/plan')}
      className="fixed bottom-24 right-6 w-16 h-16 bg-[#D4FF00] text-[#000] rounded-full flex items-center justify-center shadow-lg"
    >
      <Plus className="w-8 h-8" />
    </motion.button>
  );
};
