import React from 'react';

const Placeholder = ({ title, description }: { title: string; description: string }) => (
  <div className="flex flex-col items-center justify-center h-full p-6 text-center">
    <h1 className="text-3xl font-black tracking-tighter mb-2 uppercase">{title}</h1>
    <p className="text-white/50 text-sm uppercase tracking-widest">{description}</p>
  </div>
);

export const HomeTabPlaceholder = () => (
  <Placeholder title="Home Tab" description="Home screen coming soon" />
);

export const PlanTabPlaceholder = () => (
  <Placeholder title="Plan Tab" description="Planning tools coming soon" />
);

export const GroupTabPlaceholder = () => (
  <Placeholder title="Group Tab" description="Squad management coming soon" />
);

export const MapTabPlaceholder = () => (
  <Placeholder title="Map Tab" description="Interactive map coming soon" />
);

export const ProfileTabPlaceholder = () => (
  <Placeholder title="Profile Tab" description="User profile coming soon" />
);
