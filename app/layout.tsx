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

import Header from "./components/header";
import { AuthProvider } from "./context/AuthContext";
import { CategoryProvider } from "./context/CategoryProvider";
import { FooterCategoryProvider } from "./context/FooterCategoryProvider";
import Footer from "./components/footer";
import { CartProvider } from "./context/CartContext";
import { SessionProvider } from './context/SessionContext'; // SessionProvider'ı import ettik
import { AxiosInterceptorWrapper } from "@/lib/axiosInstance";

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
        {/* Viewport meta etiketi eklenerek mobilde düzgün çalışması sağlandı */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{ margin: 0, padding: 0, overflowX: "hidden" }}>
        <AuthProvider>
        <AxiosInterceptorWrapper>
          <AlertProvider>
            <SessionProvider> {/* SessionProvider'ı burada açıyoruz */}
              <CartProvider> {/* CartProvider'ı burada açıyoruz */}
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
              </CartProvider> {/* CartProvider'ı burada kapatıyoruz */}
            </SessionProvider> {/* SessionProvider'ı burada kapatıyoruz */}
          </AlertProvider>
          </AxiosInterceptorWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
