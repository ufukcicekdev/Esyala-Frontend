"use client";
import React, { useState, useEffect } from "react";
import { AutoDismissAlert } from "@/app/components/messages/Alert";
import Link from "next/link";
import Image from "next/image";
import Banner from "@/app/components/banner";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useProducts } from "./useProducts"; // custom hook'u import ettik
import { fetchProductCategoryList } from "./main_api";
import { CircularProgress } from "@mui/material";

interface Breadcrumb {
  name: string;
  slug: string;
}

interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  name: string;
  slug: string;
  breadcrumb: Breadcrumb[];
  subcategories: Subcategory[];
}

export default function ProductCategory({ slug }: { slug: string }) {
  const [category, setCategory] = useState<Category | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const { products, loading, error, productCount } = useProducts(slug, page, itemsPerPage);

  // Kategori verisini yalnızca ilk yüklemede al
  useEffect(() => {
    const loadCategoryData = async () => {
      try {
        const response = await fetchProductCategoryList(slug);
        if (response.status && response.data?.category) {
          setCategory(response.data.category);
        }
      } catch (err) {
        console.error("Kategori verisi alınırken hata oluştu", err);
      }
    };

    loadCategoryData();
  }, [slug]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value); // Sayfa numarasını güncelle
  };

  if (!category) {
    return <div><CircularProgress /></div>;
  }

  if (error) {
    return (
      <>
        <AutoDismissAlert severity="error" message={error} />
        <p>{error}</p>
      </>
    );
  }

  const hasProducts = products.length > 0;

  return (
    <>
      <Banner
        className="product-banner"
        backgroundImage="https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/images/img-76.jpg"
        title={category?.breadcrumb?.at(-1)?.name || "Kategori"}
        breadcrumbs={
          category?.breadcrumb?.length
            ? [
              { label: "Ana Sayfa", href: "/" },
              ...category.breadcrumb.map((crumb, index) => ({
                label: crumb.name,
                href: `/category/${category.breadcrumb
                  .slice(0, index + 1)
                  .map((c) => c.slug)
                  .join("/")}`,
              })),
            ]
            : [{ label: "Ana Sayfa", href: "/" }, { label: "Kategori", href: `/category/${slug}` }]
        }
        textColor="#ffffff"
      />

      <div className="container">
        <div className="row">
          <aside id="sidebar" className="product-sidebar col-xs-12 col-sm-4 col-md-3">
            <section className="shop-widget">
              <h2>Kategoriler</h2>
              <ul className="list-unstyled category-list">
                {/* Alt kategoriler, kategori verisi yüklendikten sonra */}
                {category?.subcategories?.map((subcategory) => (
                  <li key={subcategory.slug}>
                    <Link href={`/category/${category?.breadcrumb?.[0]?.slug}/${subcategory.slug}`}>
                      {subcategory.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={`/category/${category?.breadcrumb?.[0]?.slug}/`}>Tüm Ürünler</Link>
                </li>
              </ul>
            </section>
          </aside>

          <div className="col-xs-12 col-sm-8 col-md-9">
            <header className="mt-shoplist-header">
              <div className="mt-textbox">
                <p>
                  <strong>{productCount}</strong> sonuç
                </p>
              </div>
            </header>

            <ul className="mt-productlisthold list-inline" id="card-view">
              {loading ? (
                <p>Ürünler Yükleniyor...</p> // Yükleniyor durumu
              ) : hasProducts ? (
                products.map((product) => (
                  <li key={product.id}>
                    <div className="product-3 marginzero">
                      <div className="img">
                        <Link href={`/product/${product.slug}`}>
                          <Image
                            src={`https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul${product.first_image?.image.replace(
                              "/media",
                              ""
                            )}`}
                            alt={product.first_image?.img_alt || "Ürün görseli"}
                            title={product.first_image?.img_title || "Ürün görseli"}
                            width={300}
                            height={300}
                            priority
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
                          <Link href={`/product/${product.slug}`}>{product.name}</Link>
                        </strong>
                        <h4>{category?.name}</h4>
                        {product.selling_old_price !== "0.00" && (
                          <del className="off">
                            <i className="fa fa-try"></i>
                            <span>{product.selling_old_price}</span>
                          </del>
                        )}
                        <span className="price">
                          <i className="fa fa-try"></i>
                          <span>{product.selling_price}</span>
                        </span>
                        <p>{product.truncated_description}</p>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <p>Ürün bulunamadı</p>
              )}
            </ul>

            <Stack
              spacing={2}
              alignItems="center"
              marginTop={3}
              sx={{
                width: '100%', // Tam genişlik
                display: 'flex',
                justifyContent: 'center', // Ortalamak için
              }}
            >
              <Pagination
                count={Math.ceil(productCount / itemsPerPage)} // Sayfa sayısını hesapla
                page={page} // Mevcut sayfa (kontrollü mod)
                onChange={handlePageChange} // Sayfa değiştirme fonksiyonu
                color="primary" // Renk
                siblingCount={0} // Yakın sayfaları gösterme
                sx={{
                  width: '100%', // Genişlik tamamen sayfa
                  maxWidth: 600, // Max genişlik sınırlaması (isteğe bağlı)
                }}
              />
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
}
