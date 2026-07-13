import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base in production so the built gallery works from any sub-path
// (GitHub Pages serves it under /<repo>/app/). Dev stays at the root.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? './' : '/',
  plugins: [react()]
}));
