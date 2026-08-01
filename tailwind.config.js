/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        ink: {
          900: '#050914',
          800: '#0a1428',
          700: '#0f1e3d',
          600: '#1e3a5f',
        },
        platinum: {
          100: '#f8fafc',
          200: '#e5e7eb',
          300: '#cbd5e1',
          400: '#94a3b8',
        },
        glow: {
          teal: '#06b6d4',
          emerald: '#34d399',
        },
      },
      backgroundImage: {
        'grad-brand':
          'linear-gradient(135deg, #cbd5e1 0%, #94a3b8 40%, #34d399 80%, #06b6d4 100%)',
        'grad-steel':
          'linear-gradient(135deg, #1e3a5f 0%, #0f1e3d 55%, #0a1428 100%)',
        'grad-glow': 'linear-gradient(135deg, #34d399 0%, #06b6d4 100%)',
      },
      animation: {
        'grad-shift': 'grad-shift 8s ease infinite',
        'orb-drift': 'orb-drift 18s ease-in-out infinite',
        'dot-pulse': 'dot-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'grad-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'orb-drift': {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(60px, -40px) scale(1.1)' },
          '66%': { transform: 'translate(-40px, 30px) scale(0.95)' },
        },
        'dot-pulse': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.5, transform: 'scale(1.4)' },
        },
      },
    },
  },
  plugins: [],
};
