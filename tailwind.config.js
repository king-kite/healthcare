/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false,
  },
  mode: 'jit',
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e7f5fe',
          100: '#cfebfc',
          200: '#9fd7f9',
          300: '#6ec2f7',
          400: '#3eaef4',
          500: '#1da1f2',
          600: '#0d8bd9',
          700: '#085c91',
          800: '#063e60',
          900: '#031f30',
        },
        secondary: {
          50: '#d9d9d9',
          100: '#b3b3b3',
          200: '#8c8c8c',
          300: '#666666',
          400: '#404040',
          500: '#1a1a1a',
          600: '#0d0d0d',
          700: '#000000',
        },
      },
      screens: {
        xs: '400px',
        sm: '580px',
        md: '768px',
        lg: '992px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  variants: {
    animation: ['responsive', 'motion-safe', 'motion-reduce'],
    backgroundColor: ['responsive', 'odd', 'hover', 'focus', 'even', 'active'],
    borderWidth: ['responsive', 'hover', 'focus'],
    fontSize: ['responsive', 'hover', 'focus'],
    extend: {},
    position: ['responsive'],
  },
  plugins: [],
};
