import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteCommonjs({
      // Explicitly include all JS files (including ../src) to ensure Core modules are transformed
      include: [/\.js$/, /\.cjs$/]
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
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    outDir: 'dist',
    sourcemap: true, // Habilitar sourcemaps para debugging
    minify: 'esbuild',
  },
  define: {
    'process.env': {},
    '__dirname': '""'
  }
})
