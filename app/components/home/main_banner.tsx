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
      return [];
    }
  } catch (error) {
    console.error("Bannerlar alınırken bir hata oluştu:", error);
    return [];
  }
}

export default function SwiperMainSlider() {
  const [banners, setBanners] = useState<Banner[] | null>(null);

  useEffect(() => {
    const getBanners = async () => {
      const bannerData = await fetchHomeMainBanner();
      setBanners(bannerData);
    };
    getBanners();
  }, []);

  return (
    <Box sx={{ width: '100%', margin: 'auto', mt: 0 }}>
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
        {banners &&
          banners.map(
            (banner) =>
              banner.is_active && (
                <SwiperSlide key={banner.id}>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '2.5', // 1050/420 oranı (2.5:1)
                      overflow: 'hidden',
                      margin: 'auto',
                    }}
                  >
                    <Image
                      src={
                        'https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul' +
                        banner.image.replace('/media', '')
                      }
                      alt={banner.title}
                      fill
                      style={{
                        objectFit: 'cover',
                      }}
                      priority
                    />

                    <Box
                      sx={{
                        position: 'absolute',
                        top: '20%',
                        zIndex: 10,
                        color: banner.text_color,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}
                    >
                      <div className="txt-wrap centerize">
                        <a href={banner.link} title="Alışverişe Başla" tabIndex={0}>
                          <Typography
                            variant="h4"
                            sx={{
                              color: banner.text_color,
                              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                              fontWeight: 'bold',
                              lineHeight: '1.2',
                            }}
                          >
                            {banner.title}
                          </Typography>
                        </a>
                        <a href={banner.link} title="Alışverişe Başla" tabIndex={0}>
                          <Typography
                            variant="h6"
                            sx={{
                              color: banner.text_color,
                              fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
                              marginTop: '8px',
                              fontWeight: 'normal',
                              lineHeight: '1.4',
                            }}
                          >
                            {banner.subtitle}
                          </Typography>
                        </a>
                        {banner.description && (
                          <Box sx={{ mt: 2 }}>
                            <Typography
                              variant="body1"
                              sx={{
                                color: banner.text_color,
                                fontSize: { xs: '0.875rem', sm: '1rem' },
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
          )}
      </Swiper>
    </Box>
  );
}
