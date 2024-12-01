"use client";
import { fetchBlogCategory } from '@/lib/blog_api';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';



interface BlogCategory {
    name: string;
    slug: string;
}


function BlogCategory() {

    const [blogcategoryList, setCategoryList] = useState<BlogCategory[] | null>(null);

    useEffect(() => {

        const loadBlogCategory = async () => {
            try {
                const blogCategoryResult = await fetchBlogCategory();
                if (blogCategoryResult && blogCategoryResult.status) {
                    setCategoryList(blogCategoryResult.data);
                } else {
                    console.error("Blog kategori verisi alınamadı.");
                }
            } catch (error) {
                console.error("Blog kategorileri yüklenirken bir hata oluştu:", error);
            }
        };
        loadBlogCategory();
    }, []);


    return (
        <>
            {blogcategoryList && blogcategoryList.length > 0 ? (
                <section className="widget category-widget">
                    <h3
                        style={{
                            textDecoration: "underline",
                            textDecorationThickness: "2px",
                            textUnderlineOffset: "4px",
                            color: "#333",
                        }}
                    >
                        Kategoriler
                    </h3>
                    <ul className="list-unstyled widget-nav">
                        {blogcategoryList.map((blogcategory, index) => (
                            <li key={index}>
                                <Link href={`/blog/category/${blogcategory.slug}/`}>{blogcategory.name}</Link>
                            </li>
                        ))}
                    </ul>
                </section>
            ) : (
                <p>Kategori bulunamadı.</p>
            )}
        </>
    )
}

export default BlogCategory