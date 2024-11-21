import Link from "next/link";
import LoginForm from "../components/forms/LoginForm";


function Signin() {
    

    return (
        <main id="mt-main">
            {/* Banner Section */}
            <section
                className="mt-contact-banner style4 wow fadeInUp"
                data-wow-delay="0.4s"
                style={{
                    backgroundImage: 'url(https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/images/img43.jpg)',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "250px",
                    width: "100%",
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 text-center">
                            <h1>Giriş</h1>
                            <nav className="breadcrumbs">
                                <ul className="list-unstyled">
                                    <li>
                                        <Link href="/">Anasayfa <i className="fa fa-angle-right"></i></Link>
                                    </li>
                                    <li>Giriş</li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-about-sec" style={{ paddingBottom: 0 }}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="txt wow fadeInUp" data-wow-delay="0.4s">
                                <h2>Hesabınıza Giriş Yapın ve Alışverişe Başlayın!</h2>
                                <p>
                                    Merhaba! Esyala.com&apos;a hoş geldiniz. Hesabınıza giriş yaparak alışveriş yapmaya
                                    başlayabilirsiniz. Eğer daha önce hesap oluşturduysanız, lütfen kullanıcı adınızı veya
                                    e-posta adresinizi ve şifrenizi girerek giriş yapın.
                                </p>
                                <p>
                                    Hesabınızı oluşturmadıysanız, hemen ücretsiz bir hesap oluşturabilir ve Esyala.com&apos;un sunduğu
                                    avantajlardan yararlanmaya başlayabilirsiniz.
                                </p>
                                <p>
                                    Giriş yapmak için aşağıdaki formu doldurun ve &apos;Giriş Yap&apos; butonuna tıklayın. Eğer şifrenizi
                                    unuttuysanız, &apos;Şifremi Unuttum&apos; seçeneğiyle şifrenizi sıfırlayabilirsiniz.
                                </p>
                                <p>
                                    Eğer hala bir hesabınız yoksa, hemen kayıt olun ve Esyala.com&apos;un dünyasına adım atın. Kayıt
                                    olmak hızlı, kolay ve ücretsizdir!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="mt-detail-sec toppadding-zero">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-8 col-sm-push-2">
                            <div className="holder" style={{ margin: 0 }}>
                                <div className="mt-side-widget">
                                    <header>
                                        <h2 style={{ margin: "0 0 5px" }}>Giriş Yap</h2>
                                        <p>Tekrar hoşgeldiniz! Hesabınıza giriş yapın</p>
                                        <p>
                                            Hesabınız yok mu?{" "}
                                            <Link href="/register" className="bold-text">
                                                Kaydolun
                                            </Link>
                                        </p>
                                    </header>
                                    <LoginForm/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Signin;
