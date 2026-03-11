import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

export default function App() {
  const stripeColors = ['#ccff00', '#ff0099', '#00eeff', '#00cc99'];

  return (
    <div className="relative w-full min-h-screen bg-black font-sans text-black selection:bg-black selection:text-[#ccff00]">
      
      {/* Fixed Background Stripes */}
      <div className="fixed inset-0 w-full h-screen flex flex-row overflow-hidden z-0">
        {stripeColors.map((color, index) => (
          <div
            key={index}
            className="h-full flex-1 transition-all duration-500 ease-out hover:brightness-110 relative"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Scrollable Foreground Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center px-4 md:px-8 py-12 gap-24 overflow-x-hidden">
        
        {/* LOGO SECTION - Exactly like the uploaded image */}
        <div className="w-full max-w-7xl bg-[#ccff00] border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] py-24 md:py-40 px-8 flex justify-center items-center mt-8 transition-transform hover:-translate-y-2 hover:shadow-[24px_24px_0px_0px_rgba(0,0,0,1)] duration-300">
          <h1 className="font-display text-7xl md:text-[14rem] font-black tracking-tighter text-black leading-none">
            spendx*
          </h1>
        </div>

        {/* HERO SECTION */}
        <section className="w-full max-w-6xl bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-10 md:p-20 text-center flex flex-col items-center">
          <div className="inline-block px-6 py-2 rounded-full border-4 border-black text-sm md:text-lg font-bold uppercase tracking-widest mb-8 bg-[#00eeff] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            The Group Chat Killer
          </div>
          <h2 className="font-display text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-10">
            Your plans hit different <br/>
            when they actually happen.
          </h2>
          <p className="text-xl md:text-3xl font-bold max-w-4xl mx-auto mb-12 leading-tight text-gray-800">
            No more group chat graveyards. No more "I'm down for whatever." One link controls your whole day—where you go, how you get there, who's coming, and what it costs.
          </p>
          <button className="group relative inline-flex items-center justify-center gap-4 bg-black text-[#ccff00] font-display text-2xl md:text-4xl uppercase font-black px-12 py-6 border-4 border-black hover:bg-[#ff0099] hover:text-black transition-all duration-300 hover:-translate-y-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
            Get the link
          </button>
        </section>

        {/* WHEN PLANS FALL APART - Standalone Stories */}
        <section className="w-full max-w-6xl flex flex-col gap-12">
          <div className="text-center mb-8">
            <h3 className="font-display text-6xl md:text-9xl font-black uppercase tracking-tighter text-white mix-blend-difference drop-shadow-2xl">
              When Plans Fall Apart
            </h3>
            <p className="text-3xl md:text-5xl font-bold text-white mix-blend-difference mt-4">It be like that.</p>
          </div>

          {/* Story 1 */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 bg-[#ff0099] border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-10 md:p-16 transition-transform hover:-translate-y-2 duration-300">
            <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 bg-black rounded-full border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]">
              <Player autoplay loop src="https://assets9.lottiefiles.com/packages/lf20_bhebjzpu.json" style={{ height: '100%', width: '100%' }} />
            </div>
            <p className="text-3xl md:text-5xl font-bold text-black leading-tight">
              The "what should we do tonight?" text that goes unanswered for three hours. The group chat where four people say "I'm down" but nobody picks the spot.
            </p>
          </div>

          {/* Story 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16 bg-[#00eeff] border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-10 md:p-16 transition-transform hover:-translate-y-2 duration-300">
            <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 bg-white rounded-full border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]">
              <Player autoplay loop src="https://assets1.lottiefiles.com/packages/lf20_q5pk6p1k.json" style={{ height: '100%', width: '100%' }} />
            </div>
            <p className="text-3xl md:text-5xl font-bold text-black leading-tight">
              The friend who confirms then cancels when you're already outside. The 2 AM standing in the street figuring out how to split an Uber three ways.
            </p>
          </div>

          {/* Story 3 */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 bg-[#ccff00] border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-10 md:p-16 transition-transform hover:-translate-y-2 duration-300">
            <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 bg-black rounded-full border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]">
              <Player autoplay loop src="https://assets2.lottiefiles.com/packages/lf20_jmejybvu.json" style={{ height: '100%', width: '100%' }} />
            </div>
            <p className="text-3xl md:text-5xl font-bold text-black leading-tight">
              The budget that seemed fine at 8 PM and absolutely wasn't by midnight. Checking your account the next morning with that specific type of regret.
            </p>
          </div>

          {/* Story 4 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16 bg-[#00cc99] border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-10 md:p-16 transition-transform hover:-translate-y-2 duration-300">
            <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 bg-white rounded-full border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]">
              <Player autoplay loop src="https://assets8.lottiefiles.com/packages/lf20_tll0j4bb.json" style={{ height: '100%', width: '100%' }} />
            </div>
            <p className="text-3xl md:text-5xl font-bold text-black leading-tight">
              Being stranded in a city you don't know. The festival ended, rides surging 3x, hotel 40 mins away. The "we'll figure it out later" that became 3 AM panic.
            </p>
          </div>
        </section>

        {/* IMAGINE THIS - Standalone Stories */}
        <section className="w-full max-w-6xl flex flex-col gap-12 mt-12">
          <div className="text-center mb-8">
            <h3 className="font-display text-6xl md:text-9xl font-black uppercase tracking-tighter text-white mix-blend-difference drop-shadow-2xl">
              Imagine This
            </h3>
            <p className="text-3xl md:text-5xl font-bold text-white mix-blend-difference mt-4">Instead, it just works.</p>
          </div>
          
          <div className="bg-black text-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(255,255,255,1)] p-10 md:p-20 transition-transform hover:-translate-y-2 duration-300">
            <h4 className="font-display text-5xl md:text-7xl font-black uppercase mb-8 text-[#ccff00]">"Link's up. Saturday. Locked in."</h4>
            <p className="text-2xl md:text-4xl font-bold leading-tight">
              They click. They see the whole night—where you're starting, where you're going next, how much it costs, who's actually coming, how you're getting there. No 47 messages. The link is the answer to every question before they ask it.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-10 md:p-16 transition-transform hover:-translate-y-2 duration-300">
            <div className="flex-1">
              <h4 className="font-display text-4xl md:text-6xl font-black uppercase mb-6 text-[#ff0099]">Know the budget</h4>
              <p className="text-2xl md:text-4xl font-bold text-black leading-tight">
                The AI tracks your running total, suggests the cheaper spot two blocks away when you're getting close, keeps you honest without killing the vibe.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 bg-[#00eeff] border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-10 md:p-16 transition-transform hover:-translate-y-2 duration-300">
            <div className="flex-1">
              <h4 className="font-display text-4xl md:text-6xl font-black uppercase mb-6 text-black">Never Stranded</h4>
              <p className="text-2xl md:text-4xl font-bold text-black leading-tight">
                The ride home is already waiting when you need it. The route back to your stay is mapped. Your battery dies, your plan doesn't.
              </p>
            </div>
          </div>
        </section>

        {/* WHOEVER YOU'RE WITH - Standalone Stories */}
        <section className="w-full max-w-6xl flex flex-col gap-12 mt-12">
          <div className="text-center mb-8 bg-black border-4 border-black p-12 shadow-[16px_16px_0px_0px_rgba(204,255,0,1)]">
            <h3 className="font-display text-5xl md:text-8xl font-black uppercase tracking-tighter text-white">
              Whoever you're with,<br/> <span className="text-[#00eeff]">one link handles it.</span>
            </h3>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 bg-[#ccff00] border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-10 md:p-16 transition-transform hover:-translate-y-2 duration-300">
            <div className="w-40 h-40 md:w-56 md:h-56 flex-shrink-0 bg-white rounded-full border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]">
              <Player autoplay loop src="https://assets5.lottiefiles.com/packages/lf20_puciaact.json" style={{ height: '100%', width: '100%' }} />
            </div>
            <div>
              <h4 className="font-display text-4xl md:text-6xl font-black uppercase mb-4">Going Alone?</h4>
              <p className="text-2xl md:text-4xl font-bold">Solo mode builds your whole route. Go invisible if you want. No location sharing. Just you and the day.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16 bg-[#ff0099] border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-10 md:p-16 transition-transform hover:-translate-y-2 duration-300">
            <div className="w-40 h-40 md:w-56 md:h-56 flex-shrink-0 bg-black rounded-full border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]">
              <Player autoplay loop src="https://assets1.lottiefiles.com/packages/lf20_q5pk6p1k.json" style={{ height: '100%', width: '100%' }} />
            </div>
            <div>
              <h4 className="font-display text-4xl md:text-6xl font-black uppercase mb-4">With your squad?</h4>
              <p className="text-2xl md:text-4xl font-bold">One link drops in the group chat. Live locations without the weird surveillance energy. Bill splits before the check arrives.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 bg-[#00cc99] border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-10 md:p-16 transition-transform hover:-translate-y-2 duration-300">
            <div className="w-40 h-40 md:w-56 md:h-56 flex-shrink-0 bg-white rounded-full border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]">
              <Player autoplay loop src="https://assets3.lottiefiles.com/packages/lf20_ujxkchcd.json" style={{ height: '100%', width: '100%' }} />
            </div>
            <div>
              <h4 className="font-display text-4xl md:text-6xl font-black uppercase mb-4">Big Group Thing?</h4>
              <p className="text-2xl md:text-4xl font-bold">One person plans. Hundreds show up. Attendance tracked, budget pooled, chaos eliminated.</p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS - Standalone Blocks */}
        <section className="w-full max-w-6xl flex flex-col gap-8 mt-12">
          <div className="text-center mb-8">
            <h3 className="font-display text-6xl md:text-9xl font-black uppercase tracking-tighter text-white mix-blend-difference drop-shadow-2xl">
              How it actually works
            </h3>
          </div>
          
          {[
            { title: "Get a venue the squad loves", desc: "Real-time heatmap of where the energy actually is. Not 'trending on Instagram'—trending in real life.", color: "bg-white" },
            { title: "Get the bill split before the awkwardness", desc: "Running total visible to everyone. Auto-split when you're done. Export to whatever you use. No 2 AM math.", color: "bg-[#ccff00]" },
            { title: "Get home without the panic", desc: "Tap any venue, your ride is ready. Destination locked. No typing addresses. No 'send the pin.' Just go.", color: "bg-[#00eeff]" },
            { title: "Get everyone synced with one link", desc: "Map, locations, costs, plan—all of it lives there. Share it anywhere. Click it and you're in. No download. No account. No friction.", color: "bg-[#ff0099]" }
          ].map((item, i) => (
            <div key={i} className={`flex flex-col md:flex-row gap-8 items-start p-10 md:p-12 ${item.color} border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-x-2 hover:-translate-y-2 duration-300`}>
              <div className="flex-shrink-0 w-20 h-20 rounded-full bg-black text-white flex items-center justify-center font-display font-black text-5xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)]">
                {i + 1}
              </div>
              <div>
                <h4 className="font-display text-4xl md:text-5xl font-black uppercase mb-4 text-black">{item.title}</h4>
                <p className="text-2xl md:text-3xl font-bold text-black">{item.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* WAITLIST */}
        <section className="w-full max-w-5xl mt-20">
          <div className="border-4 border-black p-12 md:p-24 bg-black text-white shadow-[24px_24px_0px_0px_rgba(0,238,255,1)]">
            <h3 className="font-display text-6xl md:text-9xl font-black uppercase tracking-tighter mb-6 text-[#ccff00]">
              Get In Early
            </h3>
            <p className="text-3xl md:text-5xl font-bold mb-16">Join the waitlist. Test it first.</p>
            
            <form className="space-y-8 mb-12" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="Instagram handle (optional)" 
                className="w-full bg-transparent border-b-8 border-white p-6 font-sans text-3xl md:text-4xl focus:outline-none placeholder:text-white/40 font-bold text-[#00eeff]" 
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input 
                  type="text" 
                  placeholder="Your city" 
                  className="w-full bg-transparent border-b-8 border-white p-6 font-sans text-3xl md:text-4xl focus:outline-none placeholder:text-white/40 font-bold text-[#00eeff]" 
                />
                <input 
                  type="text" 
                  placeholder="Your country" 
                  className="w-full bg-transparent border-b-8 border-white p-6 font-sans text-3xl md:text-4xl focus:outline-none placeholder:text-white/40 font-bold text-[#00eeff]" 
                />
              </div>
              <button className="w-full bg-[#ccff00] text-black font-display text-4xl md:text-6xl uppercase font-black py-10 border-4 border-black hover:bg-[#ff0099] transition-colors mt-12 shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
                Lock me in
              </button>
            </form>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="w-full max-w-6xl pt-32 pb-20 text-center">
          <div className="bg-white border-4 border-black p-12 md:p-24 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-display text-8xl md:text-[12rem] font-black uppercase tracking-tighter mb-12 text-[#ff0099]">No Cap</h2>
            <p className="text-3xl md:text-5xl font-bold max-w-4xl mx-auto mb-12 leading-tight text-black">
              The best nights aren't the ones you plan for weeks. They're the ones that actually happen.
            </p>
            <p className="text-3xl md:text-5xl font-black max-w-4xl mx-auto mb-24 leading-tight text-black bg-[#ccff00] p-6 border-4 border-black inline-block transform -rotate-2">
              Spendx doesn't make you more organized. It makes backing out harder than showing up.
            </p>
            
            <div className="flex flex-col items-center gap-12">
              <div className="font-display text-6xl md:text-8xl font-black tracking-tighter text-black">
                spendx* <span className="block md:inline text-2xl md:text-4xl font-sans tracking-normal opacity-80 md:ml-4 mt-4 md:mt-0">— Find your spendx</span>
              </div>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-2xl md:text-4xl font-black uppercase tracking-widest text-black">
                <a href="#" className="hover:text-[#ff0099] hover:underline decoration-8 underline-offset-8 transition-colors">Instagram</a>
                <a href="#" className="hover:text-[#00eeff] hover:underline decoration-8 underline-offset-8 transition-colors">TikTok</a>
                <a href="#" className="hover:text-[#00cc99] hover:underline decoration-8 underline-offset-8 transition-colors">Twitter/X</a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
