import React, { useEffect, useState } from 'react';
import { getHomepageBestSellerProduct, getHomepageFeaturedProduct, getHomepageLatestProducts } from '@/lib/mainApi/main_api';
import ProductSlider from '../sliderComponents/sliderComp';
const HomePageProductSlider = () => {
    const [bestSellerProducts, setBestSellerProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [latestProducts, setLatestProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBestSellerProducts = async () => {
            const result = await getHomepageBestSellerProduct();
            setBestSellerProducts(result.data);
            setLoading(false);
        };

        const fetchFeaturedProduct = async () => {
            const result = await getHomepageFeaturedProduct();
            setFeaturedProducts(result.data);
            setLoading(false);
        };

        const fetchLatestProduct = async () => {
            const result = await getHomepageLatestProducts();
            setLatestProducts(result.data);
            setLoading(false);
        };

        fetchBestSellerProducts();
        fetchFeaturedProduct();
        fetchLatestProduct();
    }, []);

    return (
        <div>
            <ProductSlider
                title="Çok Satanlar"
                products={bestSellerProducts}
                loading={loading}
                hasProducts={bestSellerProducts.length > 0}
            />
            <ProductSlider
                title="Öne Çıkanlar"
                products={featuredProducts}
                loading={loading}
                hasProducts={featuredProducts.length > 0}
            />
            <ProductSlider
                title="Yeni Ürünler"
                products={latestProducts}
                loading={loading}
                hasProducts={latestProducts.length > 0}
            />
        </div>
    );
};

export default HomePageProductSlider;
