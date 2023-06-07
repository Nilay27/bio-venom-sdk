import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import polyfillNode from 'rollup-plugin-polyfill-node'

// The Vite Config
export default defineConfig({
  plugins: [
    polyfillNode(),
    react()
  ],
  server: {
    port: 3000
  },
})
