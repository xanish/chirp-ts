/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Pacifico', 'cursive'],
      }
    },
  },
  plugins: [
    '@tailwindcss/forms',
    'prettier-plugin-tailwindcss',
  ],
}

