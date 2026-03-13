import React from 'react';
import '@/src/index.css';

export const metadata = {
  title: 'Spendx | The Social Spending Layer',
  description: 'Plan, sync, and spend with your squad.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-spendx-black text-spendx-white font-sans selection:bg-spendx-lime selection:text-spendx-black relative overflow-x-hidden">
        {/* Global Grain Texture Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] grain-bg" />
        
        {/* Main Content */}
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
