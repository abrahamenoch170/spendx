'use client';
import React, { useState } from 'react';
import { SignInModal } from '../../../components/SignInModal';
// import { useRouter } from 'next/navigation'; // Next.js not fully configured for this, skipping router for now

export default function SignInPage() {
  const [isOpen, setIsOpen] = useState(true);
  // const router = useRouter();

  const handleClose = () => {
    setIsOpen(false);
    // router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-color)]">
      <SignInModal isOpen={isOpen} onClose={handleClose} />
    </div>
  );
}
