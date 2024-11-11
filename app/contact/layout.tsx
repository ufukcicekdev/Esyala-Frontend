import { Metadata } from "next";

// Global metadata
export const metadata: Metadata = {
  title: "İletişim | Eşyala", // Title
  description: "Esyala.com ile iletişime geçin! Sorularınız, geri bildirimleriniz veya destek talepleriniz için bize ulaşın. Müşteri memnuniyeti ve çözüm odaklı hizmet anlayışımızla, sizlere en iyi deneyimi sunmak için buradayız.",
  openGraph: {
    url: "https://esyala.com/contact/",
    type: "website",
    title: "İletişim | Eşyala",
    description: "Esyala.com ile iletişime geçin! Sorularınız, geri bildirimleriniz veya destek talepleriniz için bize ulaşın. Müşteri memnuniyeti ve çözüm odaklı hizmet anlayışımızla, sizlere en iyi deneyimi sunmak için buradayız.",
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
    title: "İletişim | Eşyala",
    description: "Esyala.com ile iletişime geçin! Sorularınız, geri bildirimleriniz veya destek talepleriniz için bize ulaşın. Müşteri memnuniyeti ve çözüm odaklı hizmet anlayışımızla, sizlere en iyi deneyimi sunmak için buradayız.",
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
