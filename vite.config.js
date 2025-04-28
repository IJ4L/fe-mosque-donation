import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import compressionPlugin from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Add specific configurations for React plugin to improve HMR
      fastRefresh: true,
      babel: {
        plugins: [],
        // Ensure consistent component exports for better HMR
        parserOpts: {
          plugins: ['jsx']
        }
      }
    }), 
    tailwindcss(),
    compressionPlugin({
      algorithm: 'gzip', // Use gzip compression
      ext: '.gz', // Output file extension
      threshold: 10240, // Only compress files larger than 10kb
      deleteOriginFile: false, // Keep the original file
      filter: /\.(js|css|html|svg)$/i, // Only compress specific file types
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Enable minification and compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      }
    },
    // Split chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query']
        }
      }
    },
    // Generate source maps only for production debugging if needed
    sourcemap: false,
    // Reduce chunk size warnings
    chunkSizeWarningLimit: 1000
  }
})
