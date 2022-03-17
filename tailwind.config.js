/** @type{import('tailwindcss/tailwind-config').TailwindConfig} */
const tailwindConfig = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/*.{vue,js,ts}',
    './src/components/*.{vue,js,ts}',
    './src/layouts/*.{vue,js,ts}',
    './src/views/*.{vue,js,ts}'
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '2rem'
      }
    }
  },
  plugins: []
};

module.exports = tailwindConfig;
