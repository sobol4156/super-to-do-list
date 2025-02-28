import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ mode }) => ({
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

    mode === 'production' && visualizer({ open: false }),
  ],

  build: {
    target: 'esnext',
    minify: 'esbuild',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
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

  test: {
    environment: 'jsdom',
    globals: true,
  },
}))
