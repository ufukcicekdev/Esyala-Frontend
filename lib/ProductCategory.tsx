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
import { CircularProgress, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

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

            <div className="product-list">
  {loading ? (
    <p>Ürünler Yükleniyor...</p> // Yükleniyor durumu
  ) : hasProducts ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Card key={product.id} sx={{ maxWidth: 345, margin: 2 }}>
          <CardMedia
            component="img"
            height="200"
            image={`https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul${product.first_image?.image.replace(
              "/media",
              ""
            )}`}
            alt={product.first_image?.img_alt || "Ürün görseli"}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <Link href={`/product/${product.slug}`}>{product.name}</Link>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {category?.name}
            </Typography>
            {product.selling_old_price !== "0.00" && (
              <Typography
                variant="body2"
                color="error"
                style={{ textDecoration: "line-through", fontSize: "0.9rem", marginBottom: "5px" }}
              >
                <i className="fa fa-try"></i> {product.selling_old_price}
              </Typography>
            )}
            <Typography
              variant="h6"
              color="primary"
              sx={{
                fontWeight: "bold",
                fontSize: "1.25rem",
                marginTop: "10px",
              }}
            >
              <i className="fa fa-try"></i> {product.selling_price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.truncated_description}
            </Typography>
          </CardContent>
          <Button size="small" color="primary" href={`/product/${product.slug}`}>
            Detaylar
          </Button>
        </Card>
      ))}
    </div>
  ) : (
    <p>Ürün bulunamadı</p>
  )}
</div>


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
