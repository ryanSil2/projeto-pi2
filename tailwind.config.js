/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
  "./node_modules/preline/dist/*.js,html",
  ],
  
  theme: {
    extend: {},
  },
  plugins: [require('preline/plugin'),
  require('daisyui'),
  ],
}

