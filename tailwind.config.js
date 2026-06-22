/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['MyriadPro-Light', 'Arial', 'Helvetica', 'sans-serif'],
      },
      colors: {
        toastmasters: {
          navy: '#1a2f5a',
          'navy-light': '#2d4a7c',
          'navy-dark': '#0f1d38',
          maroon: '#800020',
          'maroon-light': '#a0332f',
          'maroon-dark': '#5c0017',
          gold: '#c5a047',
          'gold-light': '#dab961',
          'gold-dark': '#a68532',
        },
      },
    },
  },
  plugins: [],
};
