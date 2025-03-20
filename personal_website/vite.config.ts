import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"

export default defineConfig({
  base: '/anthony-w03.github.io',
  plugins: [svelte()],
})
