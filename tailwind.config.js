/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chartreuse: {
          DEFAULT: '#7FFF00', // Default chartreuse color
          100: '#B3FF66',     // Light chartreuse
          200: '#99FF33',     // Lighter chartreuse
          300: '#80FF00',     // Even lighter chartreuse
        },
      },
    },
  },
  plugins: [],
}