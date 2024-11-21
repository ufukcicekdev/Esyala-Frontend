import { Metadata } from "next";

// Global metadata
export const metadata: Metadata = {
  title: "Blog | Eşyala", // Title
  description: "Esyala Blog: Dekorasyon, yaşam tarzı ve teknoloji ile ilgili en son haberler ve rehber yazılarla ilham alın. Ev ve yaşamınızı yenileyin.",
  openGraph: {
    url: "https://esyala.com/",
    type: "website",
    title: "Blog | Eşyala",
    description: "Esyala Blog: Dekorasyon, yaşam tarzı ve teknoloji ile ilgili en son haberler ve rehber yazılarla ilham alın. Ev ve yaşamınızı yenileyin.",
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
   
    title: "Blog | Eşyala",
    description: "Esyala Blog: Dekorasyon, yaşam tarzı ve teknoloji ile ilgili en son haberler ve rehber yazılarla ilham alın. Ev ve yaşamınızı yenileyin.",
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
