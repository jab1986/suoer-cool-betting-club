/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wwe-red': '#ff0000',
        'wwe-black': '#000000',
        'wwe-gold': '#ffd700',
        'wwe-silver': '#c0c0c0',
        'wwe-yellow': '#ffff00',
      },
      fontFamily: {
        'impact': ['Impact', 'Haettenschweiler', 'Arial Narrow Bold', 'sans-serif'],
      },
      backgroundImage: {
        'grunge-texture': "url('/src/assets/grunge-texture.png')",
        'metal-texture': "url('/src/assets/metal-texture.png')",
      },
      boxShadow: {
        'wwe': '0 4px 6px -1px rgba(255, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
} 