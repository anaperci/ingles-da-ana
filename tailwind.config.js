/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Inter Tight', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        /* Neutros / superfícies */
        background: 'hsl(var(--color-bg))',
        foreground: 'hsl(var(--color-primary))',
        border: 'hsl(var(--color-border-soft))',
        'card-border': 'hsl(var(--color-border-soft))',
        input: 'hsl(var(--color-border-soft))',
        ring: 'hsl(var(--color-accent))',
        card: {
          DEFAULT: 'hsl(var(--color-bg))',
          foreground: 'hsl(var(--color-primary))',
        },
        popover: {
          DEFAULT: 'hsl(var(--color-bg))',
          foreground: 'hsl(var(--color-primary))',
        },
        muted: {
          DEFAULT: 'hsl(var(--color-muted))',
          foreground: 'hsl(var(--color-muted-text))',
        },

        /* Petróleo — destaque e texto forte */
        primary: {
          DEFAULT: 'hsl(var(--color-primary))',
          soft: 'hsl(var(--color-primary-soft))',
          hover: 'hsl(var(--color-primary-soft))',
          foreground: 'hsl(var(--color-on-primary))',
        },
        'on-primary': {
          DEFAULT: 'hsl(var(--color-on-primary))',
          muted: 'hsl(var(--color-on-primary-muted))',
        },

        /* Azul de contraste Solo — cor de ação (texto branco sobre azul) */
        accent: {
          DEFAULT: 'hsl(var(--color-accent))',
          dark: 'hsl(var(--color-accent-dark))',
          text: 'hsl(var(--color-accent-text))',
          foreground: 'hsl(var(--color-on-primary))',
        },
        /* Mint — energia/destaque Solo */
        mint: 'hsl(var(--color-mint))',

        /* Creme — cards suaves e estado ativo */
        soft: {
          DEFAULT: 'hsl(var(--color-soft))',
          2: 'hsl(var(--color-soft-2))',
          text: 'hsl(var(--color-soft-text))',
          'text-2': 'hsl(var(--color-soft-text-2))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--color-soft))',
          foreground: 'hsl(var(--color-soft-text))',
        },

        /* Estados */
        success: { DEFAULT: 'hsl(var(--color-success))', foreground: '#fff' },
        warning: { DEFAULT: 'hsl(var(--color-warning))', foreground: '#fff' },
        error: { DEFAULT: 'hsl(var(--color-error))', foreground: '#fff' },
        destructive: { DEFAULT: 'hsl(var(--color-error))', foreground: '#fff' },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgb(16 24 32 / 0.04), 0 2px 8px -2px rgb(16 24 32 / 0.06)',
        elevated: '0 12px 28px -12px rgb(28 62 74 / 0.18), 0 4px 12px -6px rgb(16 24 32 / 0.08)',
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
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.4s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}
