import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// If your repo is https://github.com/<user>/<repo>
// then base must be "/<repo>/"
export default defineConfig({
  plugins: [react()],
  base: "/christmas-card/",
});
