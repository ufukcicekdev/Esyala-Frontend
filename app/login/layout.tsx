import { Metadata } from "next";

// Global metadata
export const metadata: Metadata = {
  title: "Giriş | Eşyala", // Title
  description: "Esyala.com, kullanıcıların online alışveriş yapabileceği güvenilir bir platformdur. En yeni ürünler, kolay ödeme seçenekleri ve hızlı teslimatla alışveriş deneyiminizi en üst seviyeye taşıyoruz. Şimdi başlayın ve ihtiyaçlarınıza uygun ürünleri keşfedin.",
  openGraph: {
    url: "https://esyala.com/contact/",
    type: "website",
    title: "Giriş | Eşyala",
    description: "Esyala.com, kullanıcıların online alışveriş yapabileceği güvenilir bir platformdur. En yeni ürünler, kolay ödeme seçenekleri ve hızlı teslimatla alışveriş deneyiminizi en üst seviyeye taşıyoruz. Şimdi başlayın ve ihtiyaçlarınıza uygun ürünleri keşfedin.",
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
    title: "Giriş | Eşyala",
    description: "Esyala.com, kullanıcıların online alışveriş yapabileceği güvenilir bir platformdur. En yeni ürünler, kolay ödeme seçenekleri ve hızlı teslimatla alışveriş deneyiminizi en üst seviyeye taşıyoruz. Şimdi başlayın ve ihtiyaçlarınıza uygun ürünleri keşfedin.",
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
