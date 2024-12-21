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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, Grid, Box } from "@mui/material";
import { AlertProvider } from './context/AlertContext.js';
import { NextPage } from "next";
import Header from "./components/header";
import { AuthProvider } from "./context/AuthContext";
import { CategoryProvider } from "./context/CategoryProvider";
import { FooterCategoryProvider } from "./context/FooterCategoryProvider";
import Footer from "./components/footer";
import { CartProvider } from "./context/CartContext";
import { SessionProvider } from './context/SessionContext'; // SessionProvider'ı import ettik
import { AxiosInterceptorWrapper } from "@/lib/axiosInstance";
import Head from 'next/head'; // Head'i import ettik

// Global metadata
export const metadata: Metadata = {
  title: "Anasayfa | Eşyala",
  description: "Esyala.com, mobilya, ev dekorasyonu ve elektronik ürünler sunan online alışveriş platformudur. Evinizi kolayca yenileyin!",
  keywords: [
    "eşya", "online alışveriş", "mobilya", "dekorasyon", 
    "e-ticaret", "ucuz alışveriş", "indirimli ürünler",
  ],
  openGraph: {
    url: "https://esyala.com/",
    type: "website",
    title: "Anasayfa | Eşyala",
    description: "Esyala.com, mobilya, ev dekorasyonu ve elektronik ürünler sunan online alışveriş platformudur. Evinizi kolayca yenileyin!",
    locale: "tr_TR",
    images: [
      {
        url: "https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/banners/WhatsApp_Image_2024-05-04_at_15.webp",
        width: 1200,
        height: 630,
        alt: "Eşyala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anasayfa | Eşyala",
    description: "Esyala.com, mobilya, ev dekorasyonu ve elektronik ürünler sunan online alışveriş platformudur. Evinizi kolayca yenileyin!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <head>
        {/* Google Tag Manager */}
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MV485Q4F');`,
          }}
        />
        <meta name="author" content="esyala.com"/>
        <meta name="robots" content="index,follow"/>
        <meta name="publisher" content="Eşyala.com"/>

        {/* End Google Tag Manager */}
        
        <meta name="google-site-verification" content="rcp9ERDoEacGWrQI7ImCG3C9LdDj3wAO8Hn90zo3KsY" />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-J5ZNBS7353"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-J5ZNBS7353');
            `,
          }}
        />

        {/* Canonical Link */}
        <Head>
          <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
        </Head>

      </head>
      <body style={{ margin: 0, padding: 0, overflowX: "hidden" }}>
        <AuthProvider>
          <AxiosInterceptorWrapper>
            <AlertProvider>
              <SessionProvider>
                <CartProvider>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      minHeight: "100vh",
                      bgcolor: "background.default",
                      overflowX: "hidden", // Box içinde yatay taşmayı engelle
                    }}
                  >
                    {/* Header */}
                    <Box component="header" sx={{ flexGrow: 0 }}>
                      <CategoryProvider>
                        <Header />
                      </CategoryProvider>
                    </Box>

                    {/* Ana İçerik */}
                    <Container
                      maxWidth="lg"
                      sx={{
                        flex: 1,
                        mt: 3,
                        mb: 3,
                        p: { xs: 2, sm: 3 },
                        overflowX: "hidden",
                      }}
                    >
                      <Grid container spacing={2} sx={{ overflowX: "hidden" }}>
                        <Grid item xs={12}>
                          {children}
                        </Grid>
                      </Grid>
                    </Container>

                    {/* Footer */}
                    <FooterCategoryProvider>
                      <Box component="footer" sx={{ flexGrow: 0 }}>
                        <Footer />
                      </Box>
                    </FooterCategoryProvider>
                  </Box>
                </CartProvider>
              </SessionProvider>
            </AlertProvider>
          </AxiosInterceptorWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
