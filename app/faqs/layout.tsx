import { Metadata } from "next";


import "../static/css/sss.css";


// Global metadata
export const metadata: Metadata = {
  title: "Sık Sorulan Sorular | Eşyala", // Title
  description: "Esyala.com Sık Sorulan Sorular (SSS) sayfası, hizmetlerimiz, hesap yönetimi ve diğer konular hakkında en çok merak edilen sorulara yanıt sunar. Hızlı çözümler için doğru yerdesiniz!",
  openGraph: {
    url: "https://esyala.com/",
    type: "website",
    title: "Sık Sorulan Sorular | Eşyala",
    description: "Esyala.com Sık Sorulan Sorular (SSS) sayfası, hizmetlerimiz, hesap yönetimi ve diğer konular hakkında en çok merak edilen sorulara yanıt sunar. Hızlı çözümler için doğru yerdesiniz!",
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
    title: "Sık Sorulan Sorular | Eşyala",
    description: "Esyala.com Sık Sorulan Sorular (SSS) sayfası, hizmetlerimiz, hesap yönetimi ve diğer konular hakkında en çok merak edilen sorulara yanıt sunar. Hızlı çözümler için doğru yerdesiniz!",
    image: "https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/banners/WhatsApp_Image_2024-05-04_at_15.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <main>
        {children}
    </main>
       
  );
}
