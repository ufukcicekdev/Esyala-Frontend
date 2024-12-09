import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'esyala-frontend',
  webDir: './out', 
  bundledWebRuntime: false,
  server: {
    url: "https://esyala-frontend-production.up.railway.app/",
  },

};
export default config;

