/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff1e1e', // Aggressive red (WWE style)
        secondary: '#ffcc00', // Gold/yellow accent
        dark: '#111111', // Near black for dark theme
        light: '#f5f5f5', // Light gray for light theme
        'metal-gray': '#444444', // Metallic gray accent
      },
      fontFamily: {
        'title': ['"Impact"', 'sans-serif'], // WWE-style font
        'body': ['"Segoe UI"', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'none': '0', // Sharp angles instead of rounded corners
      },
      boxShadow: {
        'harsh': '5px 5px 0px rgba(0, 0, 0, 0.5)', // Hard shadow for WWE style
      },
      backgroundImage: {
        'dark-texture': "url('/src/assets/dark-texture.png')",
        'light-texture': "url('/src/assets/light-texture.png')",
      },
    },
  },
  plugins: [],
} 