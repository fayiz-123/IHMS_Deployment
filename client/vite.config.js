import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'Integrated Home Management System',
      short_name: 'IHMS',
      start_url: '/',
      display: 'standalone',
      background_color: '#7020f1',
      theme_color: '#7020f1',
      icons: [
        { src: '/IHMS.png', sizes: '192x192', type: 'image/png' },
        { src: '/IHMS.png', sizes: '512x512', type: 'image/png' }
      ]
    }
  })],

})
