/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // or 'media' if you want it based on system preference
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: { fontFamily: {
      tagesschrift: ['"Permanent Marker"', 'cursive'],
    },},
  },
  plugins: [],
}

