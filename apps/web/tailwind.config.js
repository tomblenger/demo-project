const rootConfig = require('../../tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...rootConfig,
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
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