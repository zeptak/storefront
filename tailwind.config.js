/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blame: {
          teal:       '#006064',
          'teal-mid': '#00838F',
          'teal-light': '#B2DFDB',
          neutral:    '#E0E0E0',
          black:      '#0A0A0A',
          dark:       '#111111',
          surface:    '#161616',
          muted:      '#2A2A2A',
          text:       '#E8E8E8',
          dim:        '#888888',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono:    ['Space Mono', 'monospace'],
        body:    ['DM Sans', 'sans-serif'],
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease forwards',
        'ticker':    'ticker 25s linear infinite',
        'waveBar':   'waveBar 1.2s ease-in-out infinite',
        'blink':     'blink 1s step-end infinite',
        'grain':     'grain 0.5s steps(1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        ticker: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        waveBar: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%':      { transform: 'scaleY(1)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
      },
      backgroundImage: {
        'teal-gradient': 'linear-gradient(135deg, #006064, #00838F)',
        'dark-gradient': 'linear-gradient(180deg, #0A0A0A 0%, #111111 100%)',
      },
      borderColor: {
        DEFAULT: 'rgba(0, 96, 100, 0.2)',
      },
    },
  },
  plugins: [],
}
