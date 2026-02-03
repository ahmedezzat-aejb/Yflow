import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // أي طلب يبدأ بـ /api هيروح أوتوماتيك للسيرفر بتاعنا
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // لو السيرفر مش بيستخدم كلمة /api في الـ routes
      },
    },
  },
});
