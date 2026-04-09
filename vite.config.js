import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      "/api/v1": "http://localhost:3000",
      // "/cdn": {
      //   target: "https://cdn.dummyjson.com",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/cdn/, ""),
      // },
    },
  },
});