/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0c10',
        foreground: '#e8eaf0',
        border: '#1e2330',
        primary: '#38bdf8',
        'primary-foreground': '#0a0c10',
        muted: '#1e2330',
        'muted-foreground': '#5a6480',
        'accent-dim': '#0c2a3d',
        surface: '#0e1118',
        success: '#10b981',
        warning: '#f59e0b',
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        '2xs': ['11px', '1.4'],
        xs: ['13px', '1.4'],
        sm: ['14px', '1.5'],
        base: ['15px', '1.6'],
        lg: ['18px', '1.6'],
        xl: ['22px', '1.4'],
        '2xl': ['28px', '1.2'],
        '4xl': ['52px', '1.1'],
      },
    },
  },
  plugins: [],
}
