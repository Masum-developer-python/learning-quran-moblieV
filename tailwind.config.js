/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 'media' for system preference
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily:{
        akber : ['akbar'],
        bangla : ["Siyam Rupali"],
      }
    },
  },
  plugins: [require('tailwindcss-rtl')],
}

