import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 7100,
    host: '0.0.0.0',
    strictPort: true
  },
  appType: 'mpa'
});
