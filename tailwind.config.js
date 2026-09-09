/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050505',
        'void-surface': '#0c0c0e',
        'void-border': 'rgba(255, 255, 255, 0.08)',
        editorial: '#ffffff',
        'editorial-subtle': '#fbfbfb',
        'hairline': '#e5e7eb',
        ink: '#0a0a0a',
        'ink-muted': '#555555',
        'ink-light': '#888888',
        accent: {
          neon: '#22c55e',
          mint: '#34d399',
          orange: '#ff5722',
          yellow: '#facc15',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.03em',
      }
    },
  },
  plugins: [],
}
