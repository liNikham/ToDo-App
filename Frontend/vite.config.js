import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Your backend API URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: removes /api prefix when proxying
      },
    },
  },
})
