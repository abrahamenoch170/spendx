import Link from 'next/link';

export default function AppIntro() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[var(--bg-color)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--lime)]/5 to-transparent pointer-events-none"></div>
      
      <div className="z-10 flex flex-col items-center text-center max-w-md w-full">
        <div className="mb-12 inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-2xl">
          <span className="text-5xl font-bold tracking-tighter">S<span className="text-[var(--lime)]">x</span></span>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 tracking-tight">
          Welcome to Spendx
        </h1>
        
        <p className="text-[var(--text-secondary)] text-lg mb-12 font-light">
          Your app is ready. Let's start tracking expenses and planning your next adventure.
        </p>
        
        <div className="w-full space-y-4">
          <button className="w-full bg-[var(--lime)] text-black px-6 py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(204,255,0,0.2)]">
            Create a New Trip
          </button>
          
          <button className="w-full bg-transparent border border-[var(--border-color)] text-[var(--text-primary)] px-6 py-4 rounded-2xl font-medium hover:bg-white/5 transition-colors">
            Join Existing Trip
          </button>
        </div>
        
        <Link href="/" className="mt-12 text-sm text-[var(--text-secondary)] hover:text-white transition-colors underline underline-offset-4">
          Back to Landing Page
        </Link>
      </div>
    </main>
  );
}
