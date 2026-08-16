import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    watch: {
      usePolling: true,
    },
    hmr: {
      clientPort: 3000, 
    },
  },
  resolve: {
    alias: {
      '@': '/src',
      '@common': '/src/components/common',
      '@layout': '/src/components/layout',
      '@components': '/src/components',
      '@dev': '/src/dev',
      '@features': '/src/features',
      '@f': '/src/features',
      '@assets': '/src/assets',
      '@utils': '/src/utils',
      '@hooks': '/src/hooks',
      '@contexts': '/src/contexts',
      '@pages': '/src/pages',
      '@fallbacks': '/src/pages/fallbacks',
      '@dashboard': '/src/features/dashboard'
    }
  }
})
