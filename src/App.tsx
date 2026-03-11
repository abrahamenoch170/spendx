/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, MapPin, Users, Zap, CheckCircle2, Share2, Trophy, CalendarHeart, Ghost, ShieldAlert } from 'lucide-react';

export default function App() {
  const colors = ['#ccff00', '#ff0099', '#00eeff', '#00cc99'];

  return (
    <div className="relative w-full min-h-screen bg-black font-sans text-white selection:bg-[#ccff00] selection:text-black">
      
      {/* Fixed Background Stripes */}
      <div className="fixed inset-0 w-full h-screen flex flex-row overflow-hidden z-0">
        {colors.map((color, index) => (
          <div
            key={index}
            className="h-full flex-1 transition-all duration-500 ease-out hover:brightness-125 hover:scale-x-110 relative shadow-[0_0_40px_rgba(0,0,0,0.1)]"
            style={{
              backgroundColor: color,
              transformOrigin: 'center'
            }}
          />
        ))}
      </div>

      {/* Scrollable Foreground Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center">
        
        {/* Logo Section - Blending with background */}
        <div className="w-full max-w-5xl px-6 pt-24 pb-16 flex justify-center pointer-events-none">
          {/* 
            Using mix-blend-multiply so the light green background of the logo 
            tints the stripes, and the black lines stay stark black.
            Replace the src with your actual uploaded logo file path.
          */}
          <img 
            src="https://placehold.co/1200x600/ccff00/000000?text=spendx*" 
            alt="Spendx Logo" 
            className="w-full max-w-3xl mix-blend-multiply contrast-125 filter drop-shadow-2xl"
            onError={(e) => {
              // Fallback if image doesn't load
              e.currentTarget.style.display = 'none';
              document.getElementById('text-logo')?.classList.remove('hidden');
            }}
          />
          <h1 id="text-logo" className="hidden font-display text-8xl md:text-[12rem] font-black tracking-tighter text-black mix-blend-multiply opacity-90">
            spendx*
          </h1>
        </div>

        {/* Main Content Container */}
        <main className="w-full max-w-5xl bg-black/85 backdrop-blur-2xl border-x border-t border-white/10 rounded-t-[3rem] shadow-2xl overflow-hidden">
          
          {/* HERO */}
          <section className="px-8 py-24 md:px-16 text-center border-b border-white/10">
            <div className="inline-block px-4 py-2 rounded-full border border-white/20 text-sm font-bold uppercase tracking-widest mb-8 text-[#ccff00]">
              The Group Chat Killer
            </div>
            <h2 className="font-display text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-10">
              Your plans hit different <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] to-[#00cc99]">
                when they actually happen.
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 font-medium max-w-3xl mx-auto mb-12 leading-relaxed">
              No more group chat graveyards. No more "I'm down for whatever." One link controls your whole day—where you go, how you get there, who's coming, and what it costs.
            </p>
            <button className="group relative inline-flex items-center justify-center gap-4 bg-white text-black font-display text-2xl uppercase font-bold px-10 py-5 rounded-full hover:bg-[#ccff00] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(204,255,0,0.4)]">
              Get the link
              <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </button>
          </section>

          {/* WHEN PLANS FALL APART */}
          <section className="px-8 py-24 md:px-16 border-b border-white/10">
            <h3 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-[#ff0099]">
              When Plans Fall Apart
            </h3>
            <p className="text-2xl font-bold mb-12 text-white/60">It be like that.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                <ShieldAlert className="w-10 h-10 text-[#ff0099] mb-6" />
                <p className="text-lg text-gray-300 leading-relaxed">
                  The "what should we do tonight?" text that goes unanswered for three hours. The group chat where four people say "I'm down" but nobody picks the spot.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                <Users className="w-10 h-10 text-[#ff0099] mb-6" />
                <p className="text-lg text-gray-300 leading-relaxed">
                  The friend who confirms then cancels when you're already outside. The 2 AM standing in the street figuring out how to split an Uber three ways when nobody's sober enough for math.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                <Zap className="w-10 h-10 text-[#ff0099] mb-6" />
                <p className="text-lg text-gray-300 leading-relaxed">
                  The budget that seemed fine at 8 PM and absolutely wasn't by midnight. The "I have 40" that turned into 80. Checking your account the next morning with that specific type of regret.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                <MapPin className="w-10 h-10 text-[#ff0099] mb-6" />
                <p className="text-lg text-gray-300 leading-relaxed">
                  Being stranded in a city you don't know. The festival ended, rides surging 3x, hotel 40 mins away, phone at 12%. The "we'll figure it out later" that became 3 AM panic.
                </p>
              </div>
            </div>
            
            <div className="mt-6 bg-[#ff0099]/10 border border-[#ff0099]/30 p-8 rounded-3xl">
              <p className="text-xl font-medium text-[#ff0099] leading-relaxed">
                It's not that you don't want to go out. It's that getting everyone out the door feels like a part-time job you didn't apply for. So you stay in. Or you go alone. Or you say yes to plans you don't actually want because at least they're plans.
              </p>
            </div>
          </section>

          {/* IMAGINE THIS */}
          <section className="px-8 py-24 md:px-16 bg-[#ccff00] text-black border-b border-white/10">
            <h3 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
              Imagine This
            </h3>
            <p className="text-3xl font-bold mb-12 opacity-80">Instead, it just works.</p>
            
            <div className="space-y-8">
              <div className="bg-black/5 border border-black/10 p-8 rounded-3xl">
                <h4 className="font-display text-2xl font-bold uppercase mb-4">"Link's up. Saturday. Locked in."</h4>
                <p className="text-lg font-medium opacity-80">
                  They click. They see the whole night—where you're starting, where you're going next, how much it costs, who's actually coming, how you're getting there. No 47 messages. The link is the answer to every question before they ask it.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-display text-xl font-bold uppercase mb-3">Know the budget</h4>
                  <p className="font-medium opacity-80">The AI tracks your running total, suggests the cheaper spot two blocks away when you're getting close, keeps you honest without killing the vibe.</p>
                </div>
                <div>
                  <h4 className="font-display text-xl font-bold uppercase mb-3">Never Stranded</h4>
                  <p className="font-medium opacity-80">The ride home is already waiting when you need it. The route back to your stay is mapped. Your battery dies, your plan doesn't.</p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <p className="font-display text-3xl md:text-5xl font-black uppercase tracking-tighter">
                That's the difference between <br/>
                <span className="line-through opacity-50">"we should"</span> and "we went."
              </p>
            </div>
          </section>

          {/* WHOEVER YOU'RE WITH */}
          <section className="px-8 py-24 md:px-16 border-b border-white/10">
            <h3 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter mb-16 text-center">
              Whoever you're with,<br/> <span className="text-[#00eeff]">one link handles it.</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-[#00eeff]/20 rounded-full flex items-center justify-center mb-6 border border-[#00eeff]/50">
                  <Ghost className="w-10 h-10 text-[#00eeff]" />
                </div>
                <h4 className="font-display text-2xl font-bold uppercase mb-4">Going Alone?</h4>
                <p className="text-gray-400">Solo mode builds your whole route. Go invisible if you want. No location sharing. Just you and the day.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-[#00eeff]/20 rounded-full flex items-center justify-center mb-6 border border-[#00eeff]/50">
                  <Users className="w-10 h-10 text-[#00eeff]" />
                </div>
                <h4 className="font-display text-2xl font-bold uppercase mb-4">With your squad?</h4>
                <p className="text-gray-400">One link drops in the group chat. Live locations without the weird surveillance energy. Bill splits before the check arrives.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-[#00eeff]/20 rounded-full flex items-center justify-center mb-6 border border-[#00eeff]/50">
                  <Zap className="w-10 h-10 text-[#00eeff]" />
                </div>
                <h4 className="font-display text-2xl font-bold uppercase mb-4">Big Group Thing?</h4>
                <p className="text-gray-400">One person plans. Hundreds show up. Attendance tracked, budget pooled, chaos eliminated.</p>
              </div>
            </div>
          </section>

          {/* PLAN YOUR DATE & SHARE PROOF */}
          <section className="grid grid-cols-1 md:grid-cols-2 border-b border-white/10">
            <div className="p-8 md:p-16 border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/5 transition-colors">
              <CalendarHeart className="w-12 h-12 text-[#ff0099] mb-8" />
              <h3 className="font-display text-3xl font-black uppercase tracking-tighter mb-4">Plan Your Date</h3>
              <p className="text-gray-400 leading-relaxed">
                Stop stressing about where to go. Tell us the vibe—first date, anniversary, "we need to get out"—and we build the night. Dinner held. Next spot mapped. Ride home ready. You just show up and be present.
              </p>
            </div>
            <div className="p-8 md:p-16 hover:bg-white/5 transition-colors">
              <Share2 className="w-12 h-12 text-[#00cc99] mb-8" />
              <h3 className="font-display text-3xl font-black uppercase tracking-tighter mb-4">Share The Proof</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                After the night, we make your recap—clean, shareable, undeniable. Drop it on your story. Add it to the photo dump. Let them know you actually did something.
              </p>
              <div className="bg-black border border-white/20 p-4 rounded-xl font-mono text-sm text-[#00cc99]">
                "Saturday: 6 spots, 47 each, 3 new places, home by 2"
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="px-8 py-24 md:px-16 border-b border-white/10">
            <h3 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter mb-16">
              How it actually works
            </h3>
            <div className="space-y-6">
              {[
                { title: "Get a venue the squad loves", desc: "Real-time heatmap of where the energy actually is. Not 'trending on Instagram'—trending in real life." },
                { title: "Get the bill split before the awkwardness", desc: "Running total visible to everyone. Auto-split when you're done. Export to whatever you use. No 2 AM math." },
                { title: "Get home without the panic", desc: "Tap any venue, your ride is ready. Destination locked. No typing addresses. No 'send the pin.' Just go." },
                { title: "Get everyone synced with one link", desc: "Map, locations, costs, plan—all of it lives there. Share it anywhere. Click it and you're in. No download. No account. No friction." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start p-6 bg-white/5 rounded-3xl border border-white/10">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-display font-bold text-xl">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-display text-2xl font-bold uppercase mb-2">{item.title}</h4>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center font-display text-3xl font-black uppercase mt-16 text-[#ccff00]">
              You stop managing the day. You start living it.
            </p>
          </section>

          {/* WAITLIST */}
          <section className="px-8 py-24 md:px-16 bg-white text-black">
            <div className="max-w-2xl mx-auto">
              <h3 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
                Get In Early
              </h3>
              <p className="text-2xl font-bold mb-12 opacity-80">Join the waitlist. Test it first.</p>
              
              <form className="space-y-4 mb-12" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="text" 
                  placeholder="Instagram handle (optional)" 
                  className="w-full bg-black/5 border-2 border-black/10 p-5 rounded-2xl font-sans text-lg focus:outline-none focus:border-black transition-colors placeholder:text-black/40 font-medium" 
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Your city" 
                    className="w-full bg-black/5 border-2 border-black/10 p-5 rounded-2xl font-sans text-lg focus:outline-none focus:border-black transition-colors placeholder:text-black/40 font-medium" 
                  />
                  <input 
                    type="text" 
                    placeholder="Your country" 
                    className="w-full bg-black/5 border-2 border-black/10 p-5 rounded-2xl font-sans text-lg focus:outline-none focus:border-black transition-colors placeholder:text-black/40 font-medium" 
                  />
                </div>
                <button className="w-full bg-black text-white font-display text-2xl uppercase font-bold py-6 rounded-2xl hover:scale-[1.02] transition-transform mt-4">
                  Lock me in
                </button>
              </form>

              <div className="bg-black/5 p-8 rounded-3xl border border-black/10">
                <h4 className="font-display text-xl font-bold uppercase mb-6">What you get:</h4>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 font-medium"><CheckCircle2 className="text-[#00cc99]" /> First access when we drop in your city</li>
                  <li className="flex items-center gap-3 font-medium"><Trophy className="text-[#ff0099]" /> First on the leaderboard (founding advantage)</li>
                  <li className="flex items-center gap-3 font-medium"><Zap className="text-[#00eeff]" /> Premium features for your first month (test everything, free)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="px-8 py-16 md:px-16 text-center">
            <h2 className="font-display text-6xl font-black uppercase tracking-tighter mb-8">No Cap</h2>
            <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto mb-6">
              The best nights aren't the ones you plan for weeks. They're the ones that actually happen.
            </p>
            <p className="text-xl text-white font-bold max-w-2xl mx-auto mb-16">
              Spendx doesn't make you more organized. It makes backing out harder than showing up.
            </p>
            
            <div className="flex flex-col items-center gap-8">
              <div className="font-display text-3xl font-black tracking-tighter">
                spendx* <span className="text-sm font-sans tracking-normal opacity-50 ml-2">— Find your spendx</span>
              </div>
              <div className="flex gap-6 text-sm font-bold uppercase tracking-widest text-gray-500">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">TikTok</a>
                <a href="#" className="hover:text-white transition-colors">Twitter/X</a>
              </div>
            </div>
          </footer>

        </main>
      </div>
    </div>
  );
}

