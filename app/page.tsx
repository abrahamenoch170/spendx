import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 bg-[var(--bg-color)] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--lime)]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--magenta)]/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="z-10 flex flex-col items-center text-center">
        <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-2xl">
          <span className="text-4xl font-bold tracking-tighter">S<span className="text-[var(--lime)]">x</span></span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
          Spend<span className="text-[var(--lime)]">x</span>
        </h1>
        
        <p className="text-[var(--text-secondary)] text-xl md:text-2xl mb-12 max-w-2xl font-light">
          The ultimate group expense tracker and itinerary planner. Share costs, plan trips, and settle up with zero friction.
        </p>
        
        <Link 
          href="/get-started"
          className="bg-[var(--lime)] text-black px-10 py-4 rounded-full font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(204,255,0,0.3)]"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}
