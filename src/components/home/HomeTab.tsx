import React from 'react';
import { TopBar } from './TopBar';
import { WelcomeSection } from './WelcomeSection';
import { MiniLeaderboard } from './MiniLeaderboard';
import { ModeSelector } from './ModeSelector';
import { VenueCard } from './VenueCard';
import { EventCard } from './EventCard';
import { QuickActionFAB } from './QuickActionFAB';
import { useHomeStore } from '../../store/homeStore';

export const HomeTab = () => {
  const { venues, events } = useHomeStore();

  return (
    <div className="pb-24 space-y-8">
      <TopBar />
      <WelcomeSection />
      <MiniLeaderboard />
      <ModeSelector />
      
      <section>
        <h2 className="text-xl font-black uppercase tracking-tighter mb-4 px-6">Trending Venues</h2>
        <div className="flex gap-4 overflow-x-auto px-6 pb-4">
          {venues.map(venue => <VenueCard key={venue.id} {...venue} />)}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-black uppercase tracking-tighter mb-4 px-6">Events Around Me</h2>
        <div className="flex gap-4 overflow-x-auto px-6 pb-4">
          {events.map(event => <EventCard key={event.id} {...event} />)}
        </div>
      </section>

      <QuickActionFAB />
    </div>
  );
};
