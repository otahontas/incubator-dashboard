import { defineConfig } from "vite"
import reactRefresher from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresher()],
})
