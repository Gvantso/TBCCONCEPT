/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        'card-shadow': '0 36px 40px -15px rgba(12, 43, 67, .07)',
      }
    }
  }, 
  plugins: [],
}