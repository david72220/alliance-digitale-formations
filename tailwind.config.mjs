/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        alliance: {
          dark: '#070d18',
          'dark-2': '#0B1120',
          blue: '#3b97d3',
          'blue-light': '#1e9ad7',
          'blue-dark': '#1a6fa3',
          orange: '#F59E0B',
          'orange-bright': '#FF6B35',
          surface: 'rgba(255,255,255,0.05)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
