"use client";

import React, { useEffect, useState } from "react";
import { fetchHomeMainBanner } from "@/lib/main_api";
import SwiperMainSlider from "./components/home/main_banner";
import VirtualSwiperBrand from "./components/home/brand";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const Page = () => {
  const [banners, setBanners] = useState([]);

  // Banner verilerini yükleme işlemi
  useEffect(() => {
    const loadBanners = async () => {
      try {
        const bannerResult = await fetchHomeMainBanner();
        if (bannerResult && bannerResult.status) {
          setBanners(bannerResult.data); // Banner verilerini state'e yükleme
        } else {
          console.error("Banner verisi alınamadı.");
        }
      } catch (error) {
        console.error("Bannerları yüklerken bir hata oluştu:", error);
      }
    };
    loadBanners();
  }, []);

  return (
    <main id="mt-main">
      <React.Fragment>
        <Container maxWidth="xl">
          {/* Ana sayfa içeriği */}
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={4}>
              {/* Ana banner slider */}
              <Grid item xs={12}>
                <Box sx={{ mb: 4 }}>
                  <SwiperMainSlider banners={banners} /> 
                </Box>
              </Grid>

              {/* Markalar Slider */}
              <Grid item xs={12}>
               
                  <VirtualSwiperBrand />
              
              </Grid>

             
            </Grid>
          </Box>
        </Container>
      </React.Fragment>
    </main>
  );
};

export default Page;
