"use client";
import React, { useEffect, useState } from "react";
import { fetchAbout } from "@/lib/mainApi/main_api";
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Banner from "../components/banner";
import { Typography } from "@mui/material";

interface Member {
    level: string;
    [key: string]: any;
}

const About = () => {
    const [sortedMembers, setSortedMembers] = useState<Record<string, Member[]>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeamData = async () => {
            const response = await fetchAbout();
            if (response?.data) {
                const teamMembers: Member[] = response.data;

                // Üyeleri level'a göre grupla
                const membersByLevel = teamMembers.reduce<Record<string, Member[]>>((acc, member) => {
                    if (!acc[member.level]) {
                        acc[member.level] = [];
                    }
                    acc[member.level].push(member);
                    return acc;
                }, {});

                setSortedMembers(membersByLevel);
            }
            setLoading(false);
        };

        fetchTeamData();
    }, []);

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
                    <Grid container spacing={2} direction="column" alignItems="center">
                        <Grid item xs={12}>
                            <Box textAlign="center" mb={4}>
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
                            color: "#383838",
                        }}
                    >
                        Biz Kimiz?
                    </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Box textAlign="center">
                                <p>Merhaba! Biz Esyala.com ekibi olarak, sizlere en iyi kiralama ve satın alma deneyimini sunmak için buradayız. Misyonumuz, kullanıcılarımıza geniş bir ürün yelpazesi sunarak onların ihtiyaçlarına uygun çözümler sağlamaktır.</p>
                                <p>Esyala.com olarak, güvenilirlik, kalite ve müşteri memnuniyetini ön planda tutuyoruz. Her adımda sizin için en iyisini sunmak için çalışıyor ve her talebi özenle değerlendiriyoruz.</p>
                                <p>Sunduğumuz ürünler arasında mobilya, elektronik eşyalar, ev aletleri ve daha fazlası bulunmaktadır. Ayrıca, esnek kiralama seçenekleri ve uygun fiyatlarla, ihtiyaçlarınıza uygun çözümler sunuyoruz.</p>
                                <p>Siz değerli müşterilerimizin memnuniyeti bizim için en önemli önceliktir. Her zaman daha iyiye ve daha iyisine ulaşmak için çalışıyoruz. Sizlere hizmet etmekten mutluluk duyuyoruz ve her zaman yanınızdayız.</p>
                                <p><strong>Teşekkür ederiz, Esyala.com Ekibi </strong></p>
                            </Box>
                        </Grid>
                    </Grid>

                    <Box mt={4} textAlign="center">
                        <span className="title">Bizi Takip Edin</span>
                        <Grid container justifyContent="center" spacing={2} mt={2}>
                            <Grid item>
                                <Link
                                    target="_blank"
                                    rel="nofollow noreferrer"
                                    href="https://www.facebook.com/esyalacom"
                                >
                                    <FaFacebook className="text-blue-600 hover:text-blue-800" size={20} />
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    target="_blank"
                                    rel="nofollow noreferrer"
                                    href="https://www.instagram.com/esyalacom/"
                                >
                                    <FaInstagram className="text-pink-600 hover:text-pink-800" size={20} />
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    target="_blank"
                                    rel="nofollow noreferrer"
                                    href="https://www.linkedin.com/company/102235289/admin/feed/posts/?feedType=following"
                                >
                                    <FaLinkedin className="text-blue-700 hover:text-blue-900" size={20} />
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    target="_blank"
                                    rel="nofollow noreferrer"
                                    href="https://www.youtube.com/@esyalacom"
                                >
                                    <FaYoutube className="text-red-600 hover:text-red-800" size={20} />
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>

            <Container>
                <Box textAlign="center" mb={4}>
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
                            color: "#383838",
                        }}
                    >
                        Takım
                    </Typography>
                    {loading ? (
                        <Box textAlign="center">Yükleniyor...</Box>
                    ) : (
                        <Grid container spacing={3}>
                            {Object.keys(sortedMembers).map((level) => (
                                sortedMembers[level].map((member, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Box className="our-team" textAlign="center">
                                            <Image
                                                src={'https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul' + member.image.replace('/media', '')}
                                                alt={member.full_name}
                                                width={300}
                                                height={300}
                                                className="img-fluid" // Makes the image responsive
                                            />
                                            <Box mt={2}>
                                                <h3 className="title">{member.full_name}</h3>
                                                <span className="post">{member.position}</span>
                                            </Box>
                                            <ul className="social">
                                                {member.social_media_links && Object.entries(member.social_media_links).map(([platform, link]) => (
                                                    <li key={platform}>
                                                        {/* Conditionally render icons based on the platform */}
                                                        {platform === 'facebook' && (
                                                            <Link
                                                                target="_blank"
                                                                rel="nofollow noreferrer"
                                                                href={link || "/"}
                                                            >
                                                                <FaFacebook size={35} />
                                                            </Link>
                                                        )}
                                                        {platform === 'instagram' && (
                                                            <Link
                                                                target="_blank"
                                                                rel="nofollow noreferrer"
                                                                href={link || "/"}
                                                            >
                                                                <FaInstagram size={35} />
                                                            </Link>
                                                        )}
                                                        {platform === 'linkedin' && (
                                                            <Link
                                                                target="_blank"
                                                                rel="nofollow noreferrer"
                                                                href={link || "/"}
                                                            >
                                                                <FaLinkedin size={35} />
                                                            </Link>
                                                        )}
                                                        {platform === 'youtube' && (
                                                            <Link
                                                                target="_blank"
                                                                rel="nofollow noreferrer"
                                                                href={link || "/"}
                                                            >
                                                                <FaYoutube size={35} />
                                                            </Link>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </Box>
                                    </Grid>
                                ))
                            ))}
                        </Grid>
                    )}
                </Box>
            </Container>
        </Container>

    );
};

export default About;
