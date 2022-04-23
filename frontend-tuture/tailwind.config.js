const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'],
    }
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        'default': {
          'primary': '#ffc400',
          'primary-focus': '#ffab00',
          'primary-content': '#000000',
          'secondary': '#e0a82e',
          'secondary-focus': '#bf8c1d',
          'secondary-content': '#ffffff',
          'accent': '#181830',
          'accent-focus': '#000000',
          'accent-content': '#ffffff',
          'neutral': '#181830',
          'neutral-focus': '#000000',
          'neutral-content': '#000000',
          'base-100': '#ffffff',
          'base-200': '#f5f5f5',
          'base-300': '#e3e3e3',
          'base-content': '#000000',
          'info': '#2094f3',
          'success': '#36D399',
          'success-content': '#ffffff',
          'warning': '#ff9900',
          'error': '#F87272',
        },
        'default-dark': {
          'primary': '#ffc400',
          'primary-focus': '#ffab00',
          'primary-content': '#000000',
          'secondary': '#e0a82e',
          'secondary-focus': '#bf8c1d',
          'secondary-content': '#ffffff',
          'accent': '#181830',
          'accent-focus': '#000000',
          'accent-content': '#ffffff',
          'neutral': '#1b1d1d',
          'neutral-focus': '#131616',
          'neutral-content': '#ffffff',
          'base-100': '#212121',
          'base-200': '#1b1d1d',
          'base-300': '#131616',
          'base-content': '#ffffff',
          'info': '#66c7ff',
          'success': '#87d039',
          'warning': '#e2d562',
          'error': '#ff6f6f',
        },
      },
    ],
    darkTheme: "default-dark"
  },
};