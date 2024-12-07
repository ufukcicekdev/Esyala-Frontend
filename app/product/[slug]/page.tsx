import ProductDetail from "@/lib/GetProductDetail";

import React from "react";

const prodUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function generateStaticParams() {

    const response = await fetch(`${prodUrl}/products/api/productsList/`);
  
    const products = await response.json();
    
    return products.map((product: { slug: string }) => ({
      slug: product.slug,
    }));
  }


export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
  
    return <ProductDetail slug={slug} />;
  }


