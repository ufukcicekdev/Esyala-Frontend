import React, { useEffect, useState } from 'react';
import { getHomepageBestSellerProduct, getHomepageFeaturedProduct, getHomepageLatestProducts } from '@/lib/mainApi/main_api';
import ProductSlider from '../sliderComponents/sliderComp';

const HomePageProductSlider = () => {
    const [bestSellerProducts, setBestSellerProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [latestProducts, setLatestProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // loading durumunu ayarlamak için her bir veri istek tamamlandığında
        const fetchBestSellerProducts = async () => {
            const result = await getHomepageBestSellerProduct();
            if (result.status === true) {
                setBestSellerProducts(result.data);
            }
            checkLoadingStatus(); // Tüm veriler yüklendiyse loading'i false yap
        };

        const fetchFeaturedProduct = async () => {
            const result = await getHomepageFeaturedProduct();
            if (result.status === true) {
                setFeaturedProducts(result.data);
            }
            checkLoadingStatus();
        };

        const fetchLatestProduct = async () => {
            const result = await getHomepageLatestProducts();
            if (result.status === true) {
                setLatestProducts(result.data);
            }
            checkLoadingStatus();
        };

        // Tüm verilerin yüklendiğini kontrol etmek için sayaç
        let loadedRequests = 0;
        const checkLoadingStatus = () => {
            loadedRequests++;
            if (loadedRequests === 3) {
                setLoading(false);  // Tüm veriler yüklendiğinde loading'i false yap
            }
        };

        // Veri çekme işlemleri
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
