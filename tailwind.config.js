/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'ch-neutral-900': '#02012C',
        'ch-neutral-800': '#262540',
        'ch-neutral-700': '#302F4A',
        'ch-neutral-600': '#3C3B5E',
        'ch-grey': '#ACACB7',
        'ch-light-grey': '#D4D3D9',
        'ch-orange': '#FF820A',
        'ch-light-blue': '#4658D9',
        'ch-dark-blue': '#2B1B9C',
        'ch-white': '#FFFFFF',
      },
      borderRadius: {
        0: '0rem',
        4: '0.25rem',
        6: '0.375rem',
        8: '0.5rem',
        10: '0.625rem',
        12: '0.75rem',
        16: '1rem',
        20: '1.25rem',
        24: '1.5rem',
        full: '9999px',
      },
      spacing: {
        0: '0rem',
        '025': '0.125rem',
        '050': '0.25rem',
        '075': '0.375rem',
        100: '0.5rem',
        125: '0.625rem',
        150: '0.75rem',
        200: '1rem',
        250: '1.25rem',
        300: '1.5rem',
        400: '2rem',
        500: '2.5rem',
        600: '3rem',
        800: '4rem',
        1000: '5rem',
        1200: '6rem',
        1400: '7rem',
        1600: '8rem',
        1800: '8.75rem',
      },
      fontSize: {
        xs: ['0.875rem'],
        sm: ['1.125rem'],
        base: ['1.25rem'],
        lg: ['1.75rem'],
        xl: ['2rem'],
        '2xl': ['3.25rem', { lineHeight: '1.2' }],
        '3xl': ['6rem', { lineHeight: '1' }],
        '4xl': ['4rem', { lineHeight: '1.2' }],
        '5xl': ['8rem', { lineHeight: '1.2' }],
      },
      width: {
        12.65: '12.65rem',
      },
      keyframes: {
        sidebarExpand: {
          '0%': { width: '5.5rem' },
          '100%': { width: '14rem' },
        },
        sidebarCollapse: {
          '0%': { 'min-width': '14rem' },
          '100%': { 'min-width': '5.5rem' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '100%': { transform: 'translateY(100%)', opacity: 0 },
        },
      },
      backgroundImage: {},
      animation: {
        'sidebar-expand': 'sidebarExpand 0.5s ease-in-out forwards',
        'sidebar-collapse': 'sidebarCollapse 0.3s ease-in-out forwards',
        'fade-in': 'fadeIn 0.5s ease-in',
        slideUp: 'slideUp 0.15s ease-out forwards',
        slideDown: 'slideDown 0.15s ease-in forwards',
      },
      screens: {
        xl: '1200px',
      },
    },
    fontFamily: {
      dmSans: ['DM Sans', 'ui-sans-serif'],
      bricolage: ['Bricolage Grotesque', 'ui-sans-serif'],
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover', 'focus'],
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant(
        'hover-focus-active',
        ['&:hover', '&:focus', '&:active'],
        'expanded',
        '&.expanded'
      )
    },
  ],
}
