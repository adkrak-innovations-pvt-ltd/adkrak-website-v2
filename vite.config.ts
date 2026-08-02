import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base path differs per target:
//   GitHub Pages -> served under /adkrak-website-v2/
//   adkrak.in    -> served from the domain root
// Set BASE_PATH=/ for the production domain build.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/adkrak-website-v2/',
  plugins: [react()],
});
