/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F2EEE2',
        'paper-raised': '#F8F5EC',
        ink: '#1C2823',
        'ink-deep': '#131C18',
        brass: '#7E5D19',
        'brass-bright': '#C9A24B',
        seal: '#9C3B25',
        'seal-bright': '#D96C4F',
        line: '#D8D1BD',
      },
      fontFamily: {
        sans: ['Schibsted Grotesk', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'sans-serif'],
        display: ['Marcellus', 'Noto Serif SC', 'Songti SC', 'SimSun', 'serif'],
        mono: ['Spline Sans Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
