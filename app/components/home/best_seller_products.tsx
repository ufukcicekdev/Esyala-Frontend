import React, { useEffect, useState } from 'react';
import { getHomepageBestSellerProduct, getHomepageFeaturedProduct, getHomepageLatestProducts } from '@/lib/mainApi/main_api';
import ProductSlider from '../sliderComponents/sliderComp';

const HomePageProductSlider = () => {
    const [bestSellerProducts, setBestSellerProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [latestProducts, setLatestProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDataSequentially = async () => {
            // Çok satan ürünleri getir
            const bestSellerResult = await getHomepageBestSellerProduct();
            if (bestSellerResult.status === true) {
                setBestSellerProducts(bestSellerResult.data);
            }

            // Öne çıkan ürünleri getir
            const featuredResult = await getHomepageFeaturedProduct();
            if (featuredResult.status === true) {
                setFeaturedProducts(featuredResult.data);
            }

            // Yeni ürünleri getir
            const latestResult = await getHomepageLatestProducts();
            if (latestResult.status === true) {
                setLatestProducts(latestResult.data);
            }

            // Tüm veriler yüklendiğinde loading'i false yap
            setLoading(false);
        };

        // Verileri sırayla yükleme fonksiyonunu çağır
        fetchDataSequentially();
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
