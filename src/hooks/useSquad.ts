export interface SquadMember {
  id: string;
  name: string;
  lat: number;
  lng: number;
  seed: string;
  status: string;
  lastActive: string;
}

export const useSquad = (center?: [number, number]) => {
  return { squad: [] as SquadMember[] };
};
