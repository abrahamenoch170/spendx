import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        spendx: {
          lime: 'var(--acid-lime)',
          magenta: 'var(--hot-magenta)',
          cyan: 'var(--electric-cyan)',
          teal: 'var(--deep-teal)',
          black: 'var(--pure-black)',
          white: 'var(--pure-white)',
          offwhite: 'var(--off-white)',
        },
        brand: {
          lime: '#CCFF00',
          magenta: '#FF0099',
          cyan: '#00CCFF',
          teal: '#00AA88',
        },
      },
      fontFamily: {
        sans: ['Satoshi', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Satoshi', 'Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
