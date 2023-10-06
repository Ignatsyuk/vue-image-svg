import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],

  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.js', import.meta.url)),
      name: 'Image',
      fileName: (format) => `image.${format}.js`
    },

    rollupOptions: {
      external: ['vue'],

      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
})
