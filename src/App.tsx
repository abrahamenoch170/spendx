import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

export default function App() {
  const stripeColors = ['#CCFF00', '#FF0099', '#00CCFF', '#00AA88'];

  return (
    <div className="relative w-full min-h-screen bg-black font-sans text-black selection:bg-black selection:text-[#CCFF00]">
      
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
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center px-4 py-12 gap-16 overflow-x-hidden">
        
        {/* LOGO SECTION */}
        <div className="w-full max-w-[1400px] mx-auto bg-[#CCFF00]/90 backdrop-blur-xl rounded-[3rem] shadow-lg border-b border-black/8 py-16 md:py-32 px-8 flex justify-center items-center mt-4 transition-transform hover:-translate-y-2 duration-500 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          <h1 className="text-hero text-black text-center relative z-10">
            spendx*
          </h1>
        </div>

        {/* HERO SECTION (Chat Group Killer) - Yellow Overlay */}
        <section className="w-full max-w-[1400px] mx-auto section-padding bg-[#CCFF00]/85 backdrop-blur-xl rounded-[3rem] shadow-lg border-b border-black/8 flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-500 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          <div className="relative z-10 flex flex-col items-center w-full">
            <div className="text-label bg-black text-[#CCFF00] px-6 py-3 rounded-full mb-8">
              The Group Chat Killer
            </div>
            <h2 className="text-hero text-black mb-8">
              Your plans hit different <br className="hidden md:block"/>
              when they actually happen.
            </h2>
            <p className="text-body text-black/90 mb-10 mx-auto">
              No more group chat graveyards. No more "I'm down for whatever." One link controls your whole day—where you go, how you get there, who's coming, and what it costs.
            </p>
            <button className="text-label bg-black text-[#CCFF00] px-10 py-5 rounded-full hover:bg-[#FF0099] hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-xl">
              Get the link
            </button>
          </div>
        </section>

        {/* WHEN PLANS FALL APART - Teal Overlay */}
        <section className="w-full max-w-[1400px] mx-auto section-padding bg-[#00AA88]/85 backdrop-blur-xl rounded-[3rem] shadow-lg border-b border-black/8 flex flex-col transition-transform hover:-translate-y-2 duration-500 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          <div className="relative z-10 w-full flex flex-col items-center">
            <div className="text-center w-full flex flex-col items-center">
              <h2 className="text-section-h2 text-white drop-shadow-sm">
                When Plans Fall Apart
              </h2>
              <p className="text-body text-white/90 mb-16 text-center">It be like that.</p>
            </div>

            <div className="flex flex-col gap-16 w-full">
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
                <div key={i} className={`flex flex-col ${item.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16 bg-white/10 backdrop-blur-md rounded-[2rem] p-8 md:p-12 shadow-sm border border-white/10`}>
                  <div className="w-40 h-40 md:w-56 md:h-56 flex-shrink-0 bg-white/20 rounded-full overflow-hidden p-6 flex items-center justify-center">
                    <Player autoplay loop src={item.lottie} style={{ height: '100%', width: '100%' }} />
                  </div>
                  <p className="text-body text-white font-medium text-center md:text-left">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IMAGINE THIS - Cyan Overlay */}
        <section className="w-full max-w-[1400px] mx-auto section-padding bg-[#00CCFF]/85 backdrop-blur-xl rounded-[3rem] shadow-lg border-b border-black/8 flex flex-col transition-transform hover:-translate-y-2 duration-500 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          <div className="relative z-10 w-full flex flex-col items-center">
            <div className="text-center w-full flex flex-col items-center">
              <h2 className="text-section-h2 text-black drop-shadow-sm">
                Imagine This
              </h2>
              <p className="text-body text-black/80 mb-16 text-center">Instead, it just works.</p>
            </div>
            
            <div className="flex flex-col gap-16 w-full">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 bg-black text-white rounded-[2rem] shadow-xl p-8 md:p-16">
                <div className="w-40 h-40 md:w-56 md:h-56 flex-shrink-0 bg-white/10 backdrop-blur-md rounded-full overflow-hidden p-6 flex items-center justify-center">
                  <Player autoplay loop src="https://assets3.lottiefiles.com/packages/lf20_q7uarxsb.json" style={{ height: '100%', width: '100%' }} />
                </div>
                <div className="text-center md:text-left flex flex-col items-center md:items-start">
                  <h4 className="text-[clamp(2rem,5vw,3.5rem)] font-black uppercase mb-6 text-[#CCFF00] leading-tight">"Link's up. Saturday. Locked in."</h4>
                  <p className="text-body text-white/90">
                    They click. They see the whole night—where you're starting, where you're going next, how much it costs, who's actually coming, how you're getting there. No 47 messages. The link is the answer to every question before they ask it.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 bg-white/40 backdrop-blur-md rounded-[2rem] shadow-sm border border-white/20 p-8 md:p-12">
                <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 bg-black/5 rounded-full overflow-hidden p-6 flex items-center justify-center">
                  <Player autoplay loop src="https://assets2.lottiefiles.com/packages/lf20_jmejybvu.json" style={{ height: '100%', width: '100%' }} />
                </div>
                <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
                  <h4 className="text-[clamp(1.5rem,4vw,2.5rem)] font-black uppercase mb-4 text-[#FF0099] leading-tight">Know the budget</h4>
                  <p className="text-body text-black/90">
                    The AI tracks your running total, suggests the cheaper spot two blocks away when you're getting close, keeps you honest without killing the vibe.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16 bg-white/40 backdrop-blur-md rounded-[2rem] shadow-sm border border-white/20 p-8 md:p-12">
                <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 bg-black/5 rounded-full overflow-hidden p-6 flex items-center justify-center">
                  <Player autoplay loop src="https://assets4.lottiefiles.com/packages/lf20_x9p1jxg9.json" style={{ height: '100%', width: '100%' }} />
                </div>
                <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
                  <h4 className="text-[clamp(1.5rem,4vw,2.5rem)] font-black uppercase mb-4 text-black leading-tight">Never Stranded</h4>
                  <p className="text-body text-black/90">
                    The ride home is already waiting when you need it. The route back to your stay is mapped. Your battery dies, your plan doesn't.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHOEVER YOU'RE WITH - Magenta Overlay */}
        <section className="w-full max-w-[1400px] mx-auto section-padding bg-[#FF0099]/85 backdrop-blur-xl rounded-[3rem] shadow-lg border-b border-black/8 flex flex-col transition-transform hover:-translate-y-2 duration-500 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          <div className="relative z-10 w-full flex flex-col items-center">
            <div className="text-center w-full flex flex-col items-center">
              <h2 className="text-section-h2 text-white drop-shadow-sm">
                Whoever you're with,<br/> <span className="text-[#CCFF00]">one link handles it.</span>
              </h2>
            </div>
            
            <div className="flex flex-col gap-16 w-full mt-8">
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
                <div key={i} className={`flex flex-col ${item.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16 bg-white/10 backdrop-blur-md rounded-[2rem] shadow-sm border border-white/10 p-8 md:p-12`}>
                  <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 bg-white/20 rounded-full overflow-hidden p-6 flex items-center justify-center">
                    <Player autoplay loop src={item.lottie} style={{ height: '100%', width: '100%' }} />
                  </div>
                  <div className="text-center md:text-left flex flex-col items-center md:items-start">
                    <h4 className="text-[clamp(1.5rem,4vw,2.5rem)] font-black uppercase mb-4 text-white leading-tight">{item.title}</h4>
                    <p className="text-body text-white/90">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WAITLIST */}
        <section className="w-full max-w-[1400px] mx-auto section-padding bg-black/90 backdrop-blur-xl rounded-[3rem] shadow-2xl border-b border-white/10 flex flex-col items-center text-white transition-transform hover:-translate-y-2 duration-500 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center">
            <h2 className="text-section-h2 text-[#CCFF00] drop-shadow-sm">
              Get In Early
            </h2>
            <p className="text-body text-white/90 mb-12">Join the waitlist. Test it first.</p>
            
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
        </section>

        {/* FOOTER */}
        <footer className="w-full max-w-[1400px] mx-auto section-padding bg-white/90 backdrop-blur-xl rounded-[3rem] shadow-lg border-b border-black/8 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          <div className="relative z-10 w-full flex flex-col items-center">
            <h2 className="text-hero text-[#FF0099] mb-10">No Cap</h2>
            <p className="text-body text-black/80 mb-10 mx-auto">
              The best nights aren't the ones you plan for weeks. They're the ones that actually happen.
            </p>
            <div className="bg-[#CCFF00] p-8 rounded-3xl inline-block transform -rotate-2 shadow-lg mb-20">
              <p className="text-body font-black text-black m-0">
                Spendx doesn't make you more organized. It makes backing out harder than showing up.
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-10 w-full border-t border-black/10 pt-12">
              <div className="text-[clamp(2rem,5vw,4rem)] font-black tracking-tighter text-black flex flex-col md:flex-row items-center gap-4">
                spendx* <span className="text-body font-normal opacity-60">— Find your spendx</span>
              </div>
              <div className="flex flex-wrap justify-center gap-8 text-label text-gray-500">
                <a href="#" className="hover:text-[#FF0099] transition-colors">Instagram</a>
                <a href="#" className="hover:text-[#00CCFF] transition-colors">TikTok</a>
                <a href="#" className="hover:text-[#00AA88] transition-colors">Twitter/X</a>
              </div>
              
              <div className="mt-12 pt-8 border-t border-black/10 w-full max-w-2xl">
                <p className="text-label text-gray-400 mb-2">
                  Designed & Built by
                </p>
                <p className="text-[clamp(1.5rem,3vw,2.5rem)] font-black text-black tracking-tight">
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
