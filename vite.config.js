import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import compressionPlugin from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      fastRefresh: true,
      babel: {
        plugins: [],
        parserOpts: {
          plugins: ['jsx']
        }
      }
    }), 
    tailwindcss(),
    compressionPlugin({
      algorithm: 'gzip', 
      ext: '.gz',
      threshold: 10240,
      deleteOriginFile: false,
      filter: /\.(js|css|html|svg)$/i,
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query']
        }
      }
    },
    sourcemap: false,
    chunkSizeWarningLimit: 1000
  },
  server: {
    allowedHosts: [
      '75cf139aac93.ngrok-free.app'
    ],
  }
})
