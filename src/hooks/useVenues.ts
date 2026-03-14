export interface Venue {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: string;
  vibe: number;
  capacity: number;
  currentOccupancy: number;
  coverCharge: number;
  queueTime: number;
  music: string;
  specials: string[];
}

export const useVenues = () => {
  return { venues: [] as Venue[] };
};
