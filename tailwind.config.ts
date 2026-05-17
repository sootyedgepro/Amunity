import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FBF7F0',
        ink: '#1A1A1A',
        muted: '#6B6258',
        plum: {
          DEFAULT: '#6B4E96',
          deep: '#3D2658',
          mid: '#8B6FB8',
          soft: '#D8C8EE',
          mist: '#F1EAFA',
        },
        blush: {
          DEFAULT: '#E8B4B8',
          deep: '#B47A82',
          soft: '#F8E4E6',
          mist: '#FCF2F3',
        },
        gold: {
          DEFAULT: '#D4AF6A',
          deep: '#B8924D',
          soft: '#E8D4A8',
        },
        sand: '#F0E7D8',
        lavender: { DEFAULT: '#C7B8E0', soft: '#E8DEF5' },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: { xl: '14px', '2xl': '20px' },
      boxShadow: {
        soft: '0 1px 2px rgba(26,26,26,0.04), 0 8px 24px rgba(26,26,26,0.06)',
        lift: '0 4px 12px rgba(26,26,26,0.08), 0 24px 48px rgba(26,26,26,0.1)',
      },
      maxWidth: { container: '1240px' },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: { 'fade-up': 'fade-up 0.7s ease-out both' },
    },
  },
  plugins: [],
};
export default config;
