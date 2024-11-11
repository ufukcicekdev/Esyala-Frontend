"use client";
import { fetchBlogCategoryDetail } from '@/lib/blog_api';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import PopulerBlogs from '../../components/populerblogs';
import BlogCategory from '../../components/blogcategory';

function Page({ params }: { params: Promise<{ slug: string }> }) {
    const [blogList, setBlogList] = useState([]);
    const firstCategoryName = blogList[0]?.category?.name || "Kategori Bilgisi Yok";


    useEffect(() => {
        const loadBlogs = async () => {
            try {
                const { slug } = await params;
                const blogResult = await fetchBlogCategoryDetail(slug);
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
        <main id="mt-main">
            {/* Banner Bölümü */}
            <section className="mt-contact-banner style4 wow fadeInUp" data-wow-delay="0.4s" style={{
                backgroundImage: 'url(https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/images/img43.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '250px',
                width: '100%',
            }}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 text-center">
                            <h1>Blog</h1>
                            <nav className="breadcrumbs">
                                <ul className="list-unstyled">
                                    <li><a href="/">Ana Sayfa <i className="fa fa-angle-right"></i></a></li>
                                    <li><Link href="/blog">Blog<i className="fa fa-angle-right"></i></Link></li>
                                    <li>
                                        <span>{firstCategoryName}</span>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Detayları */}
            <div className="mt-blog-detail style1">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-8 wow fadeInUp">
                            {blogList.length > 0 ? (
                                blogList.map((blog, index) => (
                                    <article className="blog-post style2" key={index}>
                                        <div className="img-holder">
                                            <img
                                                src={'https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul'+ blog.banner.replace('/media','')}
                                                alt={blog.title}
                                                className="img-responsive"
                                            />
                                            <ul className="list-unstyled comment-nav">
                                                <li><a href="#"><i className="fa fa-eye"></i>{blog.views}</a></li>
                                            </ul>
                                        </div>
                                        <div className="blog-txt">
                                            <h2><Link href={`/blog/${blog.slug}/`}>{ blog.title }</Link></h2>
                                            <ul className="list-unstyled blog-nav">
                                                <li> <a href="#"><i className="fa fa-clock-o"></i>{ blog.created_at }</a></li>
                                                <li> <Link href=""><i className="fa fa-list"></i> { blog.category.name } </Link></li>
                                            </ul>
                                            <p>{ blog.short_description }</p>
                                            <Link href={`/blog/${blog.slug}/`} className="btn-more">Daha Fazla Oku</Link>
                                        </div>
                                    </article>
                                ))
                            ) : (
                                <p className="text-center">Yükleniyor...</p>
                            )}
                        </div>

                        <div className="col-xs-12 col-sm-4 text-right sidebar wow fadeInUp" data-wow-delay="0.4s">  
                            <BlogCategory/>
                            
                            <PopulerBlogs/>

                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}

export default Page;
