"use client";

import { fetchBlogDetail } from '@/lib/blog_api';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import BlogCategory from '../components/blogcategory';
import PopulerBlogs from '../components/populerblogs';
import SocialMedia from '@/app/components/socialMedia';
import Share from '@/app/components/share';
import Image from 'next/image';


export default function Page({ params }: { params: Promise<{ slug: string }> }) {
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBlogDetail = async () => {
            try {
                const { slug } = await params;
                const blogDetailResult = await fetchBlogDetail(slug);

                if (blogDetailResult?.error) {
                    setError(blogDetailResult.error);
                } else {
                    setBlog(blogDetailResult);
                }
            } catch {
                setError("Bir hata oluştu. Lütfen tekrar deneyin.");
            } finally {
                setLoading(false);
            }
        };

        loadBlogDetail();
    }, [params]);

    if (loading) {
        return <p>Yükleniyor...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!blog) {
        return <p>Blog bulunamadı.</p>;
    }

    return (
        <main id="mt-main">
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
                                    <li>
                                        <Link href="/">AnaSayfa <i className="fa fa-angle-right"></i></Link>
                                    </li>
                                    <li>
                                        <Link href="/blog">Blog <i className="fa fa-angle-right"></i></Link>
                                    </li>
                                    <li>
                                        <span>{blog.title}</span>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

            <div className="mt-blog-detail style1">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-8" data-wow-delay="0.4s" >
                            <article className="blog-post detail wow fadeInUp" data-wow-delay="0.4s">
                                <div className="img-holder">
                                    <Image
                                        src={`https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul${blog.banner.replace('/media', '')}`}
                                        alt={blog.title}
                                        className="img-responsive"
                                        width={500}
                                        height={300}
                                        layout="responsive" 
                                    />
                                </div>

                                <div className="blog-txt">
                                    <h1>{blog.title}</h1>
                                    <ul className="list-unstyled blog-nav">
                                        <li>
                                            <i className="fa fa-clock-o"></i> {blog.created_at}
                                        </li>
                                        <li>
                                            <Link href="{`/blog/category/${blogcategory.slug}`}"><i className="fa fa-list"></i>{ blog.category?.name }</Link>
                                        </li>
                                        <li>
                                            <i className="fa fa-eye"></i> {blog.views}
                                        </li>
                                        <Share/>
                                    </ul>
                                    <div dangerouslySetInnerHTML={{ __html: blog.description }} />
                                </div>
                            </article>

                            <article className="mt-author-box">
                                <div className="author-img">
                                <Image
                                    src="https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/images/esyala_syh_noktal%C4%B1.png"
                                    alt="Eşyala"
                                    width={500}  // Görselin genişliğini belirtin
                                    height={300} // Görselin yüksekliğini belirtin
                                    layout="responsive" // Görselin responsive olmasını sağlamak için
                                    />
                                </div>
                                <div className="author-txt">
                                    <h3>Eşyala</h3>
                                    <p>
                                        Esyala.com, mobilya, ev dekorasyonu, elektronik ve daha fazlasını kapsayan geniş
                                        ürün yelpazesiyle online alışveriş platformudur. Kiralama ve satın alma seçenekleriyle
                                        evinizi yenilemek artık çok daha kolay!
                                    </p>
                                    <SocialMedia/>
                                </div>
                            </article>
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
