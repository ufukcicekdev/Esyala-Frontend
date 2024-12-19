"use client";
import { fetchBlogs } from '@/lib/blogApi/blog_api';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
interface BlogList  {
    title: string;
    short_description: string;
    created_at: string;
    banner: string;
    views: number;
    slug:string;
    category?: {
        name: string;
        slug: string;
    };
}


function BlogList() {

    const [blogList, setBlogList] = useState<BlogList[] | null>(null);

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                const blogResult = await fetchBlogs();
                if (blogResult && blogResult.status) {
                    setBlogList(blogResult.data);
                } else {
                    console.error("Blog verisi alınamadı.");
                }
            } catch (error) {
                console.error("Blogları yüklerken bir hata oluştu:", error);
            }
        };
        loadBlogs();

    }, []);


    return (
        <>
            {blogList && blogList.length > 0 ? (
                blogList.map((blog, index) => (
                    <article className="blog-post style2" key={index}>
                        <div className="img-holder">
                            <Link href={`/blog/${blog.slug}/`} title={blog.title}>
                                <Image
                                    src={blog.banner}
                                    alt={blog.title}
                                    className="img-responsive"
                                    width={200}
                                    height={100}
                                    loading="lazy"
                                />
                            </Link>

                        </div>
                        <div className="blog-txt">
                            <h2><Link href={`/blog/${blog.slug}/`}>{blog.title}</Link></h2>
                            <ul className="list-unstyled blog-nav">
                                <li><i className="fa fa-clock-o"></i>{blog.created_at}</li>
                                <li> <Link href=""><i className="fa fa-list"></i> {blog.category?.name} </Link></li>
                                <li><Link href="#"><i className="fa fa-eye"></i>{blog.views}</Link></li>
                            </ul>
                            <p>{blog.short_description}</p>
                            <Link href={`/blog/${blog.slug}/`} className="btn-more">Daha Fazla Oku</Link>
                        </div>
                    </article>
                ))
            ) : (
                <p className="text-center">Yükleniyor...</p>
            )}
        </>
    )
}

export default BlogList
