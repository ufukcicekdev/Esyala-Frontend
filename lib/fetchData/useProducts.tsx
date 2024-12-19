import { useState, useEffect } from "react";
import { fetchCategoryProduct } from "../mainApi/main_api";

interface Product {
  id: number;
  name: string;
  slug: string;
  first_image?: {
    image: string;
    img_alt: string;
    img_title: string;
  };
  discount_percentage: number;
  selling_price: string;
  selling_old_price: string;
  truncated_description: string;
}

export function useProducts(slug: string, page: number, itemsPerPage: number) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const productData = await fetchCategoryProduct(slug, page, itemsPerPage);
        const { product, product_count } = productData.data;
        setProducts(product || []);
        setProductCount(product_count || 0);
      } catch (err) {
        setError((err as Error).message || "Bir hata oluştu. Lütfen tekrar deneyin.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [slug, page]);

  return { products, loading, error, productCount };
}
