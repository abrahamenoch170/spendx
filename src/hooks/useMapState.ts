import { useState, useEffect } from 'react';

export const CITIES = {
  Lagos: { lat: 6.5244, lng: 3.3792 },
  London: { lat: 51.5072, lng: -0.1276 },
  'New York': { lat: 40.7128, lng: -74.0060 },
  Texas: { lat: 30.2672, lng: -97.7431 },
};

export function useMapState() {
  const [city, setCity] = useState<string>('Lagos');
  const [center, setCenter] = useState<[number, number]>([CITIES.Lagos.lat, CITIES.Lagos.lng]);
  const [zoom, setZoom] = useState(13);
  const [isLocating, setIsLocating] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              setCenter([latitude, longitude]);
              await reverseGeocode(latitude, longitude);
              setIsLocating(false);
            },
            async () => {
              await fallbackToIP();
            }
          );
        } else {
          await fallbackToIP();
        }
      } catch (error) {
        console.error("Location error", error);
        setIsLocating(false);
      }
    };

    const fallbackToIP = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        if (!res.ok) throw new Error('Failed to fetch IP location');
        const data = await res.json();
        if (data.latitude && data.longitude) {
          setCenter([data.latitude, data.longitude]);
          setCity(data.city || 'Unknown');
        } else {
          throw new Error('Invalid location data');
        }
      } catch (error) {
        console.error("IP fallback failed, using default location", error);
        setCenter([CITIES.Lagos.lat, CITIES.Lagos.lng]);
        setCity('Lagos');
      } finally {
        setIsLocating(false);
      }
    };

    const reverseGeocode = async (lat: number, lng: number) => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`);
        const data = await res.json();
        const detectedCity = data.address?.city || data.address?.town || data.address?.village || data.address?.state || 'Unknown';
        setCity(detectedCity);
      } catch (error) {
        console.error("Reverse geocode error", error);
      }
    };

    fetchLocation();
  }, []);

  const switchCity = (newCity: keyof typeof CITIES) => {
    setCity(newCity);
    setCenter([CITIES[newCity].lat, CITIES[newCity].lng]);
    setZoom(13);
  };

  return { city, center, zoom, switchCity, isLocating };
}
