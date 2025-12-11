import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega as variáveis de ambiente baseadas no modo atual.
  // O parâmetro '.' busca no diretório raiz, evitando erros com process.cwd() em alguns ambientes
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    define: {
      // Substitui process.env.API_KEY pelo valor real das variáveis de ambiente durante o build
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
    server: {
      host: true,
      port: 5173,
      open: true
    },
    build: {
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'lucide-react', 'framer-motion'],
            'vendor-charts': ['recharts'],
            'vendor-ai': ['@google/genai']
          }
        }
      }
    }
  }
})