import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Virtual } from 'swiper/modules';
import Image from 'next/image';
import axios from 'axios';

import 'swiper/css';
import 'swiper/css/pagination';

// API veri çekme fonksiyonu (Brand API'si için)
export async function fetchBrandData() {
    try {
        const response = await axios.get('http://127.0.0.1:8000/main/get_brand/');
        if (response.data["status"] === true) {
            return response.data["data"];
        } else {
            return []; // Hata durumunda boş array döndürüyoruz
        }
    } catch (error) {
        console.error("Brand verileri alınırken bir hata oluştu:", error);
        return []; // Hata durumunda boş array döndürüyoruz
    }
}

export default function VirtualSwiperBrand() {
    const [brands, setBrands] = useState<any[]>([]);

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
            <h2
                className=""
                style={{
                    textAlign: 'center',
                    margin: '0 0 7px',
                    fontSize: '26px',
                    lineHeight: '30px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    fontFamily: 'Montserrat, sans-serif',
                    color: '#3a3a3a'
                }}
                >
                Markalar
                </h2>
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
                        {brands.map((brand, index) => (
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
