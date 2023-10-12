/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.{html,js,pug}",
    "./public/js/**/*.js"
  ],
  theme: {
    colors: {
      'nero'          : '#000000',
      'bianco'        : '#ffffff',
      'blu'           : '#053643',
      'arancio'       : '#EA5810',
      'marrone-400'   : '#4E0F10',
      'marrone-100'   : 'rgba(78,15,16,0.3)',
      'skeleton'      : 'rgba(0,0,0,.1)',
      'error'         : '#adff2f',
      'light-white'   : '#ffffff1a',
      'transparent'   : 'transparent'
    },
    fontFamily: {
      nunito: ['Nunito Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif']
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1280px',
      'xl': '1440px',
      '2xl': '1536px'
    },
    extend: {},
  },
  plugins: [],
}