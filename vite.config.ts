import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig((parameter)=>{
  const outDir = parameter.mode === 'production' ? 'dist-prod' : 'dist-dev';
  return {
    build: {
      outDir: resolve(__dirname, outDir),
    },
    plugins: [react()],
    server: {
      port: 8080,
      host: "0.0.0.0"
    },
    base: './',
  }
})
