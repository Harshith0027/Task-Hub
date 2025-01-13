import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Alias for source folder (optional)
    },
  },
  build: {
    assetsDir: 'assets', // Ensure assets are correctly placed in production builds
  },
  server: {
    open: true, // Automatically opens the app in the browser
    port: 3000, // Optional: Change the dev server port
  },
  optimizeDeps: {
    include: ['@mui/material', '@mui/icons-material'], // Pre-bundle specific dependencies
  },
});
