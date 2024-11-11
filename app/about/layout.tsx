import { Metadata } from "next";

// Global metadata
export const metadata: Metadata = {
  title: "Hakkımızda | Eşyala", // Title
  description: "Esyala.com hakkında bilgi edinin. Kaliteli hizmet ve müşteri memnuniyeti için buradayız. Misyonumuz, vizyonumuz ve değerlerimiz hakkında daha fazla bilgi alın.",
  openGraph: {
    url: "https://esyala.com/about/",
    type: "website",
    title: "Hakkımızda | Eşyala",
    description: "Esyala.com hakkında bilgi edinin. Kaliteli hizmet ve müşteri memnuniyeti için buradayız. Misyonumuz, vizyonumuz ve değerlerimiz hakkında daha fazla bilgi alın.",
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
    title: "Hakkımızda | Eşyala",
    description: "Esyala.com hakkında bilgi edinin. Kaliteli hizmet ve müşteri memnuniyeti için buradayız. Misyonumuz, vizyonumuz ve değerlerimiz hakkında daha fazla bilgi alın.",
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
