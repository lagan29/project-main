  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: [
      './src/pages/**/*.{js,jsx,ts,tsx,mdx}',
      './src/components/**/*.{js,jsx,ts,tsx}',
      './src/app/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          /* From globals.css @theme */
          base: {
            50:  '#F3F1EC',
            100: '#E7E4DD',
            200: '#D8D5CD',
          },
          text: {
            100: '#4A4A4A',
            200: '#2E2E2E',
            300: '#1C1C1C',
          },
          navy: {
            100: '#3A4A63',
            200: '#1F2A44',
          },
          pink: {
            100: '#E4B7C7',
            200: '#C98CA7',
          },
          olive: {
            100: '#A3B29B',
            200: '#6F7D60',
          },
          neutral: {
            100: '#EDEBE6',
            200: '#CFCAC2',
          },
        },
        fontFamily: {
          sans:  ['Inter', 'sans-serif'],
          serif: ['Playfair Display', 'serif'],
        },
        animation: {
          marquee:  'marquee 30s linear infinite',
          fadeUp:   'fadeUp 0.6s ease forwards',
          fadeIn:   'fadeIn 0.4s ease forwards',
          shimmer:  'shimmer 1.5s infinite',
        },
        keyframes: {
          marquee: {
            '0%':   { transform: 'translateX(0%)' },
            '100%': { transform: 'translateX(-50%)' },
          },
          fadeUp: {
            '0%':   { opacity: '0', transform: 'translateY(24px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          fadeIn: {
            '0%':   { opacity: '0' },
            '100%': { opacity: '1' },
          },
          shimmer: {
            '0%':   { backgroundPosition: '-200% 0' },
            '100%': { backgroundPosition: '200% 0' },
          },
        },
      },
    },
    plugins: [],
  }