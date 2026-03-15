import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        ui: ['Satoshi', 'Inter', 'sans-serif'],
        stats: ['JetBrains Mono', 'monospace'],
        sans: ['Satoshi', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Satoshi', 'Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        'acid-lime': '#CCFF00',
        'hot-magenta': '#FF0099',
        'electric-cyan': '#00CCFF',
        'deep-teal': '#00AA88',
        'pure-black': '#0A0A0A',
        'pure-white': '#FFFFFF',
        'off-white': '#F7F7F2',
        spendx: {
          lime: 'var(--acid-lime)',
          magenta: 'var(--hot-magenta)',
          cyan: 'var(--electric-cyan)',
          teal: 'var(--deep-teal)',
          black: 'var(--pure-black)',
          white: 'var(--pure-white)',
          offwhite: 'var(--off-white)',
        },
      },
    },
  },
  plugins: [],
};

export default config;
