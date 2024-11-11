"use client";
import handleLogin from "@/lib/customerauth_api";
import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import Link from "next/link";

function Signin() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { login, logout } = useUser() || {};

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Formun varsayılan davranışını engeller
        try {
            const data = await handleLogin(formData.email, formData.password);
            setSuccessMessage("Giriş başarılı!"); // Başarılı mesajı
            setErrorMessage(""); // Hataları temizle
            console.log("Giriş başarılı:", data);
            window.location.href = "/";
        } catch (error) {
            setErrorMessage("Giriş başarısız! Lütfen bilgilerinizi kontrol edin."); // Hata mesajı
            console.error("Hata:", error);
        }
    };

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
                                        <a href="/">Anasayfa <i className="fa fa-angle-right"></i></a>
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
                                    Merhaba! Esyala.com'a hoş geldiniz. Hesabınıza giriş yaparak alışveriş yapmaya
                                    başlayabilirsiniz. Eğer daha önce hesap oluşturduysanız, lütfen kullanıcı adınızı veya
                                    e-posta adresinizi ve şifrenizi girerek giriş yapın.
                                </p>
                                <p>
                                    Hesabınızı oluşturmadıysanız, hemen ücretsiz bir hesap oluşturabilir ve Esyala.com'un sunduğu
                                    avantajlardan yararlanmaya başlayabilirsiniz.
                                </p>
                                <p>
                                    Giriş yapmak için aşağıdaki formu doldurun ve "Giriş Yap" butonuna tıklayın. Eğer şifrenizi
                                    unuttuysanız, "Şifremi Unuttum" seçeneğiyle şifrenizi sıfırlayabilirsiniz.
                                </p>
                                <p>
                                    Eğer hala bir hesabınız yoksa, hemen kayıt olun ve Esyala.com'un dünyasına adım atın. Kayıt
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
                                    <form onSubmit={handleSubmit}>
                                        <fieldset>
                                            <input
                                                type="email"
                                                className="input"
                                                required
                                                name="email"
                                                placeholder="Mail Adresiniz"
                                                value={formData.email}
                                                onChange={handleChange}
                                                style={{ width: "100%" }}
                                            />
                                            <input
                                                className="input"
                                                required
                                                type="password"
                                                name="password"
                                                placeholder="Şifreniz *"
                                                value={formData.password}
                                                onChange={handleChange}
                                                style={{ width: "100%" }}
                                            />
                                            <div className="box">
                                                <Link href="/password-change" className="help">
                                                    Şifremi Unuttum!
                                                </Link>
                                            </div>
                                            <button type="submit" className="btn-type1">
                                                Giriş Yap
                                            </button>
                                        </fieldset>
                                    </form>
                                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                                    {successMessage && <p className="success-message">{successMessage}</p>}
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
