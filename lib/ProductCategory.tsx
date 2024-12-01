"use client";
import React, { useEffect, useState } from "react";
import { fetchCategoryProduct } from "@/lib/main_api";
import { AutoDismissAlert } from "@/app/components/messages/Alert";
import Link from "next/link";
import Image from "next/image";
import Banner from "@/app/components/banner";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

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
}

export default function ProductCategory({ slug }: { slug: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [productCount, setProductCount] = useState(0);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const loadCategoryProducts = async () => {
      setLoading(true);
      try {
        const productData = await fetchCategoryProduct(slug, page, itemsPerPage);

        if (productData.error) {
          setError(productData.error || "Bilinmeyen bir hata oluştu.");
        } else if (productData.data) {
          const { product, product_count, category } = productData.data;
          setProducts(product || []);
          setProductCount(product_count || 0);
          setCategory(category || null);
        } else {
          setError("Ürün verisi hatalı. Beklenmeyen yapı.");
        }
      } catch (err) {
        setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      } finally {
        setLoading(false);
      }
    };
    loadCategoryProducts();
  }, [slug, page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (error) {
    return (
      <>
        <AutoDismissAlert severity="error" message={error} />
        <p>{error}</p>
      </>
    );
  }

  // Ürünlerin olup olmadığını kontrol et
  const hasProducts = products.length > 0;

  return (
    <>
      <Banner
        backgroundImage="https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/images/img-76.jpg"
        title={
          category?.breadcrumb && category.breadcrumb.length > 0
            ? category.breadcrumb.at(-1)?.name
            : "Kategori"
        }
        breadcrumbs={
          category?.breadcrumb && category.breadcrumb.length > 0
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
            : [
              { label: "Ana Sayfa", href: "/" },
              { label: "Kategori", href: `/category/${slug}` },
            ]
        }
        textColor="#ffffff"
      />

      <div className="container">
        <div className="row">
          <aside id="sidebar" className="col-xs-12 col-sm-4 col-md-3">
            <section className="shop-widget">
              <h2>Kategoriler</h2>
              <ul className="list-unstyled category-list">
                {category?.subcategories?.map((subcategory) => (
                  <li key={subcategory.slug}>
                    <Link href={`/category/${category?.breadcrumb?.[0]?.slug}/${subcategory.slug}`}>
                      {subcategory.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={`/category/${category?.breadcrumb?.[0]?.slug}/`}>
                    Tüm Ürünler
                  </Link>
                </li>
              </ul>
            </section>
          </aside>

          <div className="col-xs-12 col-sm-8 col-md-9">
            <header className="mt-shoplist-header">
              <div className="mt-textbox">
                <p><strong>{productCount}</strong> sonuç</p>
              </div>
            </header>

            <ul className="mt-productlisthold list-inline" id="card-view">
              {hasProducts ? (
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

            <Stack spacing={2} alignItems="center" marginTop={3}>
              <Pagination
                count={Math.ceil(productCount / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
}
