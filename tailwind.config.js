/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#FDFBF7',
          100: '#FAF7F0',
          200: '#F5EFE0',
          300: '#EDE3CC',
          400: '#E0D0B0',
        },
        warm: {
          100: '#E8D5B7',
          200: '#D4B896',
          300: '#C09A6B',
          400: '#A67C52',
          500: '#8B5E3C',
        },
        charcoal: {
          100: '#6B6560',
          200: '#4A4540',
          300: '#2C2825',
          400: '#1A1715',
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