/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#127C95',
        secondary: '#4790A1',
        error: '#DA1E28',
        success: '#CDFADC',
        'alert-error': '#FFC0C0'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
