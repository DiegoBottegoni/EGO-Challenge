/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ego-black': '#1a1a1a',
        'ego-gray': '#f5f5f5',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        toyota: ['ToyotaType', 'sans-serif'],
      },
      fontWeight: {
        'weight-400': '400',
        'weight-600': '600',
        'weight-700': '700',
      },
    },
  },
  plugins: [],
}
