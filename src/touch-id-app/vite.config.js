import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import polyfillNode from 'rollup-plugin-polyfill-node'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      port: 3000
    },
})
