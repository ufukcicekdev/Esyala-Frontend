"use client";
import { fetchBlogCategory } from '@/lib/blog_api';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

function BlogCategory() {

    const [blogcategoryList, setCategoryList] = useState([]);

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
    {blogcategoryList.length > 0 ? (
                                <section className="widget category-widget">
                                <h3>Kategoriler</h3>
                                <ul className="list-unstyled widget-nav">
                                    {blogcategoryList.map((blogcategory, index) => (
                                    <li key={index}>
                                        <a href={`/blog/category/${blogcategory.slug}/`}>{blogcategory.name}</a>
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