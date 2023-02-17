import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { babelParse } from 'vue/compiler-sfc'
// import reactSupport from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    //TODO colocar script de polyfill para resolver o problema de não carregar a imagem das cameras no ios
    vue(
        
    ),
  ],
  server: {
    port: 8080,
    // host: "187.255.186.172"
  }
})
