import { defineConfig } from "vite";
import { resolve } from "path";

console.log("Vite config loaded");

export default defineConfig({
    build: {
        rollupOptions: {
        input: {
            home: resolve(__dirname, "index.html"),
            about: resolve(__dirname, "about.html"),
            work: resolve(__dirname, "work.html"),
            contact: resolve(__dirname, "contact.html"),
        },
        },
    },
});
