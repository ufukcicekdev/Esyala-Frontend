"use client";
import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Telefon numarasını formatlamak için bir fonksiyon
  const handlePhoneChange = (e) => {
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

    // State güncellemesi
    setFormData((prevData) => ({
      ...prevData,
      phone: formattedValue
    }));
  };

  // Form elemanlarındaki değişiklikleri yönetme
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Formu gönderme
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Form gönderimi başladığında

    // API'ye POST isteği gönder
    const data = {
      full_name: formData.fullName, // full_name alanı
      email: formData.email, // email alanı
      phone: formData.phone, // phone alanı
      subject: formData.subject, // subject alanı
      message: formData.message // message alanı
    };

    try {
      const response = await axios.post('/main/create_contact_us/', data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        setSubmitSuccess(true); // Başarıyla gönderildiyse
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitError('Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      setSubmitError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false); // Form gönderimi tamamlandığında
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
                  <li><a href="/">Ana Sayfa <i className="fa fa-angle-right"></i></a></li>
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
              <a href="tel:+908503048400" className="tel">0 850 304 84 00</a>
            </div>
            <div className="col-xs-12 col-sm-4 mt-paddingbottomxs text-center">
              <span className="icon"><i className="fa fa-envelope-o"></i></span>
              <strong className="title">E-Mail</strong>
              <a href="mailto:info@esyala.com">info@esyala.com</a>
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

              {submitSuccess && (
                <div className="alert alert-success">
                  Mesajınız başarıyla gönderildi.
                </div>
              )}
              {submitError && (
                <div className="alert alert-danger">
                  {submitError}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
