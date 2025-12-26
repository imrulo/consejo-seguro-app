import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteCommonjs({
      // Only transform specific CommonJS files, not all JS files
      include: [/node_modules/]
    }),
    react()
  ],
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, '../src'),
      '@data': path.resolve(__dirname, '../data'),
      'fs': path.resolve(__dirname, './src/mocks/node-polyfills.js'),
      'path': path.resolve(__dirname, './src/mocks/node-polyfills.js')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true, // Keep sourcemaps for debugging
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Ensure consistent naming for better debugging
        manualChunks: undefined
      }
    }
  },
  define: {
    'process.env': {},
    '__dirname': '""'
  }
})
