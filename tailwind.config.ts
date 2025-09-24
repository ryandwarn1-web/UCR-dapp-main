import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Glitch & Glass Color Palette: Neon on Obsidian
        obsidian: {
          50: '#2A2A2A',
          100: '#242424', 
          200: '#1F1F1F',
          300: '#1A1A1A', // Primary background
          400: '#151515',
          500: '#101010',
          600: '#0A0A0A',
          700: '#050505',
          800: '#000000',
          900: '#000000',
        },
        // Electric Cyan - Primary Glitch Color
        glitch: {
          50: '#E6FFFF',
          100: '#B3FFFF',
          200: '#80FFFF',
          300: '#4DFFFF',
          400: '#1AFFFF',
          500: '#00FFFF', // Primary electric cyan
          600: '#00E6E6',
          700: '#00CCCC',
          800: '#00B3B3',
          900: '#009999',
        },
        // Magenta Alternative Glitch
        magenta: {
          50: '#FFE6FF',
          100: '#FFB3FF',
          200: '#FF80FF',
          300: '#FF4DFF',
          400: '#FF1AFF',
          500: '#FF00FF', // Electric magenta
          600: '#E600E6',
          700: '#CC00CC',
          800: '#B300B3',
          900: '#990099',
        },
        // Glass surfaces
        glass: {
          50: 'rgba(255, 255, 255, 0.1)',
          100: 'rgba(255, 255, 255, 0.08)',
          200: 'rgba(255, 255, 255, 0.06)',
          300: 'rgba(255, 255, 255, 0.04)',
          400: 'rgba(255, 255, 255, 0.02)',
          500: 'rgba(255, 255, 255, 0.01)',
        },
        // Professional text colors
        text: {
          primary: '#EAEAEA',   // Off-white for body text
          secondary: '#888888', // Muted gray for secondary text
          accent: '#00FFFF',    // Glitch cyan for headlines
          glass: '#FFFFFF',     // Pure white for glass overlays
        },
        // Legacy colors for compatibility
        primary: {
          50: '#E6FFFF',
          100: '#B3FFFF',
          200: '#80FFFF',
          300: '#4DFFFF',
          400: '#1AFFFF',
          500: '#00FFFF',
          600: '#00E6E6',
          700: '#00CCCC',
          800: '#00B3B3',
          900: '#009999',
          950: '#006666',
        },
        secondary: {
          50: '#FFE6FF',
          100: '#FFB3FF',
          200: '#FF80FF',
          300: '#FF4DFF',
          400: '#FF1AFF',
          500: '#FF00FF',
          600: '#E600E6',
          700: '#CC00CC',
          800: '#B300B3',
          900: '#990099',
          950: '#660066',
        },
        accent: {
          50: '#E6FFFF',
          100: '#B3FFFF',
          200: '#80FFFF',
          300: '#4DFFFF',
          400: '#1AFFFF',
          500: '#00FFFF',
          600: '#00E6E6',
          700: '#00CCCC',
          800: '#00B3B3',
          900: '#009999',
          950: '#006666',
        },
        success: {
          50: '#E6FFE6',
          100: '#B3FFB3',
          200: '#80FF80',
          300: '#4DFF4D',
          400: '#1AFF1A',
          500: '#00FF00',
          600: '#00E600',
          700: '#00CC00',
          800: '#00B300',
          900: '#009900',
          950: '#006600',
        },
        warning: {
          50: '#FFFFE6',
          100: '#FFFFB3',
          200: '#FFFF80',
          300: '#FFFF4D',
          400: '#FFFF1A',
          500: '#FFFF00',
          600: '#E6E600',
          700: '#CCCC00',
          800: '#B3B300',
          900: '#999900',
          950: '#666600',
        },
        error: {
          50: '#FFE6E6',
          100: '#FFB3B3',
          200: '#FF8080',
          300: '#FF4D4D',
          400: '#FF1A1A',
          500: '#FF0000',
          600: '#E60000',
          700: '#CC0000',
          800: '#B30000',
          900: '#990000',
          950: '#660000',
        },
      },
      fontFamily: {
        // The Rogue: Pixel fonts for headlines
        pixel: ['VT323', 'Press Start 2P', 'monospace'],
        'pixel-alt': ['Press Start 2P', 'VT323', 'monospace'],
        // The Professional: Clean fonts for body text
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        // The On-Chain: Monospace for data
        mono: ['Fira Code', 'JetBrains Mono', 'Consolas', 'monospace'],
        // Legacy
        'legacy-sans': ['VT323', 'monospace'],
        'legacy-mono': ['Press Start 2P', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        // Glitch animations
        'glitch': 'glitch 0.3s ease-in-out',
        'glitch-text': 'glitchText 0.5s ease-in-out',
        'pixel-fade': 'pixelFade 0.4s ease-out',
        'de-rez': 'deRez 0.6s ease-out',
        'neon-pulse': 'neonPulse 2s ease-in-out infinite',
        'scan-line': 'scanLine 2s linear infinite',
        'chromatic': 'chromatic 0.2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        // Glitch & Glass keyframes
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        glitchText: {
          '0%': { 
            transform: 'translate(0)',
            textShadow: '0 0 0 #00FFFF, 0 0 0 #FF00FF'
          },
          '15%': { 
            transform: 'translate(-2px, 0)',
            textShadow: '2px 0 0 #00FFFF, -2px 0 0 #FF00FF'
          },
          '30%': { 
            transform: 'translate(2px, 0)',
            textShadow: '-2px 0 0 #00FFFF, 2px 0 0 #FF00FF'
          },
          '45%': { 
            transform: 'translate(0, -1px)',
            textShadow: '0 1px 0 #00FFFF, 0 -1px 0 #FF00FF'
          },
          '60%': { 
            transform: 'translate(-1px, 1px)',
            textShadow: '1px -1px 0 #00FFFF, -1px 1px 0 #FF00FF'
          },
          '75%': { 
            transform: 'translate(1px, -1px)',
            textShadow: '-1px 1px 0 #00FFFF, 1px -1px 0 #FF00FF'
          },
          '100%': { 
            transform: 'translate(0)',
            textShadow: '0 0 0 #00FFFF, 0 0 0 #FF00FF'
          },
        },
        pixelFade: {
          '0%': { 
            opacity: '0',
            filter: 'blur(2px)',
            transform: 'scale(0.8)'
          },
          '50%': { 
            opacity: '0.5',
            filter: 'blur(1px)',
            transform: 'scale(0.9)'
          },
          '100%': { 
            opacity: '1',
            filter: 'blur(0)',
            transform: 'scale(1)'
          },
        },
        deRez: {
          '0%': { 
            opacity: '0',
            filter: 'blur(4px) pixelate(8px)',
            transform: 'scale(1.1)'
          },
          '100%': { 
            opacity: '1',
            filter: 'blur(0) pixelate(0)',
            transform: 'scale(1)'
          },
        },
        neonPulse: {
          '0%, 100%': { 
            boxShadow: '0 0 5px #00FFFF, 0 0 10px #00FFFF, 0 0 15px #00FFFF'
          },
          '50%': { 
            boxShadow: '0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF'
          },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        chromatic: {
          '0%': { 
            filter: 'hue-rotate(0deg)'
          },
          '25%': { 
            filter: 'hue-rotate(90deg)'
          },
          '50%': { 
            filter: 'hue-rotate(180deg)'
          },
          '75%': { 
            filter: 'hue-rotate(270deg)'
          },
          '100%': { 
            filter: 'hue-rotate(360deg)'
          },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
export default config