// components/Footer.tsx
"use client";
import React from "react";
import Link from "next/link";
import Subscribe from './subscribe';
import Image from 'next/image';
import Uyelik from "./sozlesmeler/uyelik";
import Aydınlatma from "./sozlesmeler/aydınlatma";
import Cayma from "./sozlesmeler/cayma";
import Cerez from "./sozlesmeler/cerez";
import Kimlik from "./sozlesmeler/kimlik";
import Odeme from "./sozlesmeler/odeme";
import Mesafe from "./sozlesmeler/mesafe";
import CustomDialog from "./sozlesmeler/dialog";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { useFooterCategory } from "../context/FooterCategoryProvider";

const Footer = () => {
    
    const { footerCategoryList, loading } = useFooterCategory();


  const dialogData = {
    "Üyelik Sözleşmesi": <Uyelik />,
    "Aydınlatma Metni": <Aydınlatma />,
    "Cayma, Fesih ve İade Koşulları": <Cayma />,
    "Çerez (Cookie) Politikası": <Cerez />,
    "Kimlik ve Findeks Raporu": <Kimlik />,
    "Ödeme ve Teslimat Bilgileri": <Odeme />,
    "Mesafeli Satış Sözleşmesi": <Mesafe />
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <footer id="mt-footer" className="style7 wow fadeInUp">

            <aside className="f-promo-box dark">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-3 mt-paddingbottomsm">
                            <div className="f-widget-item">
                                <span className="widget-icon"><i className="fa fa-plane"></i></span>
                                <div className="txt-holder">
                                    <p>Hızlı,ücretsiz teslimat ve montaj</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3 mt-paddingbottomsm">
                            <div className="f-widget-item">
                                <span className="widget-icon"><i className="fa fa-check-circle"></i></span>
                                <div className="txt-holder">
                                    <p>Uygun Kiralama ve Satın Alma Seçenekleri</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3 mt-paddingbottomxs">
                            <div className="f-widget-item">
                                <span className="widget-icon"><i className="fa fa-money"></i></span>
                                <div className="txt-holder">
                                    <p>Tüm kiralamalarda düşük ön maliyetler</p>

                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                            <div className="f-widget-item">
                                <span className="widget-icon"><i className="fa fa-dollar"></i></span>
                                <div className="txt-holder">
                                    <p>Kiralanan ürünleri daha sonra satın alma esnekliği</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
            </aside>



            <div className="footer-holder bg-grey">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-4 mt-paddingbottomsm">
                            <div className="f-widget-about">
                                <div className="logo">
                                    <Link href="/" title="Eşyala"><Image
                                        src="https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/images/esyala_syh_noktal%C4%B1.png"
                                        alt="Esyala"
                                        width={300}
                                        height={100} /></Link>
                                </div>
                                <ul className="list-unstyled address-list">
                                    <li>
                                        <i className="fa fa-map-marker">

                                        </i>
                                        <address>Veysel Karani, Çolakoğlu Sokağı No: 10</address>
                                        <address>34885 Rings Rezidans Kat :5 Daire :87  Sancaktepe/İstanbul</address></li>
                                    <li><i className="fa fa-phone"></i><Link href="tel:908503048400" title="0 850 304 84 00">0 850 304 84 00</Link></li>
                                    <li><i className="fa fa-envelope-o"></i><Link href="mailto:info@esyala.com" title="info@esyala.com">info@esyala.com</Link></li>
                                </ul>
                            </div>
                        </div>
                        <nav className="col-xs-12 col-sm-8 col-md-5 mt-paddingbottomsm">
                            <div className="nav-widget-1">
                                <h3 className="f-widget-heading">Kategoriler</h3>


                                <ul className="list-unstyled f-widget-nav">
                                    {footerCategoryList && footerCategoryList.length > 0 &&
                                        footerCategoryList.map((category, index) => (
                                            <li key={index}>
                                                <Link href={`/category/${category.slug}/`} title={category.name}>
                                                    {category.name}
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>

                            <div className="nav-widget-1">
                                <h3 className="f-widget-heading">Bilgilendirme</h3>
                                <ul className="list-unstyled f-widget-nav">

                                    <li><Link href="/" title="Anasayfa">Anasayfa</Link></li>
                                    <li><Link href="/blog" title="Blog">Blog</Link></li>
                                    <li><Link href="/about" title="Hakkımızda">Hakkımızda</Link></li>
                                    <li><Link href="/contact" title="İletişim">İletişim</Link></li>
                                    <li><Link href="/how-does-it-work" title="Nasıl Çalışır">Nasıl Çalışır</Link></li>
                                    <li><Link href="/faqs" title="Sık Sorulan Sorular">SSS</Link></li>
                                    <CustomDialog dialogData={dialogData} />
                                </ul>
                            </div>
                            <div className="nav-widget-1">
                                <h3 className="f-widget-heading">Hesap</h3>
                                <ul className="list-unstyled f-widget-nav">

                                </ul>
                            </div>
                        </nav>
                        <div className="col-xs-12 col-md-3 text-right hidden-sm">
                            <div className="f-widget-newsletter">
                                <Subscribe />
                                <h4 className="f-widget-heading follow">Bizi Takip Edin</h4>
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
            </div>
            <div className="footer-area">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 text-center">
                            <p>© <Link href="/" title="Eşyala">esyala.</Link> - Her Hakkı Saklıdır</p>
                        </div>
                        <div className="col-xs-12">
                            <div className="bank-card align-center">
                                <Image
                                    src="https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/images/iyzicologolar.webp"
                                    alt="Bank Card"
                                    loading="lazy"
                                    width={300}
                                    height={200} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
  );
};

export default Footer;
