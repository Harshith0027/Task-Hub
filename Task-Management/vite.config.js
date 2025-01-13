import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add aliases if needed (optional)
      '@mui/material': '@mui/material',
      '@mui/icons-material': '@mui/icons-material',
    },
  },
  optimizeDeps: {
    include: ['@mui/material', '@mui/icons-material'], // Ensure these are optimized
  },
})
