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
            className="h-full flex-1 transition-all duration-700 ease-in-out hover:brightness-110 relative"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Scrollable Foreground Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center px-4 md:px-8 py-12 gap-16 overflow-x-hidden">
        
        {/* LOGO SECTION */}
        <div className="w-full max-w-7xl bg-[#ccff00]/90 backdrop-blur-xl rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] py-16 md:py-32 px-8 flex justify-center items-center mt-4 transition-transform hover:-translate-y-2 duration-500">
          <h1 className="font-display text-6xl md:text-[12rem] lg:text-[14rem] font-black tracking-tighter text-black leading-none text-center">
            spendx*
          </h1>
        </div>

        {/* HERO SECTION (Chat Group Killer) - Yellow Overlay */}
        <section className="w-full max-w-6xl bg-[#ccff00]/85 backdrop-blur-xl rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] p-8 md:p-24 text-center flex flex-col items-center transition-transform hover:-translate-y-2 duration-500">
          <div className="inline-block px-6 md:px-8 py-2 md:py-3 rounded-full text-xs md:text-lg font-bold uppercase tracking-widest mb-8 md:mb-10 bg-black text-[#ccff00]">
            The Group Chat Killer
          </div>
          <h2 className="font-display text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8 md:mb-10 text-black">
            Your plans hit different <br className="hidden md:block"/>
            when they actually happen.
          </h2>
          <p className="text-lg md:text-2xl lg:text-3xl font-bold max-w-4xl mx-auto mb-10 md:mb-14 leading-tight text-black/80">
            No more group chat graveyards. No more "I'm down for whatever." One link controls your whole day—where you go, how you get there, who's coming, and what it costs.
          </p>
          <button className="group relative inline-flex items-center justify-center gap-4 bg-black text-[#ccff00] font-display text-xl md:text-3xl lg:text-4xl uppercase font-black px-10 md:px-14 py-5 md:py-6 rounded-full hover:bg-[#ff0099] hover:text-white transition-all duration-300 hover:-translate-y-2 shadow-xl hover:shadow-2xl">
            Get the link
          </button>
        </section>

        {/* WHEN PLANS FALL APART - Green Overlay */}
        <section className="w-full max-w-6xl bg-[#00cc99]/85 backdrop-blur-xl rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] p-8 md:p-16 lg:p-24 flex flex-col gap-12 transition-transform hover:-translate-y-2 duration-500">
          <div className="text-center mb-4">
            <h3 className="font-display text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter text-black drop-shadow-md">
              When Plans Fall Apart
            </h3>
            <p className="text-xl md:text-3xl lg:text-4xl font-bold text-black/80 mt-4">It be like that.</p>
          </div>

          <div className="flex flex-col gap-8">
            {[
              { 
                text: "The 'what should we do tonight?' text that goes unanswered for three hours. The group chat where four people say 'I'm down' but nobody picks the spot.", 
                lottie: "https://assets9.lottiefiles.com/packages/lf20_bhebjzpu.json", // Silence/Ghost/Empty
              },
              { 
                text: "The friend who confirms then cancels when you're already outside.", 
                lottie: "https://assets1.lottiefiles.com/packages/lf20_q5pk6p1k.json", // Person waiting/on phone
                reverse: true
              },
              { 
                text: "The 2 AM standing in the street figuring out how to split an Uber three ways.", 
                lottie: "https://assets3.lottiefiles.com/packages/lf20_ujxkchcd.json", // Group/Confusion
              },
              { 
                text: "The budget that seemed fine at 8 PM and absolutely wasn't by midnight. Checking your account the next morning with that specific type of regret.", 
                lottie: "https://assets2.lottiefiles.com/packages/lf20_jmejybvu.json", // Money/Wallet
                reverse: true
              },
              { 
                text: "Being stranded in a city you don't know. The festival ended, rides surging 3x, hotel 40 mins away. The 'we'll figure it out later' that became 3 AM panic.", 
                lottie: "https://assets8.lottiefiles.com/packages/lf20_tll0j4bb.json", // Map/Location panic
              }
            ].map((item, i) => (
              <div key={i} className={`flex flex-col ${item.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-6 md:gap-12 bg-white/30 backdrop-blur-md rounded-[2rem] p-8 md:p-12 shadow-lg`}>
                <div className="w-40 h-40 md:w-56 md:h-56 flex-shrink-0 bg-white/40 rounded-full overflow-hidden shadow-inner p-6 flex items-center justify-center">
                  <Player autoplay loop src={item.lottie} style={{ height: '100%', width: '100%' }} />
                </div>
                <p className="text-xl md:text-3xl lg:text-4xl font-bold text-black leading-tight text-center md:text-left">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* IMAGINE THIS - Blue Overlay */}
        <section className="w-full max-w-6xl bg-[#00eeff]/85 backdrop-blur-xl rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] p-8 md:p-16 lg:p-24 flex flex-col gap-12 transition-transform hover:-translate-y-2 duration-500">
          <div className="text-center mb-4">
            <h3 className="font-display text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter text-black drop-shadow-md">
              Imagine This
            </h3>
            <p className="text-xl md:text-3xl lg:text-4xl font-bold text-black/80 mt-4">Instead, it just works.</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-black text-white rounded-[2rem] shadow-xl p-8 md:p-16">
            <div className="w-40 h-40 md:w-56 md:h-56 flex-shrink-0 bg-white/10 backdrop-blur-md rounded-full overflow-hidden p-6 flex items-center justify-center">
              <Player autoplay loop src="https://assets3.lottiefiles.com/packages/lf20_q7uarxsb.json" style={{ height: '100%', width: '100%' }} />
            </div>
            <div className="text-center md:text-left">
              <h4 className="font-display text-3xl md:text-5xl lg:text-6xl font-black uppercase mb-4 md:mb-6 text-[#ccff00]">"Link's up. Saturday. Locked in."</h4>
              <p className="text-lg md:text-2xl lg:text-3xl font-medium leading-tight opacity-90">
                They click. They see the whole night—where you're starting, where you're going next, how much it costs, who's actually coming, how you're getting there. No 47 messages. The link is the answer to every question before they ask it.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white/40 backdrop-blur-md rounded-[2rem] shadow-lg p-8 md:p-12">
            <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 bg-black/5 rounded-full overflow-hidden p-6 flex items-center justify-center">
              <Player autoplay loop src="https://assets2.lottiefiles.com/packages/lf20_jmejybvu.json" style={{ height: '100%', width: '100%' }} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="font-display text-2xl md:text-4xl lg:text-5xl font-black uppercase mb-3 md:mb-4 text-[#ff0099]">Know the budget</h4>
              <p className="text-lg md:text-2xl lg:text-3xl font-bold text-black/80 leading-tight">
                The AI tracks your running total, suggests the cheaper spot two blocks away when you're getting close, keeps you honest without killing the vibe.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12 bg-white/40 backdrop-blur-md rounded-[2rem] shadow-lg p-8 md:p-12">
            <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 bg-black/5 rounded-full overflow-hidden p-6 flex items-center justify-center">
              <Player autoplay loop src="https://assets4.lottiefiles.com/packages/lf20_x9p1jxg9.json" style={{ height: '100%', width: '100%' }} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="font-display text-2xl md:text-4xl lg:text-5xl font-black uppercase mb-3 md:mb-4 text-black">Never Stranded</h4>
              <p className="text-lg md:text-2xl lg:text-3xl font-bold text-black/80 leading-tight">
                The ride home is already waiting when you need it. The route back to your stay is mapped. Your battery dies, your plan doesn't.
              </p>
            </div>
          </div>
        </section>

        {/* WHOEVER YOU'RE WITH - Pink Overlay */}
        <section className="w-full max-w-6xl bg-[#ff0099]/85 backdrop-blur-xl rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] p-8 md:p-16 lg:p-24 flex flex-col gap-12 transition-transform hover:-translate-y-2 duration-500">
          <div className="text-center mb-4 bg-black/20 backdrop-blur-md rounded-[2rem] p-8 md:p-12 shadow-lg">
            <h3 className="font-display text-3xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white">
              Whoever you're with,<br/> <span className="text-[#ccff00]">one link handles it.</span>
            </h3>
          </div>
          
          {[
            { 
              title: "Going Alone?", 
              desc: "Solo mode builds your whole route. Go invisible if you want. No location sharing. Just you and the day.", 
              lottie: "https://assets5.lottiefiles.com/packages/lf20_puciaact.json", 
            },
            { 
              title: "With your squad?", 
              desc: "One link drops in the group chat. Live locations without the weird surveillance energy. Bill splits before the check arrives.", 
              lottie: "https://assets1.lottiefiles.com/packages/lf20_q5pk6p1k.json", 
              reverse: true
            },
            { 
              title: "Big Group Thing?", 
              desc: "One person plans. Hundreds show up. Attendance tracked, budget pooled, chaos eliminated.", 
              lottie: "https://assets3.lottiefiles.com/packages/lf20_ujxkchcd.json", 
            }
          ].map((item, i) => (
            <div key={i} className={`flex flex-col ${item.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12 bg-white/30 backdrop-blur-md rounded-[2rem] shadow-lg p-8 md:p-12`}>
              <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 bg-white/40 rounded-full overflow-hidden p-6 flex items-center justify-center">
                <Player autoplay loop src={item.lottie} style={{ height: '100%', width: '100%' }} />
              </div>
              <div className="text-center md:text-left">
                <h4 className="font-display text-2xl md:text-4xl lg:text-5xl font-black uppercase mb-3 md:mb-4 text-black">{item.title}</h4>
                <p className="text-lg md:text-2xl lg:text-3xl font-bold leading-tight text-black/80">{item.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* WAITLIST */}
        <section className="w-full max-w-5xl mt-12">
          <div className="rounded-[3rem] p-8 md:p-16 lg:p-24 bg-black/90 backdrop-blur-xl text-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-2 duration-500">
            <h3 className="font-display text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter mb-4 md:mb-6 text-[#ccff00] text-center md:text-left">
              Get In Early
            </h3>
            <p className="text-xl md:text-3xl lg:text-4xl font-bold mb-10 md:mb-14 opacity-90 text-center md:text-left">Join the waitlist. Test it first.</p>
            
            <form className="space-y-6 mb-8" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="Instagram handle (optional)" 
                className="w-full bg-white/10 rounded-2xl p-5 md:p-6 font-sans text-lg md:text-2xl focus:outline-none focus:bg-white/20 placeholder:text-white/40 font-bold transition-colors" 
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Your city" 
                  className="w-full bg-white/10 rounded-2xl p-5 md:p-6 font-sans text-lg md:text-2xl focus:outline-none focus:bg-white/20 placeholder:text-white/40 font-bold transition-colors" 
                />
                <input 
                  type="text" 
                  placeholder="Your country" 
                  className="w-full bg-white/10 rounded-2xl p-5 md:p-6 font-sans text-lg md:text-2xl focus:outline-none focus:bg-white/20 placeholder:text-white/40 font-bold transition-colors" 
                />
              </div>
              <button className="w-full bg-[#ccff00] text-black font-display text-2xl md:text-4xl lg:text-5xl uppercase font-black py-6 md:py-8 rounded-full hover:bg-[#ff0099] hover:text-white transition-all duration-300 mt-6 md:mt-8 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                Lock me in
              </button>
            </form>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="w-full max-w-6xl pt-8 pb-16 text-center">
          <div className="bg-white/90 backdrop-blur-xl rounded-[3rem] p-8 md:p-16 lg:p-24 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] flex flex-col items-center">
            <h2 className="font-display text-5xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter mb-8 md:mb-10 text-[#ff0099]">No Cap</h2>
            <p className="text-xl md:text-3xl lg:text-4xl font-bold max-w-4xl mx-auto mb-8 md:mb-10 leading-tight text-gray-800">
              The best nights aren't the ones you plan for weeks. They're the ones that actually happen.
            </p>
            <p className="text-xl md:text-3xl lg:text-4xl font-black max-w-4xl mx-auto mb-16 md:mb-20 leading-tight text-black bg-[#ccff00] p-6 md:p-8 rounded-3xl inline-block transform -rotate-2 shadow-lg">
              Spendx doesn't make you more organized. It makes backing out harder than showing up.
            </p>
            
            <div className="flex flex-col items-center gap-8 md:gap-10 w-full border-t-2 border-black/10 pt-12">
              <div className="font-display text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-black">
                spendx* <span className="block md:inline text-lg md:text-2xl lg:text-3xl font-sans tracking-normal opacity-60 md:ml-4 mt-2 md:mt-0">— Find your spendx</span>
              </div>
              <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-lg md:text-xl lg:text-2xl font-black uppercase tracking-widest text-gray-500">
                <a href="#" className="hover:text-[#ff0099] transition-colors">Instagram</a>
                <a href="#" className="hover:text-[#00eeff] transition-colors">TikTok</a>
                <a href="#" className="hover:text-[#00cc99] transition-colors">Twitter/X</a>
              </div>
              
              <div className="mt-12 pt-8 border-t-2 border-black/10 w-full max-w-2xl">
                <p className="font-sans text-sm md:text-base font-bold text-gray-400 uppercase tracking-widest">
                  Designed & Built by
                </p>
                <p className="font-display text-2xl md:text-4xl font-black text-black mt-2 tracking-tight">
                  Detova Labs
                </p>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
