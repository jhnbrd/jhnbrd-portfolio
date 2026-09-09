import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { freedomWallPlugin } from './src/server/freedomWallPlugin.js'

export default defineConfig({
  plugins: [
    react(),
    freedomWallPlugin(),
  ],
  server: {
    port: 8000,
    host: true,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8008',
        changeOrigin: true,
      },
    },
    hmr: process.env.VITE_HMR_HOST ? {
      host: process.env.VITE_HMR_HOST,
      clientPort: 443,
      protocol: 'wss',
    } : undefined,
  },
  preview: {
    port: 8000,
    host: true,
    allowedHosts: true,
    proxy: {
      '/ws': {
        target: 'ws://localhost:8008',
        ws: true,
      },
      '/api': {
        target: 'http://localhost:8008',
        changeOrigin: true,
      },
    },
  },
})

