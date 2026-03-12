import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, MapPin, CheckCircle2, ChevronRight, Volume2, VolumeX, Play, Square } from 'lucide-react';

interface Stop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  visited: boolean;
}

export const SpendxPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [stops, setStops] = useState<Stop[]>([
    { id: '1', name: 'Starting Point', lat: 51.5072, lng: -0.1276, visited: true },
    { id: '2', name: 'The Alchemist', lat: 51.5152, lng: -0.1416, visited: false },
    { id: '3', name: 'Fabric London', lat: 51.5196, lng: -0.1024, visited: false },
  ]);

  const [instruction, setInstruction] = useState('Head North on Main St');
  const [distance, setDistance] = useState('250m');
  const [time, setTime] = useState('3 min');

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: [-0.1276, 51.5072],
      zoom: 14,
    });

    map.current.on('load', () => {
      if (!map.current) return;

      // Add route source
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [
              [-0.1276, 51.5072],
              [-0.1300, 51.5100],
              [-0.1350, 51.5120],
              [-0.1416, 51.5152],
            ],
          },
        },
      });

      // Add route layer
      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#ccff00',
          'line-width': 6,
          'line-dasharray': [2, 1],
        },
      });

      // Animate line dash
      let step = 0;
      function animateDash() {
        step = (step + 1) % 200;
        map.current?.setPaintProperty('route', 'line-dasharray', [2, 1, step / 100]);
        requestAnimationFrame(animateDash);
      }
      // animateDash(); // Disabled for now to avoid too much CPU
    });

    return () => map.current?.remove();
  }, []);

  const handleStart = () => {
    setIsNavigating(true);
    if (voiceEnabled) {
      speak(instruction);
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCheckIn = () => {
    const nextStops = [...stops];
    const currentStopIndex = nextStops.findIndex(s => !s.visited);
    if (currentStopIndex !== -1) {
      nextStops[currentStopIndex].visited = true;
      setStops(nextStops);
      
      if (currentStopIndex === nextStops.length - 1) {
        // Finished
        alert('Spendx Complete! Time for a streak selfie.');
        navigate('/dashboard');
      } else {
        setInstruction(`Next stop: ${nextStops[currentStopIndex + 1].name}`);
        if (voiceEnabled) speak(`Arrived at ${nextStops[currentStopIndex].name}. Next stop: ${nextStops[currentStopIndex + 1].name}`);
      }
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
      
      {/* Top Bar */}
      <div className="absolute top-0 left-0 w-full p-6 z-10 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={() => navigate('/dashboard')} className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white">
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
        <div className="text-center">
          <h1 className="text-white font-black tracking-tighter text-xl">ACTIVE SPENDX*</h1>
          <p className="text-[var(--lime)] text-[10px] font-bold tracking-widest uppercase">ID: {id?.slice(0, 8)}</p>
        </div>
        <button onClick={() => setVoiceEnabled(!voiceEnabled)} className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white">
          {voiceEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
        </button>
      </div>

      {/* Navigation UI */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-10 flex flex-col gap-4">
        <AnimatePresence>
          {isNavigating ? (
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="bg-[var(--lime)] rounded-[32px] p-6 text-black shadow-2xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center">
                    <Navigation className="w-6 h-6 text-[var(--lime)]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight leading-none">{instruction}</h2>
                    <p className="text-black/60 font-bold uppercase text-[10px] tracking-widest mt-1">{distance} • {time} remaining</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={handleCheckIn}
                  className="flex-1 py-4 bg-black text-[var(--lime)] rounded-2xl font-black text-lg shadow-lg active:scale-95 transition-transform"
                >
                  I'M HERE
                </button>
                <button 
                  onClick={() => setIsNavigating(false)}
                  className="w-16 h-16 bg-black/10 rounded-2xl flex items-center justify-center active:scale-95 transition-transform"
                >
                  <Square className="w-6 h-6 fill-current" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-[#0A0A0A] border border-white/10 rounded-[32px] p-6 text-white shadow-2xl"
            >
              <div className="mb-6">
                <h3 className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-4">Your Itinerary</h3>
                <div className="space-y-4">
                  {stops.map((stop, i) => (
                    <div key={stop.id} className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${stop.visited ? 'bg-[var(--lime)] text-black' : 'bg-white/10 text-white/40'}`}>
                        {stop.visited ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                      </div>
                      <span className={`font-bold ${stop.visited ? 'text-white/40 line-through' : 'text-white'}`}>{stop.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={handleStart}
                className="w-full py-5 bg-[var(--lime)] text-black rounded-2xl font-black text-xl shadow-[0_0_30px_rgba(204,255,0,0.3)] flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
              >
                <Play className="w-6 h-6 fill-current" />
                START NAVIGATION
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Arrival Notification Overlay */}
      <AnimatePresence>
        {/* Mocking arrival logic */}
      </AnimatePresence>
    </div>
  );
};
