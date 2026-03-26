import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({

  // Para que serve? 
  // O objeto `server` é usado para configurar o servidor de desenvolvimento do Vite. 
  // Ele permite definir opções como o host e a porta em que o servidor será executado. 
  // No exemplo fornecido, o servidor está configurado para aceitar conexões de qualquer host (`host: true`) e para ser executado na porta 5173 (`port: 5173`).
  server: {
    host: true,
    port: 5173,
  },
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
