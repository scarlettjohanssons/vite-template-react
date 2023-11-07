import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@providers': path.resolve(__dirname, './src/providers'),
      '@mocks': path.resolve(__dirname, './src/REST/mocks'),
      '@components': path.resolve(__dirname, './src/components'),
      '@bus': path.resolve(__dirname, './src/bus'),
      '@core': path.resolve(__dirname, './src/core'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@REST': path.resolve(__dirname, './src/REST'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@setup': path.resolve(__dirname, './src/setup'),
      '@themes': path.resolve(__dirname, './src/themes'),
      '@assets': path.resolve(__dirname, './src/assets'),
      // Добавьте остальные алиасы по аналогии
    },
  },
  server: {
    host: 'localhost',
    port: 3000,
  },
  define: {
    'process.env': {},
  },
});
