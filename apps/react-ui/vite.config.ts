import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { join } from 'path';

export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: '../../dist/apps/react-ui',
  },
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
  server: {
    port: 4300,
    fs: {
      allow: ['.']
    }
  },
});
