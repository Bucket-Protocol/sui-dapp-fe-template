import type { Config } from 'tailwindcss';
import tailwindAnimate from 'tailwindcss-animate';

const config = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '140%', letterSpacing: '-0.0075rem' }],
      sm: ['0.875rem', { lineHeight: '140%', letterSpacing: '-0.00875rem' }],
      base: ['1rem', { lineHeight: '140%', letterSpacing: '-0.01rem' }],
      lg: ['1.125rem', { lineHeight: '140%', letterSpacing: '-0.01125rem' }],
      xl: ['1.25rem', { lineHeight: '140%', letterSpacing: '-0.0125rem' }],
      '2xl': ['1.5rem', { lineHeight: '140%', letterSpacing: '-0.015rem' }],
      '3xl': ['1.875rem', { lineHeight: '140%', letterSpacing: '-0.01875rem' }],
      '4xl': ['2.25rem', { lineHeight: '140%', letterSpacing: '-0.0225rem' }],
      '5xl': ['3rem', { lineHeight: '140%', letterSpacing: '-0.03rem' }],
      '6xl': ['3.75rem', { lineHeight: '140%', letterSpacing: '-0.0375rem' }],
      '7xl': ['4.5rem', { lineHeight: '140%', letterSpacing: '-0.045rem' }],
      '8xl': ['6rem', { lineHeight: '140%', letterSpacing: '-0.06rem' }],
      '9xl': ['8rem', { lineHeight: '140%', letterSpacing: '-0.08rem' }],
    },
    colors: {
      black: 'rgb(var(--color-black))',
      white: 'rgb(var(--color-white))',
      grey: {
        '1000': 'rgb(var(--color-grey-1000))',
        '700': 'rgb(var(--color-grey-700))',
        '500': 'rgb(var(--color-grey-500))',
        '400': 'rgb(var(--color-grey-400))',
        '100': 'rgb(var(--color-grey-100))',
        '50': 'rgb(var(--color-grey-50))',
        '25': 'rgb(var(--color-grey-25))',
      },
      inverse: {
        '1000': 'rgb(var(--color-inverse-1000))',
        '700': 'rgb(var(--color-inverse-700))',
        '500': 'rgb(var(--color-inverse-500))',
        '400': 'rgb(var(--color-inverse-400))',
        '100': 'rgb(var(--color-inverse-100))',
        '50': 'rgb(var(--color-inverse-50))',
        '25': 'rgb(var(--color-inverse-25))',
      },
      brand: {
        '1000': 'rgb(var(--color-brand-1000))',
        '800': 'rgb(var(--color-brand-800))',
        '200': 'rgb(var(--color-brand-200))',
        '50': 'rgb(var(--color-brand-50))',
      },
      red: {
        '1000': 'rgb(var(--color-red-1000))',
        '800': 'rgb(var(--color-red-800))',
        '200': 'rgb(var(--color-red-200))',
        '50': 'rgb(var(--color-red-50))',
      },
      amber: {
        '1000': 'rgb(var(--color-amber-1000))',
        '800': 'rgb(var(--color-amber-800))',
        '200': 'rgb(var(--color-amber-200))',
        '50': 'rgb(var(--color-amber-50))',
      },
      green: {
        '1000': 'rgb(var(--color-green-1000))',
        '800': 'rgb(var(--color-green-800))',
        '200': 'rgb(var(--color-green-200))',
        '50': 'rgb(var(--color-green-50))',
      },
      teal: {
        '1000': 'rgb(var(--color-teal-1000))',
        '800': 'rgb(var(--color-teal-800))',
        '200': 'rgb(var(--color-teal-200))',
        '50': 'rgb(var(--color-teal-50))',
      },
    },
    extend: {
      screens: {
        xs: '425px',
      },
      colors: {
        strong: 'rgb(var(--color-grey-1000))',
        weak: 'rgb(var(--color-grey-700))',
        weaker: 'rgb(var(--color-grey-400))',
        brand: 'rgb(var(--color-brand-1000))',
        disabled: 'rgb(var(--color-grey-100))',
        error: 'rgb(var(--color-red-1000))',
        warning: 'rgb(var(--color-amber-1000))',
        success: 'rgb(var(--color-green-1000))',
        info: 'rgb(var(--color-teal-1000))',
        inverse: {
          strong: 'rgb(var(--color-inverse-1000))',
          weak: 'rgb(var(--color-inverse-700))',
          disabled: 'rgb(var(--color-inverse-100))',
        },
        stroke: {
          strong: 'rgb(var(--color-grey-500))',
          weak: 'rgb(var(--color-grey-100))',
          selected: 'rgb(var(--color-brand-1000))',
          focused: 'rgb(var(--color-brand-1000))',
          disabled: 'rgb(var(--color-grey-100))',
          brand: {
            strong: 'rgb(var(--color-inverse-800))',
            weak: 'rgb(var(--color-inverse-200))',
          },
          error: {
            strong: 'rgb(var(--color-red-800))',
            weak: 'rgb(var(--color-red-200))',
          },
          warning: {
            strong: 'rgb(var(--color-amber-800))',
            weak: 'rgb(var(--color-amber-200))',
          },
          success: {
            strong: 'rgb(var(--color-green-800))',
            weak: 'rgb(var(--color-green-200))',
          },
          info: {
            strong: 'rgb(var(--color-teal-800))',
            weak: 'rgb(var(--color-teal-200))',
          },
          inverse: {
            strong: 'rgb(var(--color-inverse-500))',
            weak: 'rgb(var(--color-inverse-100))',
            disabled: 'rgb(var(--color-inverse-100))',
          },
        },
        fill: {
          strong: 'rgb(var(--color-grey-1000))',
          button: {
            disabled: 'rgb(var(--color-grey-500))',
          },
          weak: 'rgb(var(--color-grey-50))',
          weaker: 'rgb(var(--color-grey-25))',
          hover: 'rgb(var(--color-grey-50))',
          press: 'rgb(var(--color-grey-100))',
          selected: 'rgb(var(--color-brand-1000))',
          disabled: 'rgb(var(--color-grey-100))',
          overlay: 'rgb(var(--color-inverse-1000))',
          brand: {
            strong: 'rgb(var(--color-inverse-1000))',
            weak: 'rgb(var(--color-inverse-50))',
          },
          error: {
            strong: 'rgb(var(--color-red-1000))',
            weak: 'rgb(var(--color-red-50))',
          },
          warning: {
            strong: 'rgb(var(--color-amber-1000))',
            weak: 'rgb(var(--color-amber-50))',
          },
          success: {
            strong: 'rgb(var(--color-green-1000))',
            weak: 'rgb(var(--color-green-50))',
          },
          info: {
            strong: 'rgb(var(--color-teal-1000))',
            weak: 'rgb(var(--color-teal-50))',
          },
          inverse: {
            strong: 'rgb(var(--color-black))',
            weak: 'rgb(var(--color-inverse-50))',
            hover: 'rgb(var(--color-inverse-50))',
            press: 'rgb(var(--color-inverse-100))',
            disabled: 'rgb(var(--color-inverse-100))',
            white: 'rgb(var(--color-white))',
          },
        },
      },
      opacity: {
        2: '0.02',
        3: '0.03',
        5: '0.05',
        6: '0.06',
        7: '0.07',
        8: '0.08',
        12: '0.12',
      },
      transitionDuration: {
        '400': '400ms',
      },
      zIndex: {
        marquee: '5',
        header: '10',
        footer: '10',
        fab: '20',
        dropdown: '30',
        modal: '40',
        tooltip: '50',
        toast: '60',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'border-move': {
          '0%': { backgroundPosition: '0% 0%' },
          '40%': { backgroundPosition: '100% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
          '90%': { backgroundPosition: '0% 100%' },
          '100%': { backgroundPosition: '0% 0%' },
        },
        rotate: {
          from: { '--angle': '0deg' },
          to: { '--angle': '360deg' },
        },
        floating: {
          form: { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
          to: { transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.3s ease-out',
        'accordion-up': 'accordion-up 0.3s ease-out',
        'border-move': 'border-move 6s linear infinite',
        rotate: 'rotate 3s linear infinite',
        floating: 'floating 1s ease-out infinite',
      },
    },
  },
  plugins: [tailwindAnimate],
} satisfies Config;

export default config;
