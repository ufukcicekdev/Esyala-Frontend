"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { AutoDismissAlert } from "@/app/components/messages/Alert";
import Link from "next/link";
import Banner from "@/app/components/banner";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { fetchProductCategoryList } from "../mainApi/main_api";
import { useProducts } from "./useProducts"; // custom hook'u import ettik
import {
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  FormControlLabel,
  Checkbox,
  DialogActions,
  IconButton,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';

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

  const [filters, setFilters] = useState<{
    is_rent: boolean | null;  // 'boolean' veya 'null' olabileceğini belirtiriz
    price_order: string;
  }>({
    is_rent: null,  // Başlangıçta 'null' olarak ayarlanır
    price_order: "",
  });

  const [openFilterDialog, setOpenFilterDialog] = useState(false);



  const handleRentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      is_rent: e.target.checked,  
    }));
  };

  const handleFilterDialogOpen = () => {
    setOpenFilterDialog(true);
  };

  const handleFilterDialogClose = () => {
    setOpenFilterDialog(false);
  };

  const handleApplyFilters = () => {
    setPage(1);
      setFilters({
        is_rent: filters.is_rent,
        price_order: filters.price_order,
      });
  };

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

  // useProducts kullanımı, filters ve page değiştikçe yeniden tetiklenmesini sağlıyoruz.
  const { products, loading, error, productCount } = useProducts(
    slug,
    page,
    itemsPerPage,
    filters // Filtre parametrelerini buraya gönderiyoruz
  );

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (!category) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: '100vh' }}>
        <CircularProgress />
      </div>
    );
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
                    <Link href={`/category/${category.breadcrumb[0].slug}/${subcategory.slug}`}>
                      {subcategory.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={`/category/${category.breadcrumb[0].slug}/`}>Tüm Ürünler</Link>
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
                <Button
                  onClick={handleFilterDialogOpen}
                  variant="outlined"
                  color="primary"
                  startIcon={<FilterAltIcon />}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 'bold',
                    padding: '8px 16px',
                  }}
                >
                  Filtrele
                </Button>
              </div>

              <Dialog
                open={openFilterDialog}
                onClose={handleFilterDialogClose}
                fullWidth
                maxWidth="sm"
                sx={{
                  '@media (max-width: 600px)': {
                    maxWidth: '90%',  // Small screens, take more width
                  },
                }}
              >
                <DialogTitle>
                  Filtreler
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleFilterDialogClose}
                    aria-label="close"
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </DialogTitle>
                <DialogContent>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filters.is_rent || false}
                        onChange={handleRentChange}
                        color="primary"
                      />
                    }
                    label="Kiralık Ürünler"
                  />
                  <TextField
                    select
                    label="Fiyat Sıralama"
                    value={filters.price_order}
                    onChange={(e) => setFilters({ ...filters, price_order: e.target.value })}
                    fullWidth
                    variant="outlined"
                  >
                    <MenuItem value="">Seçiniz</MenuItem>
                    <MenuItem value="asc">Fiyatı Artan</MenuItem>
                    <MenuItem value="desc">Fiyatı Azalan</MenuItem>
                  </TextField>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleFilterDialogClose} color="secondary">
                    Kapat
                  </Button>
                </DialogActions>
              </Dialog>
            </header>

            <div>
              {loading ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: '50vh' }}>
                  <CircularProgress />
                </div>
              ) : hasProducts ? (
                <Grid container spacing={2}>
                  {products.map((product) => (
                    <Grid item xs={6} sm={6} md={4} lg={3} key={product.id}>
                      <Card
                        sx={{
                          maxWidth: 345,
                          margin: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%',
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            height: 200,
                            width: '100%',
                            objectFit: 'contain',
                          }}
                          image={product.first_image?.image}
                          alt={product.first_image?.img_alt || "Ürün görseli"}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                          >
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
                          >
                            <i className="fa fa-try"></i> {product.selling_price}
                          </Typography>
                        </CardContent>
                        <Button size="small" color="primary" href={`/product/${product.slug}`}>
                          Detaylar
                        </Button>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <AutoDismissAlert severity="info" message="Bu kategoride ürün bulunmamaktadır." />
              )}
            </div>

            {hasProducts && (
              <Stack spacing={2} sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  count={Math.ceil(productCount / itemsPerPage)}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Stack>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
