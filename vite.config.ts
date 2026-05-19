import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    server: {
      preset: process.env.SERVER_PRESET || "node-server",
    }
  }
});
