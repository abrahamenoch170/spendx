import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Apple, Smartphone, Monitor, Share, PlusSquare, ArrowRight, Download } from 'lucide-react';
import { InteractiveButton } from '../components/InteractiveElements';

type Platform = 'ios' | 'android' | 'desktop';

export const GetStartedPage = () => {
  const [platform, setPlatform] = useState<Platform>('desktop');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Install detection
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                         window.matchMedia('(display-mode: fullscreen)').matches ||
                         (window.navigator as any).standalone;
    if (isStandalone) {
      navigate('/app/home');
    }

    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      setPlatform('ios');
    } else if (/android/.test(ua)) {
      setPlatform('android');
    } else {
      setPlatform('desktop');
    }

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, [navigate]);

  const handleInstallAndroid = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      alert('Tap the browser menu (three dots) and choose "Install App" or "Add to Home screen"');
    }
  };

  const handleDownloadDesktop = () => {
    // Mock download
    const link = document.createElement('a');
    link.href = '/downloads/spendx-desktop-installer.exe';
    link.download = 'spendx-desktop-installer.exe';
    document.body.appendChild(link);
    // link.click(); // Commented out for safety in preview
    document.body.removeChild(link);
    alert('Mock download started: spendx-desktop-installer.exe');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[var(--lime)] selection:text-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="grain-overlay" />
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--lime)]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Logo */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-display font-black text-4xl tracking-tighter mb-12 cursor-pointer"
          onClick={() => navigate('/')}
        >
          spendx*
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl"
        >
          <h1 className="text-2xl font-black mb-2 text-center">INSTALL SPENDX</h1>
          <p className="text-white/50 text-center text-sm mb-8 uppercase tracking-widest">Experience the social layer</p>

          {platform === 'ios' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Apple className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold">iOS Detected</p>
                  <p className="text-xs text-white/40 uppercase tracking-wider">Safari Browser</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 font-bold text-sm">1</div>
                  <p className="text-sm text-white/80 pt-1.5 flex items-center gap-2">
                    Tap the <Share className="w-4 h-4 text-[var(--cyan)]" /> Share icon in Safari
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 font-bold text-sm">2</div>
                  <p className="text-sm text-white/80 pt-1.5 flex items-center gap-2">
                    Select <PlusSquare className="w-4 h-4 text-[var(--magenta)]" /> "Add to Home Screen"
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 font-bold text-sm">3</div>
                  <p className="text-sm text-white/80 pt-1.5">Confirm installation in the top right</p>
                </div>
              </div>

              <div className="pt-4">
                <div className="w-full aspect-video bg-white/5 rounded-2xl border border-dashed border-white/20 flex items-center justify-center text-white/20 text-xs uppercase tracking-widest">
                  Installation Guide Visual
                </div>
              </div>
            </div>
          )}

          {platform === 'android' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold">Android Detected</p>
                  <p className="text-xs text-white/40 uppercase tracking-wider">Chrome Browser</p>
                </div>
              </div>

              <InteractiveButton 
                onClick={handleInstallAndroid}
                className="w-full py-5 bg-[var(--lime)] text-black rounded-2xl font-black text-lg shadow-[0_0_30px_rgba(204,255,0,0.2)]"
              >
                INSTALL SPENDX APP
              </InteractiveButton>

              <p className="text-center text-[10px] text-white/30 uppercase tracking-[0.2em]">
                If prompt doesn't appear, tap menu <br /> and choose "Install App"
              </p>
            </div>
          )}

          {platform === 'desktop' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Monitor className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold">Desktop Detected</p>
                  <p className="text-xs text-white/40 uppercase tracking-wider">Windows / macOS</p>
                </div>
              </div>

              <InteractiveButton 
                onClick={handleDownloadDesktop}
                className="w-full py-5 bg-white text-black rounded-2xl font-black text-lg flex items-center justify-center gap-3"
              >
                <Download className="w-5 h-5" />
                DOWNLOAD FOR DESKTOP
              </InteractiveButton>
            </div>
          )}

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-[#0A0A0A] px-4 text-white/30 tracking-[0.3em]">or</span></div>
          </div>

          <button 
            onClick={() => navigate('/intro-check')}
            className="w-full flex items-center justify-center gap-2 text-white/60 hover:text-white transition-colors font-bold group"
          >
            CONTINUE IN BROWSER
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <p className="mt-12 text-center text-[10px] text-white/20 uppercase tracking-[0.2em] leading-relaxed">
          Spendx is optimized for mobile <br />
          Experience the full social layer on your home screen
        </p>
      </div>
    </div>
  );
};
