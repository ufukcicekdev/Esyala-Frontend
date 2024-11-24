// app/components/ProductCategory.tsx
"use client";

import React, { useEffect, useState } from "react";
import { fetchCategoryProduct } from "@/lib/main_api";
import { AutoDismissAlert } from "@/app/components/messages/Alert";
import Link from "next/link";
import Image from "next/image";

// Product interface tanımlandı
interface Product {
  id: number;
  name: string;
  slug: string;
  first_image?: {
    image: string;
    img_alt: string;
    img_title: string;
  };
  discount_percentage: number;
  selling_price: string;
  selling_old_price: string;
  truncated_description: string;
  category?: {
    name: string;
  };
}

export default function ProductCategory({ slug }: { slug: string }) {
  const [products, setProducts] = useState<Product[]>([]); // Dizi türü garanti edildi
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategoryProducts = async () => {
      try {
        const productData = await fetchCategoryProduct(slug); // API'den ürün verisi alındı

        // API yanıtını konsolda kontrol edin
        console.log("API Yanıtı:", productData);

        if (productData.error) {
          setError(productData.data.error); // API hatası varsa hata mesajı set edilir
        } else {
          // Ürün verisi doğru yapıda mı kontrol edilir
          if (Array.isArray(productData.data.product)) {
            setProducts(productData.data.product); // Ürün verisi dizisi set edilir
          } else {
            setError("Ürün verisi hatalı. Beklenmeyen yapı.");
          }
        }
      } catch {
        setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      } finally {
        setLoading(false); // Yükleme durumu false yapılır
      }
    };

    loadCategoryProducts(); // Veriyi yükleme fonksiyonu çağrılır
  }, [slug]); // slug değiştiğinde tekrar çalışır

  // Yükleniyor mesajı
  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  // Hata mesajı
  if (error) {
    return (
      <>
        <AutoDismissAlert severity="error" message={error} />
        <p>{error}</p>
      </>
    );
  }

  return (
    <main id="mt-main">
      <section
        className="mt-contact-banner style4 wow fadeInUp"
        data-wow-delay="0.4s"
        style={{
          backgroundImage:
            "url(https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/images/img-76.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "250px",
          width: "100%",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xs-12 text-center"></div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-md-9">
            <header className="mt-shoplist-header">
              <div className="mt-textbox">
                <p>
                  <strong>{products.length}</strong> ürün bulundu.
                </p>
              </div>
            </header>

            <ul className="mt-productlisthold list-inline" id="card-view">
              {products.map((product) => (
                <li key={product.id}>
                  <div className="product-3 marginzero">
                    <div className="img">
                      <Link href={`/products/${product.slug}`}>
                        <Image
                          src={`https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul${product.first_image?.image.replace(
                            "/media",
                            ""
                          )}`}
                          alt={product.first_image?.img_alt || "Ürün görseli"}
                          title={product.first_image?.img_title || "Ürün görseli"}
                          width={300} // Genişlik belirtin
                          height={300} // Yükseklik belirtin
                          priority // Eğer sayfa ilk yükleme sırasında bu görselin yüklenmesi gerekiyorsa
                        />
                      </Link>
                      {product.discount_percentage > 0 && (
                        <span className="caption">
                          <span className="off">{product.discount_percentage}%</span>
                          <span className="best-price">En İyi Fiyat</span>
                        </span>
                      )}
                    </div>

                    <div className="txt">
                      <strong className="title">
                        <a href={`/products/${product.slug}`}>{product.name}</a>
                      </strong>
                      <h4>{product.category?.name}</h4>
                      {product.selling_old_price !== "0.00" && (
                        <del className="off">
                          <i className="fa fa-try"></i>{" "}
                          <span>{product.selling_old_price}</span>
                        </del>
                      )}
                      <span className="price">
                        <i className="fa fa-try"></i>{" "}
                        <span>{product.selling_price}</span>
                      </span>
                      <p>{product.truncated_description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
