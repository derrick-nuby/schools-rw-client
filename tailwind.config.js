/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,tsx,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        secondary: '#F5F5FF',
        'dim-white': '#b5bfd8',
        'background-dark': '#24213B',
        'accent-blue': '#059377',
        'link-blue': '#1964FF',
        'background-darker': '#1D1B2F',
        'accent-purple': '#7E19FF',
        black: '#000000',
        'dim-blue': '#1B192D',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-img': "url('/hero.jpg')",
        'hero-img2': "url('/hero.png')",
      },
    },
  },
  plugins: [],
};
