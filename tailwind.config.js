/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", 
  ],


  theme: {
    extend: {
      gridTemplateColumns: {
        'padrao': '1fr 1.5fr'
      }
    },
    screens: {
      
    }
  },
  plugins: [require('@tailwindcss/typography'),
  require("daisyui")

] , tailwindcss: {},
autoprefixer: {},
}

