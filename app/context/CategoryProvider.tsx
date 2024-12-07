"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchCategory } from "@/lib/main_api";

// Kategori tiplerini tanımlıyoruz
export interface Category {
  id: number;
  name: string;
  slug: string;
  children: Category[]; // Alt kategoriler
  image: string;
}

// Context verisi için tip tanımı
interface CategoryContextData {
  categories: Category[];
  error: string | null;
  loading: boolean;
}

// Kategori Context'i oluşturuyoruz
const CategoryContext = createContext<CategoryContextData | undefined>(
  undefined
);

// Kategori Sağlayıcı (Provider) bileşeni
export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
  
    if (categories.length > 0) return;

    const fetchCategories = async () => {
      setLoading(true); // Yüklenme durumunu başlat
      try {
        const response = await fetchCategory();
        if (response.status && response.data) {
          setCategories(response.data);
        } else {
          throw new Error("Veri alınamadı");
        }
      } catch (err) {
        setError("Kategoriler alınamadı");
      } finally {
        setLoading(false); 
      }
    };

    fetchCategories();
  }, [categories]); 

  return (
    <CategoryContext.Provider value={{ categories, error, loading }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Custom Hook: useCategories
export const useCategories = (): CategoryContextData => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error(
      "useCategories hook'u CategoryProvider içinde kullanılmalıdır."
    );
  }
  return context;
};
