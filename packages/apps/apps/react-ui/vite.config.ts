import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // أي طلب يروح لـ /api هيتحول أوتوماتيك لبورت السيرفر 3000
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // لو السيرفر مش بيبدأ بكلمة api في الـ routes
      }
    }
  }
})
