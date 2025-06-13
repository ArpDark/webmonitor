import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const port=4173;
// https://vite.dev/config/
export default defineConfig({
  base:"/",
  server:{
    port:port
  },
  plugins: [react()],
})
