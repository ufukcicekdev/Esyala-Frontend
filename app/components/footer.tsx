import React from 'react';
import Link from "next/link";
import SocialMedia from './socialMedia';
import Subscribe from './subscribe';

const Footer = () => {
    return (
        <footer id="mt-footer" className="style7 wow fadeInUp">

            <aside className="f-promo-box dark">
                <div className="container divider">
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
            </aside>

            <div className="footer-holder bg-grey">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-4 mt-paddingbottomsm">
                            <div className="f-widget-about">
                                <div className="logo">
                                    <Link href="/" title="Eşyala"><img src="https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/images/esyala_syh_noktal%C4%B1.png" alt="Esyala" /></Link>
                                </div>
                                <ul className="list-unstyled address-list">
                                    <li>
                                        <i className="fa fa-map-marker">

                                        </i>
                                        <address>Veysel Karani, Çolakoğlu Sokağı No: 10</address>
                                        <address>34885 Rings Rezidans Kat :5 Daire :87  Sancaktepe/İstanbul</address></li>
                                    <li><i className="fa fa-phone"></i><a href="tel:908503048400" title="0 850 304 84 00">0 850 304 84 00</a></li>
                                    <li><i className="fa fa-envelope-o"></i><a href="mailto:info@esyala.com" title="info@esyala.com">info@esyala.com</a></li>
                                </ul>
                            </div>
                        </div>
                        <nav className="col-xs-12 col-sm-8 col-md-5 mt-paddingbottomsm">
                            <div className="nav-widget-1">
                                <h3 className="f-widget-heading">Kategoriler</h3>


                                <ul className="list-unstyled f-widget-nav">
                                    {/* {% for category in footer_category %}
                                <li><a href="{% url 'main:dynamic-category-product-list' category_slugs=category.slug %}" title="{{ category.name }}">{{ category.name }}</a></li>
                                    
                                {% endfor %} */}

                                </ul>
                            </div>

                            <div className="nav-widget-1">
                                <h3 className="f-widget-heading">Bilgilendirme</h3>
                                <ul className="list-unstyled f-widget-nav">

                                    <li><Link href="/" title="Blog">Anasayfa</Link></li>
                                    <li><Link href="/about" title="Blog">Hakkımızda</Link></li>
                                    <li><Link href="/contact" title="Blog">İletişim</Link></li>
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
                                <SocialMedia />
                            </div>



                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-area">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 text-center">
                            <p>© <a href="/" title="Eşyala">esyala.</a> - Her Hakkı Saklıdır</p>
                        </div>
                        <div className="col-xs-12">
                            <div className="bank-card align-center">
                                <img src="https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/images/iyzicologolar.webp" alt="Bank Card" loading="lazy" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    );
}

export default Footer;
