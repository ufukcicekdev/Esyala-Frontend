"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchHomeMainBanner } from "@/lib/main_api";

const Page = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        const bannerResult = await fetchHomeMainBanner();
        if (bannerResult && bannerResult.status) {
          setBanners(bannerResult.data);
        } else {
          console.error("Banner verisi alınamadı.");
        }
      } catch (error) {
        console.error("Bannerları yüklerken bir hata oluştu:", error);
      }
    };
    loadBanners();
  }, []);

  return (
    <main>
      <section className="hero">
        <div className="container">
          <h1>Eşyala ile Eşyalarını Keşfet</h1>
          <p>Geniş ürün yelpazemizle eşyalarını kolayca keşfet, kirala ya da sat!</p>
          <Link href="/products" className="btn-primary">
            Ürünlere Göz At
          </Link>
        </div>
      </section>

      {/* Banner Slider */}
      <div className="mt-mainslider3">
        <div className="slider banner-slider">
          {banners.length > 0 ? (
            banners.map((banner) => (
              <div key={banner.id} className="holder">
                <img
                  className="img"
                  src={`https://esyala.com${banner.image}`}
                  alt={banner.title}
                />
                <div className={`txt-wrap ${banner.title_position}`}>
                  <a href={banner.link} title="Alışverişe Başla">
                    <strong
                      style={{ color: banner.text_color }}
                      className="title"
                    >
                      {banner.title}
                    </strong>
                  </a>
                  <a href={banner.link} title="Alışverişe Başla">
                    <h1 style={{ color: banner.text_color }}>{banner.subtitle}</h1>
                  </a>
                  <div className="txt">
                    <p style={{ color: banner.text_color }}>{banner.description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No banners available</p>
          )}
        </div>
      </div>

      <section className="featured-products">
        <div className="container">
          <h2>Öne Çıkan Ürünler</h2>
          <div className="products-list">
            {/* Ürünlerinizi burada dinamik olarak listeleyebilirsiniz */}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
