/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        vista_blue: '#96CEB4',
        light_tan: '#FFEEAD',
        apricot: '#FFAD60',
        leather: '#A66E38'
      },
    },
  },
  plugins: [],
}

