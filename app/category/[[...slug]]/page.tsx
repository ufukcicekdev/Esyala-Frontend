import ProductCategory from "@/lib/ProductCategory";
import React from "react";


export function generateStaticParams() {
  return [ { slug: [""] } ]
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;

  return <ProductCategory slug={slug} />;
}
