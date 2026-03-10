/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        beige: {
          50: '#FAF8F4',
          100: '#F4EFE6',
          200: '#EBE4D6',
          300: '#DED4C0',
          400: '#C9BB9F',
          500: '#B3A483',
        },
        charcoal: {
          DEFAULT: 'rgba(30,30,30,0.7)',
          solid: '#1E1E1E',
        },
        sage: '#A8B5A0',
        dusty: '#8FA7B8',
        terracotta: '#C4836A',
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
