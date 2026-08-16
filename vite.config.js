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
    proxy: {
      '/api': {
        // 'backend' es el nombre del servicio en tu docker-compose.yml
        target: 'http://backend:8080', 
        changeOrigin: true,
        // Si tu backend no tiene prefijo /api en las rutas, 
        // pero tú lo usas en el front, añade:
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
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
