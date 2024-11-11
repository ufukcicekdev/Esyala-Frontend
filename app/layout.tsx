import type { Metadata } from "next";
import localFont from "next/font/local";
import "./static/css/main.css";
import "./static/css/bootstrap2.css";
import "./static/css/animate2.css";
import "./static/css/icon-fonts2.css";
import "./static/css/responsive.css";
import "./static/css/custom2.css";
import "./static/css/bcf16bd37f5afe2e2.css";
import "./static/css/share.css";

import Header from "./components/header";
import Footer from "./components/footer";

// Local font imports
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
    domain: "esyala.com",
    title: "Anasayfa | Eşyala",
    description: "Eşyala, online alışveriş platformu.",
    image: "https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/banners/WhatsApp_Image_2024-05-04_at_15.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Meta bilgileri ve stil dosyaları burada */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div id="wrapper">
          <div className="w1">
            <Header />
            {children}
            <Footer />
            <span id="back-top" className="fa fa-arrow-up"></span>
          </div>
        </div>

        {/* JS dosyalarını body'nin sonuna yerleştirin */}
        <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" ></script>
        <script type="text/javascript" src="https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/js/jquery.main.js" defer></script>
        <script type="text/javascript" src="https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/js/jquery.js" defer></script>
        <script type="text/javascript" src="https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/js/function.js" defer></script>
        <script type="text/javascript" src="https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/js/plugins.js" defer></script>
        <script type="text/javascript" src="https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/js/main2.js" defer></script>
        <script type="text/javascript" src="https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/js/getpath.js" defer></script>

        <script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0.24/dist/fancybox.umd.js"></script>
      </body>
    </html>
  );
}
