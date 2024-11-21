"use client";
import React, { useEffect, useState } from "react";
import { fetchAbout } from "@/lib/main_api";
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

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
        <>
            <main id="mt-main">
                <section className="mt-contact-banner style4 wow fadeInUp" data-wow-delay="0.4s" style={{ backgroundImage: "url(https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/images/img43.jpg)", backgroundSize: "cover", backgroundPosition: "center", height: "250px", width: "100%" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 text-center">
                                <h1>Hakkımızda</h1>
                                <nav className="breadcrumbs">
                                    <ul className="list-unstyled">
                                        <li> <Link href="/">AnaSayfa <i className="fa fa-angle-right"></i></Link></li>
                                        <li>Hakkımızda</li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mt-about-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="txt wow fadeInUp" data-wow-delay="0.4s">
                                    <h2>Biz Kimiz?</h2>
                                    <p>Merhaba! Biz Esyala.com ekibi olarak, sizlere en iyi kiralama ve satın alma deneyimini sunmak için buradayız. Misyonumuz, kullanıcılarımıza geniş bir ürün yelpazesi sunarak onların ihtiyaçlarına uygun çözümler sağlamaktır.</p>
                                    <p>Esyala.com olarak, güvenilirlik, kalite ve müşteri memnuniyetini ön planda tutuyoruz. Her adımda sizin için en iyisini sunmak için çalışıyor ve her talebi özenle değerlendiriyoruz.</p>
                                    <p>Sunduğumuz ürünler arasında mobilya, elektronik eşyalar, ev aletleri ve daha fazlası bulunmaktadır. Ayrıca, esnek kiralama seçenekleri ve uygun fiyatlarla, ihtiyaçlarınıza uygun çözümler sunuyoruz.</p>
                                    <p>Siz değerli müşterilerimizin memnuniyeti bizim için en önemli önceliktir. Her zaman daha iyiye ve daha iyisine ulaşmak için çalışıyoruz. Sizlere hizmet etmekten mutluluk duyuyoruz ve her zaman yanınızdayız.</p>
                                    <p><strong>Teşekkür ederiz, Esyala.com Ekibi </strong></p>
                                </div>
                                <div className="mt-follow-holder">
                                    <span className="title">Bizi Takip Edin</span>
                                    <ul className="list-unstyled social-network">

                                        <li>
                                            <Link
                                                target="_blank"
                                                rel="nofollow noreferrer"
                                                href="https://www.facebook.com/esyalacom"
                                                className="flex items-center"
                                            >
                                                <FaFacebook className="text-blue-600 hover:text-blue-800" size={20} />
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                target="_blank"
                                                rel="nofollow noreferrer"
                                                href="https://www.instagram.com/esyalacom/"
                                                className="flex items-center"
                                            >
                                                <FaInstagram className="text-pink-600 hover:text-pink-800" size={20} />
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                target="_blank"
                                                rel="nofollow noreferrer"
                                                href="https://www.linkedin.com/company/102235289/admin/feed/posts/?feedType=following"
                                                className="flex items-center"
                                            >
                                                <FaLinkedin className="text-blue-700 hover:text-blue-900" size={20} />
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                target="_blank"
                                                rel="nofollow noreferrer"
                                                href="https://www.youtube.com/@esyalacom"
                                                className="flex items-center"
                                            >
                                                <FaYoutube className="text-red-600 hover:text-red-800" size={20} />
                                            </Link>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mt-team-sec">
                    <Container>
                        <h3>Takım</h3>
                        {loading ? (
                            <p>Yükleniyor...</p>
                        ) : (
                            <Grid container spacing={3}>
                                {Object.keys(sortedMembers).map((level) => (
                                    sortedMembers[level].map((member, index) => (
                                        <Grid item xs={12} sm={6} md={4} key={index}>
                                            <Box className="our-team">
                                                <Image
                                                    src={'https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul' + member.image.replace('/media', '')}
                                                    alt={member.full_name}
                                                    width={300}
                                                    height={300}
                                                    className="img-fluid" // Makes the image responsive
                                                />
                                                <div className="team-content">
                                                    <h3 className="title">{member.full_name}</h3>
                                                    <span className="post">{member.position}</span>
                                                </div>
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
                                                                <FaYoutube size={35} />
                                                                </Link>
                                                            )}
                                                            {platform === 'twitter' && (
                                                                <Link href={link || "/"} target="_blank" rel="noopener noreferrer">
                                                                    <FaInstagram  size={35}/>
                                                                </Link>
                                                            )}
                                                            
                                                            {platform === 'youtube' && (
                                                                <Link href={link || "/"} target="_blank" rel="noopener noreferrer">
                                                                    <FaYoutube size={35} />
                                                                </Link>
                                                            )}
                                                            {platform === 'linkedin' && (
                                                                <Link href={link || "/"} target="_blank" rel="noopener noreferrer">
                                                                    <FaLinkedin   size={35}/>
                                                                </Link>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div className="icon fa fa-plus"></div>
                                            </Box>
                                        </Grid>
                                    ))
                                ))}
                            </Grid>
                        )}
                    </Container>
                </section>

            </main>
        </>
    );
};

export default About;
