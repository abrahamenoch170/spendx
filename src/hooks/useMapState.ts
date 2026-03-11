import { useState } from 'react';

export const CITIES = {
  Lagos: { lat: 6.5244, lng: 3.3792 },
  London: { lat: 51.5072, lng: -0.1276 },
  'New York': { lat: 40.7128, lng: -74.0060 },
  Texas: { lat: 30.2672, lng: -97.7431 },
};

export function useMapState() {
  const [city, setCity] = useState<keyof typeof CITIES>('Lagos');
  const [center, setCenter] = useState<[number, number]>([CITIES.Lagos.lat, CITIES.Lagos.lng]);
  const [zoom, setZoom] = useState(13);

  const switchCity = (newCity: keyof typeof CITIES) => {
    setCity(newCity);
    setCenter([CITIES[newCity].lat, CITIES[newCity].lng]);
    setZoom(13);
  };

  return { city, center, zoom, switchCity };
}
