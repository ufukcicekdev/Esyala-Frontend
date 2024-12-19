"use client";
import { fetchPopularBlogs } from '@/lib/blogApi/blog_api';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';


interface BlogList {
    title: string;
    short_description: string;
    created_at: string;
    banner: string;
    views: number;
    slug: string;
    category?: {
        name: string;
        slug: string;
    };
}


function PopulerBlogs() {

    const [populerblogList, setPopulerList] = useState<BlogList[] | null>(null);

    useEffect(() => {

        const loadPopulerBlog = async () => {
            try {
                const populerblogResult = await fetchPopularBlogs();
                if (populerblogResult && populerblogResult.status) {
                    setPopulerList(populerblogResult.data);
                } else {
                    console.error("Populer Blog verisi alınamadı.");
                }
            } catch (error) {
                console.error("Populer Blog verisi alınamadı:", error);
            }
        };

        loadPopulerBlog();
    }, []);
    return (
        <>
            {populerblogList && populerblogList.length > 0 ? (
                <section className="widget popular-widget">
                    <h3
                        style={{
                            textDecoration: "underline",
                            textDecorationThickness: "2px",
                            textUnderlineOffset: "4px",
                            color: "#333",
                        }}
                    >
                        Popüler Gönderiler
                    </h3>
                    <ul className="list-unstyled text-right popular-post">
                        {populerblogList.map((populerBlog, index) => (
                            <li key={index}>
                                <div className="img-post">
                                    <Link href={`/blog/${populerBlog.slug}/`}>
                                        <Image
                                            src={populerBlog.banner}
                                            alt={populerBlog.title}
                                            title={populerBlog.title}
                                            width={100}
                                            height={50}
                                            loading="lazy"
                                        />
                                    </Link>
                                </div>
                                <div className="info-dscrp">
                                    <Link href={`/blog/${populerBlog.slug}/`} > <p>{populerBlog.title}</p></Link>
                                    <time dateTime={new Date(populerBlog.created_at).toISOString()}>
                                        {new Date(populerBlog.created_at).toLocaleDateString()}
                                    </time>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            ) : null}
        </>

    )
}

export default PopulerBlogs