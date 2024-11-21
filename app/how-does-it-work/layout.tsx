import { Metadata } from "next";


import "../static/css/doesitwork.css";


// Global metadata
export const metadata: Metadata = {
  title: "Nasıl Çalışır | Eşyala", // Title
  description: "Esyala.com'un nasıl çalıştığını öğrenin. Kullanıcı dostu ara yüzümüzle işlerinizi kolaylaştırın ve etkili sonuçlar elde edin.",
  openGraph: {
    url: "https://esyala.com/",
    type: "website",
    title: "Blog | Eşyala",
    description: "Esyala.com'un nasıl çalıştığını öğrenin. Kullanıcı dostu ara yüzümüzle işlerinizi kolaylaştırın ve etkili sonuçlar elde edin.",
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
    title: "Nasıl Çalışır | Eşyala",
    description: "Esyala.com'un nasıl çalıştığını öğrenin. Kullanıcı dostu ara yüzümüzle işlerinizi kolaylaştırın ve etkili sonuçlar elde edin.",
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
