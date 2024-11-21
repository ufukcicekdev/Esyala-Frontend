"use client";
import React from "react";
import SwiperMainSlider from "./components/home/main_banner";
import VirtualSwiperBrand from "./components/home/brand";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const Page = () => {
  

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
                  <SwiperMainSlider/> 
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
