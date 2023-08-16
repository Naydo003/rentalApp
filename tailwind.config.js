/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./src/common/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      colors: {
        mainColour: {
          100: '#fc0366'
        },
        mainBlack: {
          100: '#000000'
        },
        mainGrey: {
          100: '#808080'
        }
      }
    },
  },
  plugins: [],
}
