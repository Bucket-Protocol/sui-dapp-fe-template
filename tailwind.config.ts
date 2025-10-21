import type { Config } from 'tailwindcss';
import tailwindAnimate from 'tailwindcss-animate';

const config = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    {
      pattern: /(text|bg|border)-(danger|warning|safe)/,
    },
  ],
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
    extend: {
      screens: {
        xs: '425px',
      },
      spacing: {
        0.5: '0.125rem',
        4.5: '1.125rem',
        7.5: '1.875rem',
        8.5: '2.125rem',
        11: '2.75rem',
        12.5: '3.125rem',
        13: '3.25rem',
        15: '3.75rem',
        17: '4.25rem',
        18: '4.5rem',
        19: '4.75rem',
        21: '5.25rem',
        22: '5.5rem',
        23: '5.75rem',
        26: '6.5rem',
        27: '6.75rem',
        31: '7.75rem',
        37: '9.25rem',
        37.5: '9.375rem',
        42.5: '10.625rem',
        44: '11rem',
        50: '12.5rem',
        54: '13.5rem',
        54.5: '13.625rem',
        56: '14rem',
        58: '14.5rem',
        85: '21.25rem',
        135: '33.75rem',
        150: '37.5rem',
        172: '43rem',
      },
      colors: {
        main: {
          500: '#AEECFF',
          700: '#698D99',
        },
        danger: '#FF5C5A',
        warning: '#F1C145',
        safe: '#6AFF82',
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
