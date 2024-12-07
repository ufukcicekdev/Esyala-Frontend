"use client";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import { fetchCategory } from "@/lib/main_api";
import { Typography } from "@mui/material";

interface Category {
  name: string;
  slug: string;
  icon?: string; 
  image?:string// İkon alanı opsiyonel
}

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Kategorileri API'den al
  useEffect(() => {
    const getCategories = async () => {
      const response = await fetchCategory();
      setCategories(response.data);
      setLoading(false);
    };

    getCategories();
  }, []);

  if (loading) {
    return <div>Kategoriler yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Typography
                        variant="h2"
                        sx={{
                            fontSize: {
                                xs: "24px", // Küçük ekranlar (mobil)
                                sm: "32px", // Orta ekranlar (tablet)
                                md: "40px", // Büyük ekranlar
                                lg: "44px", // Çok büyük ekranlar
                            },
                            lineHeight: {
                                xs: "28px",
                                sm: "36px",
                                md: "42px",
                                lg: "46px",
                            },
                            fontWeight: 700,
                            marginBottom: "15px",
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                            color: "#383838",
                        }}
                    >
                        Kategoriler
                    </Typography>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.slug}
            name={category.name}
            slug={category.slug}
            image={category.image} 
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
