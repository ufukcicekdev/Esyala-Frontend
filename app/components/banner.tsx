import React from "react";
import { Box, Typography, Breadcrumbs, Link } from "@mui/material";

interface BannerProps {
    backgroundImage: string;
    title: string;
    breadcrumbs: { label: string; href: string }[];
    textColor?: string; 
}

const Banner: React.FC<BannerProps> = ({ backgroundImage, title, breadcrumbs, textColor = "#383838" }) => { // Default değer siyah
    return (
        <Box
            sx={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "250px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: textColor, // Metin rengini burada kullanıyoruz
                textAlign: "center",
            }}
        >
            <Typography
                variant="h1"
                sx={{
                    fontSize: {
                        xs: "24px", // Küçük ekranlar (mobil)
                        sm: "32px", // Orta ekranlar (tablet)
                        md: "40px", // Büyük ekranlar
                        lg: "44px", // Çok büyük ekranlar
                    },
                    lineHeight: {
                        xs: "28px",
                        sm: "36px",
                        md: "42px",
                        lg: "46px",
                    },
                    fontWeight: 700,
                    marginBottom: "15px",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                }}
            >
                {title}
            </Typography>

            <Breadcrumbs
                sx={{
                    fontSize: "14px", // Yazı boyutu
                    lineHeight: "16px", // Satır yüksekliği
                    fontWeight: 200, // İnce yazı
                    overflow: "hidden", // Taşma gizle
                    color: textColor, // Burada da textColor kullanıyoruz
                    "& a": {
                        textDecoration: "none",
                        color: "inherit", // Bağlantı renklerini dışarıdan gelen textColor'a göre ayarlıyoruz
                        "&:hover": {
                            textDecoration: "underline",
                        },
                    },
                }}
            >
                {breadcrumbs.map((breadcrumb, index) => (
                    <Link href={breadcrumb.href} key={index}>
                        {breadcrumb.label}
                    </Link>
                ))}
            </Breadcrumbs>
        </Box>
    );
};

export default Banner;
