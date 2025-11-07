import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import prerender from "vite-plugin-prerender";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),

    prerender({
      staticDir: path.resolve(__dirname, "dist"),
      routes: [
        "/",
        "/games",
        "/about",
        "/contact",
        "/privacy",
        "/terms",
        "/help",
        "/parents",
        "/safety",
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    // 🚀 Removes all console.* and debugger in production
    drop: mode === "production" ? ["console", "debugger"] : [],
  },
}));
