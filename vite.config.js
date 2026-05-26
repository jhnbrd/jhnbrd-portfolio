import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8000,
    host: true,
    allowedHosts: true,
    hmr: {
      host: 'dev.jhnbrd.com',
      clientPort: 443,
      protocol: 'wss',
    },
  },
  preview: {
    port: 8000,
    host: true,
    allowedHosts: true,
  },
})
