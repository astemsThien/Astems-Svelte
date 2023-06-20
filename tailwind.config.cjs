/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}',    
  ],
  theme: {
    extend: {
      colors: {
        'google-red': '#ea4335',
        'google-blue': '#4285f4',
        'google-green': '#34a853',
        'google-yellow': '#fbbc05',
        'astems-purple': '#6500CB',
        'astems-light-purple': '#C8A3ED'
      },
    }
  },
  plugins: [    
  ]
  
};

