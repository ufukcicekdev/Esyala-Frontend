import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'esyala-frontend',
  webDir: './out', // Eğer build çıktılarınız burada ise
  bundledWebRuntime: false,
};
export default config;

