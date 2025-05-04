import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import EnvironmentPlugin from "vite-plugin-environment";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), EnvironmentPlugin("all")],
  define: {
    "process.env": process.env,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
});
