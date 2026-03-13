import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProfileForm } from '../../../components/onboarding/ProfileForm';
import { AvatarSelector } from '../../../components/onboarding/AvatarSelector';
import { useOnboardingStore } from '../../../store/onboardingStore';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { setProfile } = useOnboardingStore();

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      navigate('/app/onboarding/mode-select');
    }
  };

  return (
    <div className="min-h-screen bg-spendx-black text-spendx-white p-6 flex flex-col items-center">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2].map((s) => (
            <div key={s} className={`h-1 w-12 rounded-full ${s <= step ? 'bg-spendx-lime' : 'bg-white/10'}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <ProfileForm onNext={handleNext} />
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <AvatarSelector onNext={handleNext} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
