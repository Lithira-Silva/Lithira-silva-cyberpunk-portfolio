/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        cyan: {
          400: '#00FFFF',
          500: '#00E5FF',
        },
        gray: {
          900: '#0A0A0A',
          800: '#1A1A1A',
          700: '#2A2A2A',
        }
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'mono': ['JetBrains Mono', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'particle': 'particle 20s linear infinite',
        'fadeInUp': 'fadeInUp 0.6s ease-out forwards',
        'scaleIn': 'scaleIn 0.3s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00FFFF, 0 0 10px #00FFFF' },
          '100%': { boxShadow: '0 0 10px #00FFFF, 0 0 20px #00FFFF' },
        },
        particle: {
          '0%': { transform: 'translateY(100vh) translateX(-50px)' },
          '100%': { transform: 'translateY(-100px) translateX(50px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      letterSpacing: {
        'widest': '0.025em',
      },
      lineHeight: {
        'relaxed': '1.6',
      },
    },
  },
  plugins: [],
}