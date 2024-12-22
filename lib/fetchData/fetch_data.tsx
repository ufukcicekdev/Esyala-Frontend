"use client";

import { useEffect, useState } from 'react';
import { fetchBlogDetail } from '@/lib/blogApi/blog_api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import Share from '@/app/components/share';
import Image from 'next/image';
import { Container, Grid, Box, Typography } from '@mui/material';
import BlogCategory from '@/app/blog/components/blogcategory';
import PopulerBlogs from '@/app/blog/components/populerblogs';
import Banner from '@/app/components/banner';


interface Blog {
    title: string;
    description: string;
    created_at: string;
    banner: string;
    views: number;
    slug: string;
    category?: {
        name: string;
        slug: string;
    };
}

export default function BlogDetail({ slug }: { slug: string }) {
    const router = useRouter();
    const [blog, setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchBlogDetail(slug);

                setBlog(data)
                // if (!data) {
                //     router.push('/404'); 
                // } else {
                //     ;
                // }
            } catch (error) {
                console.error('Blog fetch error:', error);
                router.push('/404');
            }
        }
        fetchData();
    }, [slug, router]);

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <Container maxWidth="lg">

            <Banner
                backgroundImage="https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/images/img43.jpg"
                title={blog.title}
                breadcrumbs={[
                    { label: "Ana Sayfa", href: "/" },
                    { label: "Blog", href: "/blog" },

                ]}
            />



            <div className="mt-blog-detail style1">
                <Container maxWidth="xl" sx={{ mt: 3 }}>
                    {/* Main Content */}
                    <Grid container spacing={3}>
                        {/* Blog Content */}
                        <Grid item xs={12} sm={8}>
                            <Box
                                component="article"
                                className="blog-post detail"
                                sx={{
                                    animation: 'fadeInUp 0.4s',
                                    mb: 4,
                                }}
                            >
                                {/* Image */}
                                <Box className="img-holder" sx={{ mb: 2 }}>
                                    <Image
                                        src={blog.banner}
                                        alt={blog.title}
                                        width={800}
                                        height={450}
                                        layout="responsive"
                                        style={{ borderRadius: '8px' }}
                                    />
                                </Box>

                                {/* Blog Text */}
                                <Box className="blog-txt">
                                    {/* Blog Metadata */}
                                    <Box
                                        component="ul"
                                        className="list-unstyled blog-nav"
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            gap: 3,
                                            mb: 2,
                                            listStyle: 'none',
                                            padding: 0,
                                        }}
                                    >
                                        <li>
                                            <i className="fa fa-clock-o"></i> {blog.created_at}
                                        </li>
                                        <li>
                                            <Link href={`/blog/category/${blog.category?.slug}`}>
                                                <i className="fa fa-list"></i> {blog.category?.name}
                                            </Link>
                                        </li>
                                        <li>
                                            <i className="fa fa-eye"></i> {blog.views}
                                        </li>
                                        <Share />
                                    </Box>

                                    <Typography
                                        variant="h1"
                                        sx={{
                                            fontSize: {
                                                xs: "24px", // Küçük ekranlar (mobil)
                                                sm: "32px", // Orta ekranlar (tablet)
                                                md: "40px", // Büyük ekranlar
                                                lg: "44px", // Çok büyük ekranlar
                                            },
                                            lineHeight: {
                                                xs: "28px",
                                                sm: "36px",
                                                md: "42px",
                                                lg: "46px",
                                            },
                                            fontWeight: 700,
                                            marginBottom: "15px",
                                            letterSpacing: "1px",
                                            textTransform: "uppercase",
                                            color: "#383838",
                                        }}
                                    >
                                        {blog.title}
                                    </Typography>

                                    {/* Description */}
                                    <div dangerouslySetInnerHTML={{ __html: blog.description }} />
                                </Box>
                            </Box>

                            {/* Author Box */}
                            <Box
                                component="article"
                                className="mt-author-box"
                                sx={{
                                    display: 'flex',
                                    gap: 3,
                                    alignItems: 'center',
                                    p: 3,
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                }}
                            >
                                <Box className="author-img" sx={{ flexShrink: 0 }}>
                                    <Image
                                        src="https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/images/esyala_syh_noktal%C4%B1.png"
                                        alt="Eşyala"
                                        width={120}
                                        height={120}
                                        style={{ borderRadius: '50%' }}
                                    />
                                </Box>
                                <Box className="author-txt">
                                    <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        Eşyala
                                    </Typography>
                                    <Typography variant="body1">
                                        Esyala.com, mobilya, ev dekorasyonu, elektronik ve daha fazlasını kapsayan geniş ürün
                                        yelpazesiyle online alışveriş platformudur. Kiralama ve satın alma seçenekleriyle evinizi
                                        yenilemek artık çok daha kolay!
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Sidebar */}
                        <Grid item xs={12} sm={4}>
                            <Box
                                className="sidebar"
                                sx={{
                                    animation: 'fadeInUp 0.4s',
                                    textAlign: 'right',
                                }}
                            >
                                <BlogCategory />
                                <PopulerBlogs />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </Container>
    );
}




