import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// VITE_INLINE=1 produces a single-file build (assets inlined) for static preview hosting.
const inline = process.env.VITE_INLINE === '1';

export default defineConfig({
  plugins: [react()],
  // Served on custom domain www.operonsoftwares.com — app lives at the domain root.
  base: '/',
  build: {
    assetsInlineLimit: inline ? 100_000_000 : 4096,
    cssCodeSplit: !inline,
    rollupOptions: inline
      ? { output: { inlineDynamicImports: true, manualChunks: undefined } }
      : {},
  },
});
