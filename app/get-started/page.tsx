"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DownloadSimple, AppleLogo, AndroidLogo, Desktop, Browser } from '@phosphor-icons/react';

export default function GetStarted() {
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop' | null>(null);
  const router = useRouter();

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      setPlatform('ios');
    } else if (/android/.test(ua)) {
      setPlatform('android');
    } else {
      setPlatform('desktop');
    }
  }, []);

  const handleDownloadDesktop = () => {
    alert("Downloading Spendx Desktop Installer...");
    router.push('/app/intro');
  };

  const handleInstallAndroid = () => {
    alert("Triggering PWA install prompt...");
    router.push('/app/intro');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 bg-[var(--bg-color)] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--cyan)]/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="z-10 w-full max-w-md flex flex-col items-center">
        <Link href="/" className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-xl hover:scale-105 transition-transform">
          <span className="text-3xl font-bold tracking-tighter">S<span className="text-[var(--lime)]">x</span></span>
        </Link>

        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-8 w-full flex flex-col items-center text-center shadow-2xl backdrop-blur-sm">
          {platform === 'ios' && (
            <>
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
                <AppleLogo size={32} weight="fill" className="text-[var(--text-primary)]" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Install on iOS</h2>
              <p className="text-[var(--text-secondary)] mb-8 text-sm leading-relaxed">
                To install Spendx, tap the Share button below and select "Add to Home Screen".
              </p>
              
              <div className="bg-black/40 border border-white/5 rounded-2xl p-5 mb-8 w-full text-sm text-left text-[var(--text-secondary)] space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">1</div>
                  <p>Tap the <span className="text-white font-semibold">Share</span> icon at the bottom of your screen.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">2</div>
                  <p>Scroll down and tap <span className="text-white font-semibold">Add to Home Screen</span>.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">3</div>
                  <p>Tap <span className="text-white font-semibold">Add</span> in the top right corner.</p>
                </div>
              </div>
            </>
          )}

          {platform === 'android' && (
            <>
              <div className="w-16 h-16 bg-[var(--lime)]/10 rounded-full flex items-center justify-center mb-6">
                <AndroidLogo size={32} weight="fill" className="text-[var(--lime)]" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Install on Android</h2>
              <p className="text-[var(--text-secondary)] mb-8 text-sm leading-relaxed">
                Get the full Spendx experience by installing the app directly on your device.
              </p>
              <button 
                onClick={handleInstallAndroid}
                className="w-full bg-[var(--lime)] text-black px-6 py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 mb-6 shadow-[0_0_20px_rgba(204,255,0,0.2)]"
              >
                <DownloadSimple size={24} weight="bold" />
                Install Spendx App
              </button>
            </>
          )}

          {platform === 'desktop' && (
            <>
              <div className="w-16 h-16 bg-[var(--cyan)]/10 rounded-full flex items-center justify-center mb-6">
                <Desktop size={32} weight="fill" className="text-[var(--cyan)]" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Download for Desktop</h2>
              <p className="text-[var(--text-secondary)] mb-8 text-sm leading-relaxed">
                Get the Spendx desktop app for Windows, Mac, or Linux for the best experience.
              </p>
              <button 
                onClick={handleDownloadDesktop}
                className="w-full bg-[var(--cyan)] text-black px-6 py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 mb-6 shadow-[0_0_20px_rgba(0,204,255,0.2)]"
              >
                <DownloadSimple size={24} weight="bold" />
                Download Installer
              </button>
            </>
          )}

          {/* Loading state before platform is detected */}
          {platform === null && (
            <div className="py-12 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-[var(--lime)]/30 border-t-[var(--lime)] rounded-full animate-spin"></div>
            </div>
          )}

          <div className="w-full flex items-center gap-4 my-2 opacity-60">
            <div className="h-px bg-[var(--border-color)] flex-1"></div>
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">or</span>
            <div className="h-px bg-[var(--border-color)] flex-1"></div>
          </div>

          <Link 
            href="/app/intro"
            className="w-full bg-transparent border border-[var(--border-color)] text-[var(--text-primary)] px-6 py-4 rounded-2xl font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-3 mt-4"
          >
            <Browser size={20} />
            Continue in Browser
          </Link>
        </div>
      </div>
    </main>
  );
}
