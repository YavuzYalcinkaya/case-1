import { defineConfig } from "vite";

export default defineConfig({
  define: {
    "process.env": {},
  },
  resolve: {
    alias: {
      "@mui/styled-engine": "@mui/styled-engine-sc",
    },
  },
});
