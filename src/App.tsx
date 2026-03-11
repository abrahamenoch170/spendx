import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

export default function App() {
  const colors = ['#ccff00', '#ff0099', '#00eeff', '#00cc99'];

  return (
    <div className="relative w-full min-h-screen bg-black font-sans text-black selection:bg-black selection:text-[#ccff00]">
      {/* Fixed Background Stripes */}
      <div className="fixed inset-0 w-full h-screen flex flex-row overflow-hidden z-0">
        {colors.map((color, index) => (
          <div
            key={index}
            className="h-full flex-1 transition-all duration-500 ease-out hover:brightness-110 hover:scale-x-105 relative"
            style={{ backgroundColor: color, transformOrigin: 'center' }}
          />
        ))}
      </div>

      {/* Scrollable Foreground Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center">
        
        {/* Logo Section */}
        <div className="w-full max-w-6xl px-6 pt-12 pb-8 flex justify-center pointer-events-none">
          <img 
            src="https://placehold.co/1200x600/ccff00/000000?text=spendx*" 
            alt="Spendx Logo" 
            className="w-full max-w-2xl mix-blend-multiply filter drop-shadow-xl"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              document.getElementById('text-logo')?.classList.remove('hidden');
            }}
          />
          <h1 id="text-logo" className="hidden font-display text-7xl md:text-[10rem] font-black tracking-tighter text-black mix-blend-multiply">
            spendx*
          </h1>
        </div>

        {/* Main Content Container - No background, just floating on stripes */}
        <main className="w-full max-w-6xl px-6 pb-32 flex flex-col gap-16">
          
          {/* HERO */}
          <section className="text-center pt-12 pb-20 border-b-4 border-black">
            <div className="inline-block px-6 py-2 rounded-full border-2 border-black text-sm font-bold uppercase tracking-widest mb-8 bg-black text-white">
              The Group Chat Killer
            </div>
            <h2 className="font-display text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-10 mix-blend-multiply">
              Your plans hit different <br/>
              when they actually happen.
            </h2>
            <p className="text-xl md:text-3xl font-semibold max-w-4xl mx-auto mb-12 leading-tight mix-blend-multiply">
              No more group chat graveyards. No more "I'm down for whatever." One link controls your whole day—where you go, how you get there, who's coming, and what it costs.
            </p>
            <button className="group relative inline-flex items-center justify-center gap-4 bg-black text-white font-display text-2xl uppercase font-bold px-12 py-6 rounded-full hover:bg-white hover:text-black hover:border-4 hover:border-black transition-all duration-300 hover:scale-105 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]">
              Get the link
            </button>
          </section>

          {/* WHEN PLANS FALL APART */}
          <section className="py-12 border-b-4 border-black">
            <h3 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 mix-blend-multiply">
              When Plans Fall Apart
            </h3>
            <p className="text-3xl font-bold mb-16 mix-blend-multiply">It be like that.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { text: "The 'what should we do tonight?' text that goes unanswered for three hours. The group chat where four people say 'I'm down' but nobody picks the spot.", lottie: "https://assets9.lottiefiles.com/packages/lf20_bhebjzpu.json" },
                { text: "The friend who confirms then cancels when you're already outside. The 2 AM standing in the street figuring out how to split an Uber three ways.", lottie: "https://assets1.lottiefiles.com/packages/lf20_q5pk6p1k.json" },
                { text: "The budget that seemed fine at 8 PM and absolutely wasn't by midnight. Checking your account the next morning with that specific type of regret.", lottie: "https://assets2.lottiefiles.com/packages/lf20_jmejybvu.json" },
                { text: "Being stranded in a city you don't know. The festival ended, rides surging 3x, hotel 40 mins away, phone at 12%. The 'we'll figure it out later' that became 3 AM panic.", lottie: "https://assets8.lottiefiles.com/packages/lf20_tll0j4bb.json" }
              ].map((item, i) => (
                <div key={i} className="border-4 border-black p-8 rounded-3xl bg-white/20 backdrop-blur-md hover:bg-white/40 transition-colors shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <Player
                    autoplay
                    loop
                    src={item.lottie}
                    style={{ height: '80px', width: '80px', margin: '0 0 1rem 0' }}
                  />
                  <p className="text-xl font-bold leading-snug mix-blend-multiply">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* IMAGINE THIS */}
          <section className="py-12 border-b-4 border-black">
            <h3 className="font-display text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 mix-blend-multiply">
              Imagine This
            </h3>
            <p className="text-3xl font-bold mb-12 mix-blend-multiply">Instead, it just works.</p>
            
            <div className="border-4 border-black p-10 rounded-3xl bg-black text-white mb-8 shadow-[12px_12px_0px_0px_rgba(255,255,255,0.3)]">
              <h4 className="font-display text-3xl md:text-5xl font-bold uppercase mb-6">"Link's up. Saturday. Locked in."</h4>
              <p className="text-xl md:text-2xl font-medium opacity-90 leading-tight">
                They click. They see the whole night—where you're starting, where you're going next, how much it costs, who's actually coming, how you're getting there. No 47 messages. The link is the answer to every question before they ask it.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-4 border-black p-8 rounded-3xl bg-white/20 backdrop-blur-md shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-display text-2xl font-black uppercase mb-4 mix-blend-multiply">Know the budget</h4>
                <p className="text-xl font-bold mix-blend-multiply">The AI tracks your running total, suggests the cheaper spot two blocks away when you're getting close, keeps you honest without killing the vibe.</p>
              </div>
              <div className="border-4 border-black p-8 rounded-3xl bg-white/20 backdrop-blur-md shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-display text-2xl font-black uppercase mb-4 mix-blend-multiply">Never Stranded</h4>
                <p className="text-xl font-bold mix-blend-multiply">The ride home is already waiting when you need it. The route back to your stay is mapped. Your battery dies, your plan doesn't.</p>
              </div>
            </div>
          </section>

          {/* WHOEVER YOU'RE WITH */}
          <section className="py-12 border-b-4 border-black">
            <h3 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16 text-center mix-blend-multiply">
              Whoever you're with,<br/> one link handles it.
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Going Alone?", desc: "Solo mode builds your whole route. Go invisible if you want. No location sharing. Just you and the day.", lottie: "https://assets5.lottiefiles.com/packages/lf20_puciaact.json" },
                { title: "With your squad?", desc: "One link drops in the group chat. Live locations without the weird surveillance energy. Bill splits before the check arrives.", lottie: "https://assets1.lottiefiles.com/packages/lf20_q5pk6p1k.json" },
                { title: "Big Group Thing?", desc: "One person plans. Hundreds show up. Attendance tracked, budget pooled, chaos eliminated.", lottie: "https://assets3.lottiefiles.com/packages/lf20_ujxkchcd.json" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center border-4 border-black p-8 rounded-3xl bg-white/20 backdrop-blur-md shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <Player
                    autoplay
                    loop
                    src={item.lottie}
                    style={{ height: '100px', width: '100px', marginBottom: '1rem' }}
                  />
                  <h4 className="font-display text-3xl font-black uppercase mb-4 mix-blend-multiply">{item.title}</h4>
                  <p className="text-lg font-bold mix-blend-multiply">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="py-12 border-b-4 border-black">
            <h3 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16 mix-blend-multiply">
              How it actually works
            </h3>
            <div className="space-y-6">
              {[
                { title: "Get a venue the squad loves", desc: "Real-time heatmap of where the energy actually is. Not 'trending on Instagram'—trending in real life." },
                { title: "Get the bill split before the awkwardness", desc: "Running total visible to everyone. Auto-split when you're done. Export to whatever you use. No 2 AM math." },
                { title: "Get home without the panic", desc: "Tap any venue, your ride is ready. Destination locked. No typing addresses. No 'send the pin.' Just go." },
                { title: "Get everyone synced with one link", desc: "Map, locations, costs, plan—all of it lives there. Share it anywhere. Click it and you're in. No download. No account. No friction." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-6 items-start p-8 bg-white/20 backdrop-blur-md rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-black text-white flex items-center justify-center font-display font-black text-3xl">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-display text-3xl font-black uppercase mb-3 mix-blend-multiply">{item.title}</h4>
                    <p className="text-xl font-bold mix-blend-multiply">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* WAITLIST */}
          <section className="py-12">
            <div className="max-w-3xl mx-auto border-4 border-black p-10 md:p-16 rounded-[3rem] bg-white/30 backdrop-blur-xl shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-display text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 mix-blend-multiply">
                Get In Early
              </h3>
              <p className="text-3xl font-bold mb-12 mix-blend-multiply">Join the waitlist. Test it first.</p>
              
              <form className="space-y-6 mb-12" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="text" 
                  placeholder="Instagram handle (optional)" 
                  className="w-full bg-transparent border-b-4 border-black p-4 font-sans text-2xl focus:outline-none placeholder:text-black/50 font-bold mix-blend-multiply" 
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input 
                    type="text" 
                    placeholder="Your city" 
                    className="w-full bg-transparent border-b-4 border-black p-4 font-sans text-2xl focus:outline-none placeholder:text-black/50 font-bold mix-blend-multiply" 
                  />
                  <input 
                    type="text" 
                    placeholder="Your country" 
                    className="w-full bg-transparent border-b-4 border-black p-4 font-sans text-2xl focus:outline-none placeholder:text-black/50 font-bold mix-blend-multiply" 
                  />
                </div>
                <button className="w-full bg-black text-white font-display text-3xl uppercase font-black py-8 rounded-2xl hover:scale-[1.02] transition-transform mt-8 shadow-[10px_10px_0px_0px_rgba(255,255,255,0.5)]">
                  Lock me in
                </button>
              </form>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="pt-20 pb-12 text-center">
            <h2 className="font-display text-8xl md:text-[10rem] font-black uppercase tracking-tighter mb-8 mix-blend-multiply">No Cap</h2>
            <p className="text-2xl md:text-4xl font-bold max-w-4xl mx-auto mb-8 mix-blend-multiply leading-tight">
              The best nights aren't the ones you plan for weeks. They're the ones that actually happen.
            </p>
            <p className="text-2xl md:text-4xl font-black max-w-4xl mx-auto mb-20 mix-blend-multiply leading-tight">
              Spendx doesn't make you more organized. It makes backing out harder than showing up.
            </p>
            
            <div className="flex flex-col items-center gap-8">
              <div className="font-display text-5xl font-black tracking-tighter mix-blend-multiply">
                spendx* <span className="text-xl font-sans tracking-normal opacity-80 ml-2">— Find your spendx</span>
              </div>
              <div className="flex gap-8 text-xl font-black uppercase tracking-widest mix-blend-multiply">
                <a href="#" className="hover:underline decoration-4 underline-offset-8">Instagram</a>
                <a href="#" className="hover:underline decoration-4 underline-offset-8">TikTok</a>
                <a href="#" className="hover:underline decoration-4 underline-offset-8">Twitter/X</a>
              </div>
            </div>
          </footer>

        </main>
      </div>
    </div>
  );
}
