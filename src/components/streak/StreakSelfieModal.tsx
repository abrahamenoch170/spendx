'use client';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Zap } from 'lucide-react';

export const StreakSelfieModal = ({ isOpen, onClose, onComplete }: { isOpen: boolean; onClose: () => void; onComplete: () => void }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const capturePhoto = async () => {
    // Mock photo capture
    console.log("Photo captured");
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    onComplete();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="w-full max-w-sm p-6 rounded-3xl bg-[var(--card-bg)] border border-[var(--border-color)] relative" onClick={e => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-4 right-4"><X /></button>
            <h2 className="text-xl font-bold mb-4">Take a selfie to verify your streak!</h2>
            
            {!stream ? (
              <div className="flex flex-col gap-3">
                <a href="snapchat://add/lens/your-lens-id" className="py-3 rounded-xl bg-[#FFFC00] text-black font-bold text-center">Open Snapchat Lens</a>
                <button onClick={startCamera} className="py-3 rounded-xl bg-[var(--border-color)]">Use Camera</button>
              </div>
            ) : (
              <div className="relative">
                <video ref={videoRef} autoPlay playsInline className="w-full rounded-2xl mb-4" />
                <button onClick={capturePhoto} className="w-full py-3 rounded-xl bg-[var(--lime)] text-black font-bold flex items-center justify-center gap-2">
                  <Camera className="w-5 h-5" /> Capture
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
