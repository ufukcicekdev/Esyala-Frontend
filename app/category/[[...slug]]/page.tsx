import ProductCategory from "@/lib/fetchData/ProductCategory";
import React from "react";



const prodUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function generateStaticParams() {
  const response = await fetch(`${prodUrl}/main/get_category/`);
  const jsonResponse = await response.json();

  if (!jsonResponse.status || !jsonResponse.data) {
      return [];
  }

  const categories = jsonResponse.data;

  // Tüm slug'ları düz bir liste olarak birleştir
  const slugs = categories.flatMap((category: any) => {
      const categorySlugs = [{ slug: [category.slug] }];

      const subCategorySlugs = category.children.map((subCategory: any) => ({
          slug: [category.slug, subCategory.slug],
      }));

      return [...categorySlugs, ...subCategorySlugs];
  });

  return slugs;
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;

  return <ProductCategory slug={slug} />;
}
