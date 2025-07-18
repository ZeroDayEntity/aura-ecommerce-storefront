
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F9F9F9',
        'primary-text': '#1E1E1E',
        'secondary-text': '#505050',
        accent: {
          DEFAULT: '#D4AF37',
          hover: '#C6A032',
        },
        border: '#EAEAEA',
      },
      fontFamily: {
        sans: ['var(--font-satoshi)', 'sans-serif'],
      },
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-out': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.3s ease-out forwards',
        'slide-out': 'slide-out 0.3s ease-in forwards',
        'fade-in': 'fade-in 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
