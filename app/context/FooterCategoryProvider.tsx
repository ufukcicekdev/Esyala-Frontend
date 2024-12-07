"use client";
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { fetchFooterCategory } from '@/lib/main_api';

interface FooterCategory {
  name: string;
  slug: string;
}

interface FooterCategoryContextType {
  footerCategoryList: FooterCategory[] | null;
  loading: boolean;
}

const FooterCategoryContext = createContext<FooterCategoryContextType | undefined>(undefined);

export const FooterCategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [footerCategoryList, setFooterCategoryList] = useState<FooterCategory[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadFooterCategory = async () => {
      try {
        const footerCategoryResult = await fetchFooterCategory();
        if (footerCategoryResult && footerCategoryResult.status) {
          setFooterCategoryList(footerCategoryResult.data);
        } else {
          console.error("Footer verisi alınamadı.");
        }
      } catch (error) {
        console.error("Footer verisini yüklerken bir hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };
    loadFooterCategory();
  }, []);

  return (
    <FooterCategoryContext.Provider value={{ footerCategoryList, loading }}>
      {children}
    </FooterCategoryContext.Provider>
  );
};

export const useFooterCategory = (): FooterCategoryContextType => {
  const context = useContext(FooterCategoryContext);
  if (context === undefined) {
    throw new Error(
      "useFooterCategory hook'u FooterCategoryProvider içinde kullanılmalıdır."
    );
  }
  return context;
};
