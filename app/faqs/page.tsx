
"use client";
import React from 'react'
import ScrollableTabsButtonAuto from '../components/faqs'


export default function page() {
    return (
        <main id="mt-main">

            <section className="mt-contact-banner style4 wow fadeInUp" data-wow-delay="0.4s" style={{
                backgroundImage: 'url(https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/images/img43.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '250px',
                width: '100%',
            }}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 text-center">
                            <h1>SSS</h1>
                            <nav className="breadcrumbs">
                                <ul className="list-unstyled">
                                    <li><a href="{% url 'main:home' %}">Ana Sayfa <i className="fa fa-angle-right"></i></a></li>
                                    <li>SSS</li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-about-sec pb-0">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="txt wow fadeInUp" data-wow-delay="0.4s">
                                <h2>SSS</h2>
                                <p><strong>Hoş Geldiniz!</strong></p>
                                <p>Esyala.com&apos;a hoş geldiniz! Sıkça Sorulan Sorular (SSS) sayfamızda, platformumuzu ve sunduğumuz hizmetleri daha iyi anlamanıza yardımcı olmak için bir dizi yaygın soruyu yanıtladık.</p>
                                <p>Eğer sorularınızın cevaplarını burada bulamazsanız, lütfen bizimle iletişime geçmekten çekinmeyin. Müşteri destek ekibimiz size yardımcı olmaktan mutluluk duyacaktır.</p>
                                <p><strong>Unutmayın, sizin memnuniyetiniz bizim önceliğimizdir!</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container faq-section mt-about-sec">
                <div className="row txt">
                    <div className="col-xs-12" data-wow-delay="0.4s">
                        <ScrollableTabsButtonAuto/>
                    </div>
                    
                </div>
            </div>


        </main>
    )
}


