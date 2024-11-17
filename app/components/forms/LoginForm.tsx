"use client";
import handleLogin from "@/lib/customerauth_api";
import React, { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });


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

      console.log("Giriş başarılı:", data);
      window.location.href = "/";
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  return (
    <>
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
          <button className="btn btn-outline btn-success sm:btn-sm md:btn-md lg:btn-lg">Giriş Yap</button>

        </fieldset>
      </form>
    </>
  )
}