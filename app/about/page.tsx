"use client";
import React, { useEffect, useState } from "react";
import SocialMedia from "../components/socialMedia";
import { fetchAbout } from "@/lib/main_api";

const About = () => {
    const [teamData, setTeamData] = useState([]);
    const [sortedMembers, setSortedMembers] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeamData = async () => {
            const response = await fetchAbout();
            if (response?.data) {
                const teamMembers = response.data;
                
                // Üyeleri level'a göre grupla
                const membersByLevel = teamMembers.reduce((acc, member) => {
                    if (!acc[member.level]) {
                        acc[member.level] = [];
                    }
                    acc[member.level].push(member);
                    return acc;
                }, {});

                setTeamData(teamMembers);
                setSortedMembers(membersByLevel);
            }
            setLoading(false);
        };
        fetchTeamData();
    }, []);

    return (
        <main id="mt-main">
            <section className="mt-contact-banner style4 wow fadeInUp" data-wow-delay="0.4s" style={{ backgroundImage: "url(https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/images/img43.jpg)", backgroundSize: "cover", backgroundPosition: "center", height: "250px", width: "100%" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 text-center">
                            <h1>Hakkımızda</h1>
                            <nav className="breadcrumbs">
                                <ul className="list-unstyled">
                                    <li><a href="/">Ana Sayfa <i className="fa fa-angle-right"></i></a></li>
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
                                <SocialMedia />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-team-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h3>Takım</h3>
                            {loading ? (
                                <p>Yükleniyor...</p>
                            ) : (
                                <div className="row level-holder">
                                    {Object.keys(sortedMembers).map((level) => (
                                        <div key={level} className="level-group">
                                            <div className="row">
                                                {sortedMembers[level].map((member, index) => (
                                                    <div key={index} className="col-md-3 col-sm-6 col-xs-12 wow fadeInUp" data-wow-delay="0.8s">
                                                        <div className="img-holder">
                                                            <a href="javascript:void(0)">
                                                                <img src={'https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul' + member.image.replace('/media', '')} alt={member.full_name} />
                                                                {member.social_media_links && (
                                                                    <ul className="list-unstyled social-icon">
                                                                        {Object.entries(member.social_media_links).map(([platform, link]) => (
                                                                            <li key={platform} data-link={link}>
                                                                                <a href={link} target="_blank" rel="noopener noreferrer">
                                                                                    <i className={`fa fa-${platform}`}></i>
                                                                                </a>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                )}
                                                            </a>
                                                        </div>
                                                        <div className="mt-txt">
                                                            <h4><a href="#">{member.full_name}</a></h4>
                                                            <span className="sub-title">{member.position}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default About;
