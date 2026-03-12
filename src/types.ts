export interface Venue {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: 'food' | 'drink' | 'event' | 'experience' | 'health';
  address: string;
  photos: string[];
  hours: string;
  price_level: number;
  vibe_score: number;
  source_confidence: number;
  affiliate_links: Record<string, string>;
  city_slug: string;
  updated_at: string;
}
