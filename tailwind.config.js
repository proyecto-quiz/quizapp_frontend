/** @type{import("tailwindcss/tailwind-config").TailwindConfig} */
const tailwindConfig = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/*.{vue,js,ts}',
    './src/components/**/*.{vue,js,ts}',
    './src/layouts/**/*.{vue,js,ts}',
    './src/views/**/*.{vue,js,ts}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '2rem',
      },
    },
    extend: {
      screens: {
        xl: '1280px',
        '2xl': '1280px',
      },
      fontFamily: {
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      colors: {
        'primary-dark': '#051367',
        secondary: '#2D31FA',
        'secondary-normal': '#5D8BF4',
        'secondary-light': '#DFF6FF',
        'primary-light': '#FBF9F9',
        'contrast-01': '#C8ED79',
        'contrast-02': '#DDFFC2',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      backgroundImage: {
        books: 'url("@/assets/images/sign-in.png")',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

module.exports = tailwindConfig;
