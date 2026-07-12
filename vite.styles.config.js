import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist-styles',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        tsumiki: resolve(process.cwd(), 'src/styles/index.css'),
      },
      output: { assetFileNames: '[name][extname]' },
    },
  },
})
