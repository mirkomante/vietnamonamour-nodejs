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
      'grigio-200'    : '#8a8a8a',
      'skeleton'      : 'rgba(0,0,0,.1)',
      'error'         : '#adff2f',
      'light-white'   : '#ffffff1a',
      'transparent'   : 'transparent',
      // Colori per i badge
      'green-50'      : '#f0fdf4',
      'green-600'     : '#16a34a',
      'green-800'     : '#166534',
      'blue-50'       : '#eff6ff',
      'blue-600'      : '#2563eb',
      'blue-800'      : '#1e40af',
      'purple-50'     : '#faf5ff',
      'purple-600'    : '#9333ea',
      'purple-800'    : '#6b21a8',
      'yellow-50'     : '#fefce8',
      'yellow-600'    : '#ca8a04',
      'yellow-800'    : '#854d0e',
      'red-500'       : '#ef4444',
      'orange-500'    : '#f97316',
      'gray-100'      : '#f3f4f6',
      'gray-500'      : '#6b7280',
      'cyan-500'      : '#06b6d4',
      'amber-500'     : '#f59e0b',
      'indigo-500'    : '#6366f1'
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