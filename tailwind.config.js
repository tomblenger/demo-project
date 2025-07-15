/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/web/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './apps/web/components/**/*.{js,ts,jsx,tsx,mdx}',
    './apps/web/app/**/*.{js,ts,jsx,tsx,mdx}',
    './apps/web/src/**/*.{js,ts,jsx,tsx,mdx}',
    './apps/admin/**/*.{js,jsx,ts,tsx}',
    './apps/admin/src/**/*.{js,jsx,ts,tsx}'
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