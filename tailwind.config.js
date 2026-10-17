/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#070C18',
          900: '#0E172A',
          800: '#1E293B',
          700: '#334155'
        }
      }
    },
  },
  plugins: [],
}
