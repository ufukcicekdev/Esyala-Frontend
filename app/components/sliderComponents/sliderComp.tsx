import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; // Swiper ve SwiperSlide'ı import ediyoruz
import { Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import Link from 'next/link';
import { Autoplay } from 'swiper/modules';
import 'swiper/css'; // Swiper stil dosyasını dahil et
import 'swiper/css/navigation'; // Navigasyon için stil dosyası
import 'swiper/css/pagination'; // Pagination için stil dosyasını dahil et

interface Product {
    id: number;
    name: string;
    slug: string;
    first_image: {
        image: string;
        img_alt: string;
        img_title: string;
    };
    selling_price: string;
    selling_old_price: string;
    purchase_price: string;
    in_stock: number;
    brand: {
        name: string;
    };
    supplier: null | string;
    category: {
        name: string;
        slug: string;
    };
    view_count: number;
    discount_percentage: number;
    star_list: boolean[];
    room_types: any[];
    home_types: any[];
    home_models: any[];
    space_definitions: any[];
    time_ranges: any[];
    truncated_description: string;
}

interface ProductSliderProps {
    title: string;
    products: Product[];
    loading: boolean;
    hasProducts: boolean;
}

const ProductSlider = ({ title, products, loading, hasProducts }: ProductSliderProps) => {
    return (
        <div style={{ marginTop: '40px', marginBottom: '40px' }}>
            <Typography
                variant="h2"
                sx={{
                    fontSize: {
                        xs: '24px',
                        sm: '32px',
                        md: '40px',
                        lg: '44px',
                    },
                    lineHeight: {
                        xs: '28px',
                        sm: '36px',
                        md: '42px',
                        lg: '46px',
                    },
                    fontWeight: 700,
                    marginBottom: '15px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: '#383838',
                }}
            >
                {title}
            </Typography>
            <div>
                {loading ? (
                    <p>Ürünler Yükleniyor...</p>
                ) : hasProducts ? (
                    <Swiper
                        style={{
                            marginTop: '40px',  // Yukarıdan boşluk
                            marginBottom: '40px',  // Aşağıdan boşluk
                            height: 'auto',  // Yükseklik otomatize edilsin
                        }}
                        spaceBetween={16}
                        slidesPerView={4}
                        loop={true}
                        pagination={{ clickable: true }}
                        modules={[Autoplay]}
                        autoplay={{
                            delay: 3000,
                        }}
                        breakpoints={{
                            1200: {
                                slidesPerView: 5,
                            },
                            900: {
                                slidesPerView: 3,
                            },
                            600: {
                                slidesPerView: 2,
                            },
                            0: {
                                slidesPerView: 1,
                            },
                        }}
                    >
                        {products.map((product) => (
                            <SwiperSlide key={product.id}>
                                <Card
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                        maxWidth: 250,
                                        margin: '0 auto',
                                        boxSizing: 'border-box',
                                        height: 'auto',
                                        boxShadow: 3,
                                        borderRadius: '8px',
                                        transition: 'transform 0.3s ease-in-out',
                                        marginTop: '20px', // Üstten boşluk ekler
                                        marginBottom: '20px', // Alttan boşluk ekler
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                        },
                                    }}
                                >
                                    <div style={{ position: 'relative' }}>
                                        <CardMedia
                                            component="img"
                                            sx={{
                                                height: 200,
                                                width: '100%',
                                                objectFit: 'cover',
                                                borderTopLeftRadius: '8px',
                                                borderTopRightRadius: '8px',
                                            }}
                                            image={product.first_image?.image}
                                            alt={product.first_image?.img_alt || 'Ürün görseli'}
                                            title={product.name}
                                        />
                                        {/* İndirim yüzdesi etiketi */}
                                        {product.discount_percentage > 0 && (
                                            <Typography
                                                sx={{
                                                    position: 'absolute',
                                                    top: 10,
                                                    left: 10,
                                                    backgroundColor: 'red',
                                                    color: 'white',
                                                    borderRadius: '50%',
                                                    padding: '5px 10px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 'bold',
                                                    zIndex: 2,
                                                }}
                                            >
                                                %{product.discount_percentage} İndirim
                                            </Typography>
                                        )}
                                    </div>
                                    <CardContent
                                        sx={{
                                            flexGrow: 1,
                                            padding: '16px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div"
                                            sx={{
                                                fontSize: {
                                                    xs: '1rem',
                                                    sm: '1.25rem',
                                                    md: '1.5rem',
                                                    lg: '1.75rem',
                                                },
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            <Link href={`/product/${product.slug}`} title={product.name}>{product.name}</Link>
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ fontSize: '0.875rem' }}
                                        >
                                            {product.category?.name}
                                        </Typography>
                                        {/* Eski ve yeni fiyatı yan yana yerleştirme */}
                                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                            {product.selling_old_price !== '0.00' && (
                                                <Typography
                                                    variant="body2"
                                                    color="error"
                                                    sx={{
                                                        textDecoration: 'line-through',
                                                        fontSize: '0.9rem',
                                                        marginRight: '10px',
                                                    }}
                                                >
                                                    <i className="fa fa-try"></i> {product.selling_old_price}
                                                </Typography>
                                            )}
                                            <Typography
                                                variant="h6"
                                                color="primary"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    fontSize: '1.25rem',
                                                }}
                                            >
                                                <i className="fa fa-try"></i> {product.selling_price}
                                            </Typography>
                                        </div>
                                    </CardContent>
                                    <Button
                                        size="small"
                                        color="primary"
                                        sx={{
                                            marginBottom: '10px',
                                            padding: '8px 16px',
                                            textTransform: 'capitalize',
                                            fontWeight: 'bold',
                                        }}
                                        title={product.name}
                                        href={`/product/${product.slug}`}
                                    >
                                        Detaylar
                                    </Button>
                                </Card>
                            </SwiperSlide>

                        ))}
                    </Swiper>
                ) : (
                    <p>Ürün bulunamadı</p>
                )}
            </div>
        </div>
    );
};

export default ProductSlider;
