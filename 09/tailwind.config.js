/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}",
            "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {},
    safelist: ['animate-[tada_1s_ease-in-out]', 'animate-[fade-in-down_1s_ease-in-out]']
  },
  plugins: [require("tw-elements/dist/plugin")],
}