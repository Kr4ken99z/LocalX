/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBg: '#080f1c',
        darkCard: 'rgba(15, 23, 42, 0.75)',
        darkBorder: 'rgba(51, 65, 85, 0.7)',
        tealAccent: '#2dd4bf',
        tealHover: '#14b8a6',
        violetAccent: '#8b5cf6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
