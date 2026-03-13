import React from 'react';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-spendx-black text-spendx-white font-sans selection:bg-spendx-lime selection:text-spendx-black relative overflow-x-hidden">
      {/* Global Grain Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] grain-bg" />
      
      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
};
