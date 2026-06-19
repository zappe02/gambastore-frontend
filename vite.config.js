import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Le decimos a Vite: "Todo lo que empiece con /api, mandalo a Vercel"
      '/api': {
        target: 'https://gamba-store-cjpm-git-dev-skarkloffs-projects.vercel.app',
        changeOrigin: true,
        headers: {
          // Acá sí ponemos la llave maestra, Vite la manda sin problemas
          'x-vercel-protection-bypass': 'VyGgJPuCknk5KB1dRUf18eP0E26s94XT'
        }
      }
    }
  }
})