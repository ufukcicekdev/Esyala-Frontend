"use client";
import React from "react";
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Banner from "../components/banner";
import { Typography } from "@mui/material";



const About = () => {

    return (
        <Container maxWidth="lg">
            <Banner
                backgroundImage="https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/images/img43.jpg"
                title="Hakkımızda"
                breadcrumbs={[
                    { label: "Ana Sayfa", href: "/" },
                    { label: "Hakkımızda", href: "/about" },
                ]}
            />

            <Container>
                <Box py={4}>
                    <Grid container spacing={4} direction="column" alignItems="center">
                        <Grid item xs={12}>
                            <Box textAlign="center" mb={4}>
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontSize: {
                                            xs: "24px", // Small screens (mobile)
                                            sm: "32px", // Medium screens (tablet)
                                            md: "40px", // Large screens
                                            lg: "44px", // Very large screens
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
                                        color: "#383838",
                                    }}
                                >
                                    Biz Kimiz?
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Box textAlign="center">
                                <p>
                                    Merhaba! Biz Esyala.com ekibi olarak, sizlere en iyi kiralama ve satın alma deneyimini sunmak için buradayız. 
                                    Misyonumuz, kullanıcılarımıza geniş bir ürün yelpazesi sunarak onların ihtiyaçlarına uygun çözümler sağlamaktır.
                                </p>
                                <p>
                                    Esyala.com olarak, güvenilirlik, kalite ve müşteri memnuniyetini ön planda tutuyoruz. Her adımda sizin için en iyisini sunmak için çalışıyor ve her talebi özenle değerlendiriyoruz.
                                </p>
                                <p>
                                    Sunduğumuz ürünler arasında mobilya, elektronik eşyalar, ev aletleri ve daha fazlası bulunmaktadır. Ayrıca, esnek kiralama seçenekleri ve uygun fiyatlarla, ihtiyaçlarınıza uygun çözümler sunuyoruz.
                                </p>
                                <p>
                                    Siz değerli müşterilerimizin memnuniyeti bizim için en önemli önceliktir. Her zaman daha iyiye ve daha iyisine ulaşmak için çalışıyoruz. Sizlere hizmet etmekten mutluluk duyuyoruz ve her zaman yanınızdayız.
                                </p>
                                <p><strong>Teşekkür ederiz, Esyala.com Ekibi</strong></p>
                            </Box>
                        </Grid>
                    </Grid>

                    <Box mt={4} textAlign="center">
                        <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>Bizi Takip Edin</Typography>
                        <Grid container justifyContent="center" spacing={2} mt={2}>
                            <Grid item>
                                <Link
                                    target="_blank"
                                    rel="nofollow noreferrer"
                                    href="https://www.facebook.com/esyalacom"
                                >
                                    <FaFacebook className="text-blue-600 hover:text-blue-800" size={30} />
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    target="_blank"
                                    rel="nofollow noreferrer"
                                    href="https://www.instagram.com/esyalacom/"
                                >
                                    <FaInstagram className="text-pink-600 hover:text-pink-800" size={30} />
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    target="_blank"
                                    rel="nofollow noreferrer"
                                    href="https://www.linkedin.com/company/102235289/admin/feed/posts/?feedType=following"
                                >
                                    <FaLinkedin className="text-blue-700 hover:text-blue-900" size={30} />
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    target="_blank"
                                    rel="nofollow noreferrer"
                                    href="https://www.youtube.com/@esyalacom"
                                >
                                    <FaYoutube className="text-red-600 hover:text-red-800" size={30} />
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>

    
        </Container>
    );
};

export default About;
