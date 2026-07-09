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
          orange: '#9E2114',
          'orange-bright': '#9E2114',
          surface: 'rgba(255,255,255,0.05)',
        },
        tab: {
          pme: '#1a2a3d',       // bleu foncé teinté — Accompagnement PME
          tpe: '#1f2a1e',       // vert foncé teinté — Accompagnement TPE
          services: '#2a1f1a', // orange foncé teinté — Services
          outils: '#1a2a2a',    // cyan-teinté — Outils gratuits
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
