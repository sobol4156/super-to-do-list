import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),

    viteCompression({
      algorithm: 'gzip',
      threshold: 1024,
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      threshold: 1024,
    }),

    isProduction && visualizer({ open: false }),
  ],

  build: {
    target: 'esnext',
    minify: 'esbuild',
    terserOptions: {
      compress: {
        drop_console: isProduction,
        drop_debugger: isProduction,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vue')) return 'vue'
            return 'vendor'
          }
        },
      },
    },
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia'],
    exclude: ['some-heavy-lib'],
  },
})
