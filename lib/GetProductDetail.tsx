"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Slider from "react-slick";
import { Container, Grid, Box, Typography, CircularProgress } from "@mui/material";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import BreadcrumbsComponent from "@/app/components/breadcrumbsComponent";
import Link from "next/link";

// Axios instance
const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});


// Define types
interface ProductImage {
    image: string;
    img_alt: string;
    img_title: string;
}

interface Category {
    name: string;
    slug: string;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    images: ProductImage[];
    selling_price: string;
    selling_old_price: string;
    purchase_price: string;
    in_stock: number;
    category_breadcrumb: {
        main_category: Category;
        sub_categories: Category[];
    };
}



export default function ProductDetail({ slug }: { slug: string }) {
    
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await instance.get(`/products/api/products/${slug}/`);
                setProduct(response.data);
                if (response.data.category_breadcrumb.sub_categories.length > 0) {
                    setSelectedSubCategory(response.data.category_breadcrumb.sub_categories[0].slug);
                }
            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchProductDetails();
    }, [slug]);

    useEffect(() => {
        if (product?.images?.length) {
            Fancybox.bind('[data-fancybox="gallery"]');
        }
    }, [product]);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSubCategoryChange = (slug: string) => {
        setSelectedSubCategory(slug);
        handleMenuClose();
    };

    if (loading) {
        return <div><CircularProgress /></div>;
    }

    if (!product) {
        return <div>Product not found.</div>;
    }

    return (
        <Container>
            <Box >
                {/* Breadcrumbs */}
                <BreadcrumbsComponent
                    product={product}
                    selectedSubCategory={selectedSubCategory}
                    handleMenuClick={handleMenuClick}
                    handleMenuClose={handleMenuClose}
                    handleSubCategoryChange={handleSubCategoryChange}
                    anchorEl={anchorEl} // Pass anchorEl as prop
                />
            
                <Grid container spacing={4}>
                    {/* Left Section - Product Images Slider */}
                    <Grid item xs={12} md={6}>
                        <Slider>
                            {product.images.map((image, index) => (
                                <div key={index}>
                                    <Link
                                        href={image.image}
                                        data-fancybox="gallery"
                                        data-caption={image.img_alt}
                                    >
                                        <Image
                                            src={image.image}
                                            alt={image.img_alt}
                                            title={image.img_title}
                                            width={500}
                                            height={500}
                                        />
                                    </Link>
                                </div>
                            ))}
                        </Slider>
                    </Grid>

                    {/* Right Section - Product Details */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4">{product.name}</Typography>

                        {/* Price Section */}
                        <PriceSection product={product} />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

// Price Section Component
const PriceSection = ({ product }: { product: Product }) => (
    <Box my={3}>
        <Typography variant="h5">Price</Typography>
        <Box>
            <span className="price">{product.selling_price}</span>
            {product.selling_old_price && (
                <del>
                    <span className="old-price">{product.selling_old_price}</span>
                </del>
            )}
        </Box>
    </Box>
);

