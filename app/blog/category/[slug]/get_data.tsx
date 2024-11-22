"use client";
import { fetchBlogCategoryDetail } from '@/lib/blog_api';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import PopulerBlogs from '../../components/populerblogs';
import BlogCategory from '../../components/blogcategory';
import Image from 'next/image';
import { Container, Box, Grid, Typography } from '@mui/material';


interface CategoryBlog {
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





export default function BlogCategoryData({ slug }: { slug: string }) {
    const [blogList, setBlogList] = useState<CategoryBlog[] | null>(null);
    let firstCategoryName = "Kategori Bilgisi Yok";
    if (blogList && blogList.length > 0) {
    firstCategoryName = blogList[0].category?.name || "Kategori Bilgisi Yok";
    }


    useEffect(() => {
        const loadBlogs = async () => {
            try {
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
                                    <li><Link href="/">Ana Sayfa <i className="fa fa-angle-right"></i></Link></li>
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
            <Container maxWidth="xl">
                <Grid container spacing={3}>
                    {/* Blog List Section */}
                    <Grid item xs={12} sm={8}>
                        {blogList && blogList.length > 0 ? (
                            blogList.map((blog, index) => (
                                <Box
                                    key={index}
                                    className="blog-post style2"
                                    mb={4}
                                    sx={{ '& .img-holder': { position: 'relative' } }}
                                >
                                    <Box className="img-holder" sx={{ position: 'relative', overflow: 'hidden' }}>
                                        <Image
                                            src={'https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul' + blog.banner.replace('/media', '')}
                                            alt={blog.title}
                                            width={500}
                                            height={300}
                                            layout="responsive"
                                        />
                                        <ul className="list-unstyled comment-nav">
                                            <li><i className="fa fa-eye"></i>{blog.views}</li>
                                        </ul>
                                    </Box>

                                    <Box className="blog-txt" p={2}>
                                        <Typography variant="h5" component="h2">
                                            <Link href={`/blog/${blog.slug}/`}>{blog.title}</Link>
                                        </Typography>
                                        <ul className="list-unstyled blog-nav">
                                            <li><i className="fa fa-clock-o"></i>{blog.created_at}</li>
                                            <li><Link href=""><i className="fa fa-list"></i>{blog.category?.name}</Link></li>
                                        </ul>
                                        <Typography variant="body1">{blog.short_description}</Typography>
                                        <Link href={`/blog/${blog.slug}/`} className="btn-more">Daha Fazla Oku</Link>
                                    </Box>
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body1" align="center">Yükleniyor...</Typography>
                        )}
                    </Grid>

                    {/* Sidebar Section */}
                    <Grid item xs={12} sm={4}>
                        <Box className="sidebar" sx={{ textAlign: 'right' }}>
                            <BlogCategory />
                            <PopulerBlogs />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
        </main>
    );
}
