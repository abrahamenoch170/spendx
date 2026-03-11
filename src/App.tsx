import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const StarIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="black" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function App() {
  const stripeColors = ['#CCFF00', '#FF0099', '#00CCFF', '#00AA88'];

  return (
    <div className="relative w-full min-h-screen bg-black font-sans text-black selection:bg-black selection:text-[#CCFF00] overflow-x-hidden">
      
      {/* Fixed Background Stripes */}
      <div className="fixed inset-0 w-full h-screen flex flex-row overflow-hidden z-0">
        {stripeColors.map((color, index) => (
          <div
            key={index}
            className="h-full flex-1 transition-all duration-700 ease-in-out hover:brightness-110 relative"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Minimal Fixed Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
        <div className="font-display font-black text-2xl tracking-tighter pointer-events-auto cursor-pointer">spendx*</div>
        <button className="text-label px-6 py-2 rounded-full border border-white hover:bg-white hover:text-black transition-colors pointer-events-auto">
          Get Early Access
        </button>
      </nav>

      {/* Scrollable Foreground Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center">
        
        {/* HERO SECTION - Lime Overlay */}
        <section className="relative w-full bg-[#CCFF00]/85 backdrop-blur-xl clip-1 flex flex-col items-center justify-center min-h-screen pt-32 pb-32">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          
          {/* Floating Animated Star */}
          <div className="absolute top-32 right-[15%] animate-[spin_10s_linear_infinite] hidden md:block">
            <StarIcon />
          </div>

          <div className="relative z-10 w-full max-w-[1400px] mx-auto section-padding flex flex-col items-center text-center">
            <h1 className="text-hero text-black mb-6 max-w-5xl">
              Your plans hit different <br className="hidden md:block"/> when they actually happen.
            </h1>
            <p className="text-body text-black/90 mb-10 max-w-[60ch] mx-auto">
              No more group chat graveyards. One link controls your whole day—where you go, how you get there, who's coming, and what it costs.
            </p>
            <button className="text-label bg-black text-[#CCFF00] px-12 py-6 rounded-full hover:bg-[#FF0099] hover:text-white transition-all duration-300 shadow-xl text-lg">
              Get the link
            </button>
          </div>

          {/* Bouncing Scroll Indicator */}
          <div className="absolute bottom-16 animate-bounce">
            <ChevronDownIcon />
          </div>
        </section>

        {/* WHEN PLANS FALL APART - Magenta Overlay */}
        <section className="relative w-full bg-[#FF0099]/85 backdrop-blur-xl clip-2 flex flex-col items-center pb-32">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          <div className="relative z-10 w-full max-w-[1400px] mx-auto section-padding">
            <div className="text-center mb-16">
              <span className="text-label text-white/90 bg-black/20 px-4 py-2 rounded-full">The Problem</span>
              <h2 className="text-section-h2 text-white mt-8 mb-4">When Plans Fall Apart</h2>
            </div>

            {/* Sketch/Motion Illustration - Dead Chat */}
            <div className="w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-16 shadow-lg border border-white/20 flex flex-col items-center">
              <Player autoplay loop src="https://assets9.lottiefiles.com/packages/lf20_bhebjzpu.json" style={{ height: '250px', width: '250px' }} />
              <p className="text-body text-white text-center mt-6 font-bold max-w-xl">
                The group chat where four people say "I'm down" but nobody picks the spot.
              </p>
            </div>

            {/* Problem Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "Budget blowout", icon: "https://assets2.lottiefiles.com/packages/lf20_jmejybvu.json" },
                { title: "Stranded at 2am", icon: "https://assets8.lottiefiles.com/packages/lf20_tll0j4bb.json" },
                { title: "Same boring spots", icon: "https://assets5.lottiefiles.com/packages/lf20_puciaact.json" },
                { title: "Small plans falling apart", icon: "https://assets1.lottiefiles.com/packages/lf20_q5pk6p1k.json" }
              ].map((item, i) => (
                <div key={i} className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 flex items-center gap-6 border border-white/10 hover:bg-black/30 transition-colors">
                  <div className="w-20 h-20 flex-shrink-0 bg-white/20 rounded-full p-3">
                    <Player autoplay loop src={item.icon} style={{ height: '100%', width: '100%' }} />
                  </div>
                  <h4 className="text-2xl font-bold text-white">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IMAGINE THIS - Cyan Overlay */}
        <section className="relative w-full bg-[#00CCFF]/85 backdrop-blur-xl clip-3 flex flex-col items-center pb-32">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          <div className="relative z-10 w-full max-w-[1400px] mx-auto section-padding">
            <div className="text-center mb-16">
              <span className="text-label text-black/80 bg-white/40 px-4 py-2 rounded-full">The Solution</span>
              <h2 className="text-section-h2 text-black mt-8 mb-4">Instead, it just works.</h2>
            </div>

            {/* Sketch/Motion Illustration - Link Unfurling */}
            <div className="w-full max-w-4xl mx-auto bg-white/30 backdrop-blur-md rounded-3xl p-8 md:p-12 mb-16 shadow-lg border border-white/40 flex flex-col md:flex-row items-center gap-8">
              <div className="w-48 h-48 flex-shrink-0 bg-black/5 rounded-full p-4">
                <Player autoplay loop src="https://assets3.lottiefiles.com/packages/lf20_q7uarxsb.json" style={{ height: '100%', width: '100%' }} />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-3xl md:text-5xl font-black text-black mb-4">One link expands into the full plan.</h3>
                <p className="text-body text-black/80 mx-auto md:mx-0">Map, locations, costs, plan—all of it lives there. Share it anywhere. Click it and you're in.</p>
              </div>
            </div>

            {/* 3 Columns Benefit Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Link's up notification", desc: "Instant sync across the squad." },
                { title: "Budget tracking", desc: "Visualized costs in real-time." },
                { title: "Never stranded", desc: "Rides home guaranteed." }
              ].map((item, i) => (
                <div key={i} className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30 flex flex-col items-center text-center">
                  <h4 className="text-2xl font-bold text-black mb-4">{item.title}</h4>
                  <p className="text-body text-black/80">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHOEVER YOU'RE WITH - Teal Overlay */}
        <section className="relative w-full bg-[#00AA88]/85 backdrop-blur-xl clip-4 flex flex-col items-center pb-32">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          <div className="relative z-10 w-full max-w-[1400px] mx-auto section-padding">
            <h2 className="text-section-h2 text-white text-center mt-0 mb-16">Whoever you're with</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Solo", desc: "Single figure with headphones, city behind", lottie: "https://assets5.lottiefiles.com/packages/lf20_puciaact.json" },
                { title: "Squad", desc: "Three avatars with connecting lines", lottie: "https://assets1.lottiefiles.com/packages/lf20_q5pk6p1k.json" },
                { title: "Big Group", desc: "Many small figures organized in grid", lottie: "https://assets3.lottiefiles.com/packages/lf20_ujxkchcd.json" }
              ].map((item, i) => (
                <div key={i} className="bg-black/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-40 h-40 bg-white/10 rounded-full p-6 mb-8 group-hover:scale-110 transition-transform duration-300">
                    <Player autoplay loop src={item.lottie} style={{ height: '100%', width: '100%' }} />
                  </div>
                  <h4 className="text-3xl font-black text-white mb-4">{item.title}</h4>
                  <p className="text-body text-white/80">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS - Lime Overlay */}
        <section className="relative w-full bg-[#CCFF00]/85 backdrop-blur-xl clip-1 flex flex-col items-center pb-32">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          <div className="relative z-10 w-full max-w-[1400px] mx-auto section-padding">
            <div className="text-center mb-16">
              <span className="text-label text-black/80 bg-white/40 px-4 py-2 rounded-full">The Process</span>
              <h2 className="text-section-h2 text-black mt-8 mb-4">How It Works</h2>
            </div>

            {/* Horizontal Scroll Mobile / Vertical Desktop */}
            <div className="flex flex-row md:flex-col gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 md:pb-0 hide-scrollbar">
              {[
                { step: "01", title: "Find the hotspots", desc: "Magnifying glass over map with hotspots", lottie: "https://assets8.lottiefiles.com/packages/lf20_tll0j4bb.json" },
                { step: "02", title: "Clean math", desc: "Bill splitting with clean math", lottie: "https://assets2.lottiefiles.com/packages/lf20_jmejybvu.json" },
                { step: "03", title: "Ride arrives", desc: "Car arriving at pin location", lottie: "https://assets4.lottiefiles.com/packages/lf20_x9p1jxg9.json" },
                { step: "04", title: "Share the link", desc: "Link being shared to multiple people", lottie: "https://assets3.lottiefiles.com/packages/lf20_q7uarxsb.json" }
              ].map((item, i) => (
                <div key={i} className="snap-center shrink-0 w-[85vw] md:w-full flex flex-col md:flex-row items-center gap-8 bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-white/50 relative">
                  {/* Connecting Line (Desktop) */}
                  {i !== 3 && <div className="hidden md:block absolute left-[5.5rem] top-full w-1 h-8 bg-black/20 z-0"></div>}
                  
                  <div className="w-16 h-16 rounded-full bg-black text-[#CCFF00] flex items-center justify-center font-black text-2xl z-10 shrink-0">
                    {item.step}
                  </div>
                  <div className="w-32 h-32 shrink-0 bg-white/50 rounded-full p-4">
                    <Player autoplay loop src={item.lottie} style={{ height: '100%', width: '100%' }} />
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="text-2xl md:text-4xl font-black text-black mb-2">{item.title}</h4>
                    <p className="text-body text-black/80">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WAITLIST & FOOTER - Black Overlay */}
        <section className="relative w-full bg-black/90 backdrop-blur-xl clip-2 flex flex-col items-center text-white pb-16">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          <div className="relative z-10 w-full max-w-[1400px] mx-auto section-padding flex flex-col items-center text-center">
            
            {/* Waitlist */}
            <div className="w-full max-w-4xl mb-32">
              <h2 className="text-section-h2 text-[#CCFF00] drop-shadow-sm mt-0 mb-4">
                Get In Early
              </h2>
              <p className="text-body text-white/90 mb-12 mx-auto">Join the waitlist. Test it first.</p>
              
              <form className="w-full space-y-6" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="text" 
                  placeholder="Instagram handle (optional)" 
                  className="w-full bg-white/10 rounded-2xl p-6 text-body focus:outline-none focus:bg-white/20 placeholder:text-white/40 font-medium transition-colors border border-white/10" 
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input 
                    type="text" 
                    placeholder="Your city" 
                    className="w-full bg-white/10 rounded-2xl p-6 text-body focus:outline-none focus:bg-white/20 placeholder:text-white/40 font-medium transition-colors border border-white/10" 
                  />
                  <input 
                    type="text" 
                    placeholder="Your country" 
                    className="w-full bg-white/10 rounded-2xl p-6 text-body focus:outline-none focus:bg-white/20 placeholder:text-white/40 font-medium transition-colors border border-white/10" 
                  />
                </div>
                <button className="w-full bg-[#CCFF00] text-black text-label px-10 py-6 rounded-full hover:bg-[#FF0099] hover:text-white transition-all duration-300 mt-8 shadow-xl">
                  Lock me in
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="w-full flex flex-col items-center">
              <h2 className="text-hero text-[#FF0099] mb-10">No Cap</h2>
              <p className="text-body text-white/80 mb-10 mx-auto">
                The best nights aren't the ones you plan for weeks. They're the ones that actually happen.
              </p>
              <div className="bg-[#CCFF00] p-8 rounded-3xl inline-block transform -rotate-2 shadow-lg mb-20">
                <p className="text-body font-black text-black m-0">
                  Spendx doesn't make you more organized. It makes backing out harder than showing up.
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-10 w-full border-t border-white/10 pt-12">
                <div className="text-[clamp(2rem,5vw,4rem)] font-black tracking-tighter text-white flex flex-col md:flex-row items-center gap-4">
                  spendx* <span className="text-body font-normal opacity-60">— Find your spendx</span>
                </div>
                <div className="flex flex-wrap justify-center gap-8 text-label text-gray-500">
                  <a href="#" className="hover:text-[#FF0099] transition-colors">Instagram</a>
                  <a href="#" className="hover:text-[#00CCFF] transition-colors">TikTok</a>
                  <a href="#" className="hover:text-[#00AA88] transition-colors">Twitter/X</a>
                </div>
                
                <div className="mt-12 pt-8 border-t border-white/10 w-full max-w-2xl">
                  <p className="text-label text-gray-500 mb-2">
                    Designed & Built by
                  </p>
                  <p className="text-[clamp(1.5rem,3vw,2.5rem)] font-black text-white tracking-tight">
                    Detova Labs
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
