import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/adkrak-website-v2/',
  plugins: [react()],
});
