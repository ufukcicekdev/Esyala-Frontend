"use client";
import React, { useState } from 'react';
import { useAlert } from '../context/AlertContext';
import Link from 'next/link';

const Contact = () => {
  const showAlert = useAlert();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Telefon numarasını formatlamak için bir fonksiyon
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {  // Türü belirledik
    let value = e.target.value.replace(/\D/g, ''); // Sadece rakamları al

    if (value.length > 10) {
      value = value.substring(0, 10); // 10 rakamdan fazlasını al
    }

    let formattedValue = '';
    if (value.length > 0) {
      formattedValue += '(' + value.substring(0, 3); // İlk 3 rakamı parantez içine al
    }
    if (value.length > 3) {
      formattedValue += ') ' + value.substring(3, 6); // Sonraki 3 rakamı ekle
    }
    if (value.length > 6) {
      formattedValue += ' ' + value.substring(6, 10); // Son 4 rakamı ekle
    }

    setFormData((prevData) => ({
      ...prevData,
      phone: formattedValue
    }));
  };

  // Form elemanlarındaki değişiklikleri yönetme
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { // Türü belirledik
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Formu gönderme
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // Türü belirledik
    e.preventDefault();
    setIsSubmitting(true); // Form gönderimi başladığında

    const cleanedPhone = formData.phone.replace(/\D/g, ''); 
    const data = {
      full_name: formData.fullName, // full_name alanı
      email: formData.email, // email alanı
      phone: cleanedPhone, // phone alanı
      subject: formData.subject, // subject alanı
      message: formData.message // message alanı
    };

    try {
      const response = await fetch('https://esyala-backend-production.up.railway.app/main/create_contact_us/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.status === true) {
        showAlert('success', 'Mesajınız başarıyla gönderildi.');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        showAlert('error', result.messages || 'Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch {
      showAlert('error', 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false); 
    }
  };

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
              <h1>İletişim</h1>
              <nav className="breadcrumbs">
                <ul className="list-unstyled">
                  <li><Link href="/">Ana Sayfa <i className="fa fa-angle-right"></i></Link></li>
                  <li>İletişim</li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-contact-detail wow fadeInUp" data-wow-delay="0.4s">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-4 mt-paddingbottomxs text-center">
              <span className="icon"><i className="fa fa-map-marker"></i></span>
              <strong className="title">Adres</strong>
              <address>Veysel Karani, Çolakoğlu Sokağı No: 10, 34885 Rings Rezidans Kat :5 Daire :87  <br />Sancaktepe/İstanbul</address>
            </div>
            <div className="col-xs-12 col-sm-4 mt-paddingbottomxs text-center">
              <span className="icon"><i className="fa fa-phone"></i></span>
              <strong className="title">Telefon</strong>
              <Link href="tel:+908503048400" className="tel">0 850 304 84 00</Link>
            </div>
            <div className="col-xs-12 col-sm-4 mt-paddingbottomxs text-center">
              <span className="icon"><i className="fa fa-envelope-o"></i></span>
              <strong className="title">E-Mail</strong>
              <Link href="mailto:info@esyala.com">info@esyala.com</Link>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-form-sec wow fadeInUp" data-wow-delay="0.4s">
        <div className="container">
          <div className="row">
            <header className="col-xs-12 text-center header">
              <h2>Sorunuz mu var?</h2>
              <p>Aşağıdaki formu doldurarak bizimle iletişime geçebilirsiniz.</p>
            </header>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <form className="contact-form" onSubmit={handleSubmit}>
                <fieldset>
                  <input
                    type="text"
                    className="form-control"
                    name="fullName"
                    id="full_name"
                    placeholder="Adınızı ve soyadınızı girin"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="isim@örnek.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="(500) 123 1234"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    required
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    id="subject"
                    placeholder="Konu"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                  <textarea
                    className="form-control"
                    name="message"
                    id="message"
                    placeholder="Mesajınızı detaylı olarak yazabilirsiniz"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                  <button className="btn-type3" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
