import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'esyala-frontend',
  webDir: './out', // Eğer build çıktılarınız burada ise
  bundledWebRuntime: false,
  server: {
    url: "https://esyala-backend-production.up.railway.app/", // Web uygulamanızın URL'ini buraya ekleyin
  },

};
export default config;

