/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens:{
      'mob':{'min': '0px', 'max': '640px'},
      'tab':{'min': '641px', 'max': '1080px'},
      'pc':{'min': '1081px', 'max': '3000px'},
    },
    keyframes:{
      squish:{
        '50%':{
          'scale': '1.4 0.6'
        }
      }
    },
    animation:{
      'khuchalna': 'squish 200ms ease-in-out'
    }
  },
  plugins: [],
}

