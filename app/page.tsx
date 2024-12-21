"use client";
import React from "react";
import SwiperMainSlider from "./components/home/main_banner";
import VirtualSwiperBrand from "./components/home/brand";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import HomePageProductSlider from "./components/home/best_seller_products";


const Page = () => {


  return (
    <>
      {/* Ana sayfa içeriği */}
      <Box sx={{ mt: 1 }}>
        <Grid container spacing={4}>
          {/* Ana banner slider */}
          <Grid item xs={12}>
            <SwiperMainSlider />
          </Grid>

          <Grid item xs={12}>
            <HomePageProductSlider />
          </Grid>

          {/* Markalar Slider */}
          <Grid item xs={12}>

            <VirtualSwiperBrand />

          </Grid>


        </Grid>
      </Box>
    </>


  );
};

export default Page;
