import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Alias for the `src` directory
    },
  },
  optimizeDeps: {
    include: ['@mui/material', '@mui/icons-material'], // Pre-bundle these dependencies
  },
  server: {
    open: true, // Automatically open the browser
    host: true, // Expose to local network
    port: 5173, // Use the default port or specify your own
    proxy: {
      // Redirect API calls to your backend during development
      '/api': {
        target: 'https://task-hub-back-end.onrender.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove `/api` prefix if not used in backend
      },
    },
  },
  build: {
    outDir: 'dist', // Output directory for build
  },
});
