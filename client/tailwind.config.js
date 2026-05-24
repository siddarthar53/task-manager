/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        body: ['"Satoshi"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          DEFAULT: '#0D0D0D',
          50: '#F5F5F5',
          100: '#E8E8E8',
          200: '#C8C8C8',
          300: '#A0A0A0',
          400: '#707070',
          500: '#4A4A4A',
          600: '#333333',
          700: '#1F1F1F',
          800: '#141414',
          900: '#0D0D0D',
        },
        accent: {
          DEFAULT: '#6C63FF',
          light: '#A89CFF',
          dark: '#4B43CC',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        shimmer: 'shimmer 1.5s infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
