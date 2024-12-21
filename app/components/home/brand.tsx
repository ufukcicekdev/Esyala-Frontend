import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Virtual } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { fetchBrands } from '@/lib/mainApi/main_api';

interface Brand {
    id: number;
    name: string;
    image: string;
    img_alt: string;
    img_title: string;
}


// API veri çekme fonksiyonu (Brand API'si için)
export async function fetchBrandData() {
    try {
        const response = await fetchBrands()
        if (response.status === true) {
            return response.data;
        }
    } catch (error) {
        console.error("Brand verileri alınırken bir hata oluştu:", error);
        return []; // Hata durumunda boş array döndürüyoruz
    }
}

export default function VirtualSwiperBrand() {
    const [brands, setBrands] = useState<Brand[] | null>(null);
    

    // useEffect ile veri çekme
    useEffect(() => {
        const getBrands = async () => {
            const brandData = await fetchBrandData();
            setBrands(brandData);
        };
        getBrands();
    }, []);

    return (
        <div className="" style={{ marginTop: '10px' }}>
            <Typography
                        variant="h2"
                        sx={{
                            fontSize: {
                                xs: "24px", // Küçük ekranlar (mobil)
                                sm: "32px", // Orta ekranlar (tablet)
                                md: "40px", // Büyük ekranlar
                                lg: "44px", // Çok büyük ekranlar
                            },
                            lineHeight: {
                                xs: "28px",
                                sm: "36px",
                                md: "42px",
                                lg: "46px",
                            },
                            fontWeight: 700,
                            marginBottom: "15px",
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                            color: "#383838",
                        }}
                    >
                        Markalar
                    </Typography>
            <div className="patner-slider">
                <Box sx={{ width: '80%', margin: 'auto', mt: 2 }}>
                    <Swiper
                        modules={[Autoplay, Pagination, Virtual]} // Autoplay ve Pagination da eklenebilir
                        slidesPerView={3}
                        centeredSlides={true}
                        spaceBetween={30}
                        pagination={{
                            clickable: true, // Pagination tıklanabilir yapıldı
                        }}
                        autoplay={{
                            delay: 2500, // Otomatik geçiş süresi
                            disableOnInteraction: false,
                        }}
                        virtual
                    >
                        {brands && brands.map((brand, index) => (
                            <SwiperSlide key={brand.id} virtualIndex={index}>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        height: { xs: '150px', sm: '200px', md: '300px' }, // Dinamik yükseklik ayarı
                                        width: '100%', // Genişlik %100
                                        overflow: 'hidden', // Taşan kısımların gizlenmesi
                                        borderRadius: '10px', // Yuvarlatılmış köşeler
                                    }}
                                >
                                    <Image
                                        src={'https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul' + brand.image.replace('/media', '')}
                                        alt={brand.name}
                                        fill
                                        style={{
                                            objectFit: 'contain', // Resmin tamamının görünmesi sağlanır
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        priority
                                    />
                                </Box>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
            </div>
        </div>
    );
}
