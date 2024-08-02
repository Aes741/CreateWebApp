/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // Agrega aquí la ruta de los archivos que usan Tailwind CSS
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3c47e9', // Color principal para botones, etc.
        secondary: '#1e213a', // Fondo de la barra lateral
        accent: '#e7e7eb', // Color de texto y detalles
        muted: '#6e707a', // Color de fondo de botones secundarios
        highlight: '#ffec65', // Color de fondo para destacar
      },
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
      },
      spacing: {
        '4.5': '1.125rem',
      },
      borderRadius: {
        'lg': '0.5rem',
      },
    },
  },
  plugins: [],
};