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
        'it-girl-pink': '#FFD1DC',
        'it-girl-maroon': '#590D22',
        'it-girl-cream': '#FFF0F5',
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
