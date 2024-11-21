import type { Metadata } from "next";
import "./static/css/main.css";
import "./static/css/bootstrap2.css";
import "./static/css/animate2.css";
import "./static/css/icon-fonts2.css";
import "./static/css/responsive.css";
import "./static/css/custom2.css";
import "./static/css/bcf16bd37f5afe2e2.css";
import "./static/css/share.css";
import "./static/css/header.css";
import "./static/css/team.css";
import "./globals.css";

import { AlertProvider } from './context/AlertContext.js';

import Header from "./components/header";
import Footer from "./components/footer";






// Global metadata
export const metadata: Metadata = {
  title: "Anasayfa | Eşyala",
  description: "Eşyala, online alışveriş platformu.",
  openGraph: {
    url: "https://esyala.com/",
    type: "website",
    title: "Anasayfa | Eşyala",
    description: "Eşyala, online alışveriş platformu.",
    images: [
      {
        url: "https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/banners/WhatsApp_Image_2024-05-04_at_15.webp",
        width: 1200,
        height: 630,
        alt: "Eşyala Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anasayfa | Eşyala",
    description: "Eşyala, online alışveriş platformu.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <head>
        {/* Head kısmındaki meta etiketler, title vb. buraya eklenebilir */}
      </head>
      <body className="antialiased">
        <AlertProvider>
          <div id="wrapper">
            <div className="w1">
              <Header />
              {children}
              <Footer />
              <span id="back-top" className="fa fa-arrow-up"></span>
            </div>
          </div>
        </AlertProvider>
      </body>
    </html>
  );
}