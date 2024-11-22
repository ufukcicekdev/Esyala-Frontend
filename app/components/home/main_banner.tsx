import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';
import axios from 'axios';

import 'swiper/css';
import 'swiper/css/pagination';


interface Banner {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  text_color: string;
  description: string;
  title_position: string;
  link: string;
  is_active: boolean;
}


// API veri çekme fonksiyonu
export async function fetchHomeMainBanner() {
  try {
    const response = await axios.get("https://esyala-backend-production.up.railway.app/main/get_home_main_banner/");
    if (response.data["status"] === true) {
      return response.data["data"];
    } else {
      return []; // Hata durumunda boş array döndürüyoruz
    }
  } catch (error) {
    console.error("Bannerlar alınırken bir hata oluştu:", error);
    return []; // Hata durumunda boş array döndürüyoruz
  }
}

export default function SwiperMainSlider() {
  const [banners, setBanners] = useState<Banner[] | null>(null);

  // useEffect ile veri çekme
  useEffect(() => {
    const getBanners = async () => {
      const bannerData = await fetchHomeMainBanner();
      setBanners(bannerData);
    };
    getBanners();
  }, []);

  return (
    <Box sx={{ width: '80%', margin: 'auto', mt: 1 }}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {banners && banners.map((banner) => (
          banner.is_active && (
            <SwiperSlide key={banner.id}>
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: '200px', md: '600px' },
                  overflow: 'hidden',
                  width: '100%',
                  margin: 'auto',
               
                }}
              >
                <Image
                  src={'https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul' + banner.image.replace('/media', '')} 
                  alt={banner.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
                
                {/* Text Wrap Div */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '20%', // Yükseklik olarak ortalanacak
                    zIndex: 10,
                    color: banner.text_color,
                    width: '100%',  // %100 genişlik verilerek metnin yayılmasını sağlarız
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',  // Metni ortalamak için
                  }}
                >
                 <div className="txt-wrap centerize">
                    {/* Başlık Linki */}
                    <a href={banner.link} title="Alışverişe Başla" tabIndex={0}>
                      <Typography
                        variant="h4"
                        sx={{
                          color: banner.text_color,
                          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, // Farklı ekran boyutları için font boyutu
                          fontWeight: 'bold',
                          lineHeight: '1.2',
                        }}
                      >
                        {banner.title}
                      </Typography>
                    </a>

                    {/* Alt Başlık Linki */}
                    <a href={banner.link} title="Alışverişe Başla" tabIndex={0}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: banner.text_color,
                          fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' }, // Alt başlık için font boyutu
                          marginTop: '8px',
                          fontWeight: 'normal',
                          lineHeight: '1.4',
                        }}
                      >
                        {banner.subtitle}
                      </Typography>
                    </a>

                    {/* Ekstra Metin */}
                    {banner.description && (
                      <Box sx={{ mt: 2 }}>
                        <Typography
                          variant="body1"
                          sx={{
                            color: banner.text_color,
                            fontSize: { xs: '0.875rem', sm: '1rem' }, // Ekstra metin için font boyutu
                            lineHeight: '1.6',
                          }}
                        >
                          {banner.description}
                        </Typography>
                      </Box>
                    )}
                  </div>
                </Box>
              </Box>
            </SwiperSlide>
          )
        ))}
      </Swiper>
    </Box>
  );
}
