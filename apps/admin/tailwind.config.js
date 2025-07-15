/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/app/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        theme: '#0989ff',
        themeDark: '#0770e3',
        success: '#10B981',
        purple: '#6364DB',
        info: '#3E97FF',
        warning: '#F59E0B',
        gray: '#D1D5DB',
        text3: '#6D6F71',
      },
      fontSize: {
        tiny: '12px',
      },
    },
  },
  plugins: [],
} 