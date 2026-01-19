import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

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
