/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'mil-green': '#3B532F',
        'mil-green-dark': '#2A3D22',
        'mil-green-light': '#4E6E3E',
        'mil-yellow': '#FFC000',
        'mil-yellow-dark': '#CC9A00',
        'mil-black': '#080808',
        'mil-gray': '#111111',
        'mil-gray-mid': '#1E1E1E',
      },
      fontFamily: {
        headline: ['"Dieline Sans Black"', 'Anton', '"Arial Black"', 'sans-serif'],
        body: ['"Avenir Next Cyr"', '"Avenir Next"', 'Nunito', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


