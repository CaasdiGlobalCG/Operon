/** @type {import('tailwindcss').Config} */
// Operon Softwares design tokens. Source of truth: Operon Brand System v1.1.
// Ink / Paper / Cloud only. No accent colour exists in this system.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Replace, not extend: the palette is closed by brand rule.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ink: '#000000',
      paper: '#FFFFFF',
      cloud: '#F0F0F0',
      // Opacity steps of Ink and Paper, for rules and secondary type only.
      'ink-70': 'rgba(0,0,0,0.70)',
      'ink-55': 'rgba(0,0,0,0.55)',
      'ink-40': 'rgba(0,0,0,0.40)',
      'ink-30': 'rgba(0,0,0,0.30)',
      'ink-14': 'rgba(0,0,0,0.14)',
      'ink-08': 'rgba(0,0,0,0.08)',
      'ink-04': 'rgba(0,0,0,0.04)',
      'paper-70': 'rgba(255,255,255,0.70)',
      'paper-55': 'rgba(255,255,255,0.55)',
      'paper-30': 'rgba(255,255,255,0.30)',
      'paper-14': 'rgba(255,255,255,0.14)',
      'paper-08': 'rgba(255,255,255,0.08)',
    },
    fontFamily: {
      display: ['Poppins', 'system-ui', 'sans-serif'],
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
    },
    fontSize: {
      // Brand type scale (size / line-height), extended downward for UI.
      'mono-xs': ['10px', { lineHeight: '14px', letterSpacing: '0.08em' }],
      mono: ['11px', { lineHeight: '14px', letterSpacing: '0.08em' }],
      'mono-lg': ['12px', { lineHeight: '16px', letterSpacing: '0.06em' }],
      xs: ['13px', { lineHeight: '20px' }],
      sm: ['15px', { lineHeight: '24px' }],
      body: ['17px', { lineHeight: '28px' }],
      lead: ['20px', { lineHeight: '32px' }],
      h4: ['22px', { lineHeight: '30px', letterSpacing: '-0.01em' }],
      h3: ['32px', { lineHeight: '40px', letterSpacing: '-0.015em' }],
      h2: ['44px', { lineHeight: '48px', letterSpacing: '-0.025em' }],
      'h2-lg': ['64px', { lineHeight: '60px', letterSpacing: '-0.03em' }],
      h1: ['48px', { lineHeight: '52px', letterSpacing: '-0.03em' }],
      'h1-lg': ['72px', { lineHeight: '68px', letterSpacing: '-0.035em' }],
    },
    extend: {
      spacing: { 18: '4.5rem', 30: '7.5rem', 34: '8.5rem' },
      maxWidth: { content: '1200px', prose: '68ch', measure: '58ch' },
      borderRadius: { none: '0', sm: '2px', DEFAULT: '4px', md: '6px', lg: '10px' },
      transitionTimingFunction: { signal: 'cubic-bezier(0.22, 0.61, 0.36, 1)' },
      transitionDuration: { 120: '120ms', 180: '180ms', 240: '240ms' },
    },
  },
  plugins: [],
};
