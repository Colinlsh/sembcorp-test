import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["leaflet"],
  },
  // server: {
  //   proxy: {
  //     // String shorthand: '/api' -> 'https://nominatim.openstreetmap.org'
  //     "/api": {
  //       target: "https://nominatim.openstreetmap.org",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },
});
