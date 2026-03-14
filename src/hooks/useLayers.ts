import { useState } from 'react';

export const useLayers = () => {
  const [layers, setLayers] = useState<string[]>([]);
  const toggleLayer = (layer: string) => {
    setLayers(prev => prev.includes(layer) ? prev.filter(l => l !== layer) : [...prev, layer]);
  };
  return { layers, toggleLayer };
};
