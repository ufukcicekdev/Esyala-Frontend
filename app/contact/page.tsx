"use client";
import React, { useState } from "react";
import { useAlert } from "../context/AlertContext";
import Link from "next/link";
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import Banner from "../components/banner";

const prodUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const Contact = () => {
  const showAlert = useAlert();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneChange = (e : any) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 10) value = value.substring(0, 10);

    let formattedValue = "";
    if (value.length > 0) formattedValue += "(" + value.substring(0, 3);
    if (value.length > 3) formattedValue += ") " + value.substring(3, 6);
    if (value.length > 6) formattedValue += " " + value.substring(6, 10);

    setFormData((prevData) => ({ ...prevData, phone: formattedValue }));
  };

  const handleChange = (e : any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    setIsSubmitting(true);

    const cleanedPhone = formData.phone.replace(/\D/g, "");
    const data = {
      full_name: formData.fullName,
      email: formData.email,
      phone: cleanedPhone,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      const response = await fetch(
        `${prodUrl}/main/create_contact_us/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.ok && result.status === true) {
        showAlert("success", "Mesajınız başarıyla gönderildi.");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        showAlert("error", result.messages || "Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } catch {
      showAlert("error", "Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="lg">
      {/* Banner */}
      <Banner
        backgroundImage="https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/images/img43.jpg"
        title="İletişim"
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: "İletişim", href: "/contact" },
        ]}
      />



      {/* İletişim Detayları */}
      <Box py={4} sx={{ backgroundColor: "#f5f5f5",mt:"20px" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4} textAlign="center">
            <Box>
              <i className="fa fa-map-marker" style={{ fontSize: "2rem" }}></i>
              <Typography  variant="h4"  mb={2}>Adres</Typography>
              <Typography  variant="h5"  mb={2}>
                Veysel Karani, Çolakoğlu Sokağı No: 10, 34885 Rings Rezidans
                Kat :5 Daire :87 <br />
                Sancaktepe/İstanbul
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} textAlign="center">
            <Box>
              <i className="fa fa-phone" style={{ fontSize: "2rem" }}></i>
              <Typography  variant="h4"  mb={2}>Telefon</Typography>
              <Typography variant="h5"  mb={2}>
                <Link href="tel:+908503048400" style={{ color: "inherit" }}>
                  0 850 304 84 00
                </Link>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} textAlign="center">
            <Box>
              <i className="fa fa-envelope-o" style={{ fontSize: "2rem" }}></i>
              <Typography  variant="h4"  mb={2}>E-Mail</Typography>
              <Typography variant="h5"  mb={2}>
                <Link href="mailto:info@esyala.com" style={{ color: "inherit" }}>
                  info@esyala.com
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Form */}
      <Box py={4} sx={{ backgroundColor: '#f9f9f9', borderRadius: '8px' ,mt:"20px"  }}>
        <Typography variant="h3" textAlign="center" mb={2} sx={{ fontWeight: 'bold' }}>
          Sorunuz mu var?
        </Typography>
        <Typography textAlign="center" mb={4} sx={{ color: '#555' }}>
          Aşağıdaki formu doldurarak bizimle iletişime geçebilirsiniz.
        </Typography>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Adınız ve Soyadınız"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="E-Mail"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Telefon"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    required
                    variant="outlined"
                    sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Konu"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mesaj"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box textAlign="center">
                    <Button
                      type="submit"
                      variant="contained"
                      size="large" // Daha büyük boyut
                      sx={{
                        px: 4, // Yatay dolgu
                        py: 2, // Dikey dolgu
                        backgroundColor: '#007bff',
                        '&:hover': {
                          backgroundColor: '#0056b3', // Hover rengini değiştir
                        },
                      }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>

    </Container>
  );
};

export default Contact;
