import { useState } from 'react';

export function useLayers() {
  const [layers, setLayers] = useState({
    heatmap: true,
    venues: true,
    squad: true,
    user: true,
  });

  const toggleLayer = (layer: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  return { layers, toggleLayer };
}
