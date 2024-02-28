import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'service-worker.js',
      registerType: "autoUpdate",
      injectRegister: "auto",
      injectManifest: {
        globPatterns: ['**/*.{js,jsx,css,html,ico,png,svg,json}', '**/*.{png,svg}'],
      },
      workbox: {
        navigateFallback: "/index.html",
      },
      manifest: {
        name: "Tricount",
        description: "Tricount",
        short_name: "Tricount",
        start_url: "/",
        display: "standalone",
        background_color: "#fff",
        theme_color: "#3f51b5",
        icons: [
          {
            src: "/AppImages/android/android-launchericon-48-48.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "/AppImages/android/android-launchericon-72-72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "/AppImages/android/android-launchericon-96-96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/AppImages/android/android-launchericon-144-144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/AppImages/android/android-launchericon-192-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/AppImages/android/android-launchericon-512-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/AppImages/android/android-launchericon-192-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
        ]
    } 
    }),
  ],
  define: {
    global: "window",
  },
});
