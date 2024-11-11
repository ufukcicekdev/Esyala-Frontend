"use client";
import { fetchPopularBlogs } from '@/lib/blog_api';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

function PopulerBlogs() {

    const [populerblogList, setPopulerList] = useState([]);

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
    {populerblogList.length > 0 ? (
        <section className="widget popular-widget">
            <h3>Popüler Gönderiler</h3>
            <ul className="list-unstyled text-right popular-post">
                {populerblogList.map((populerBlog, index) => (
                    <li key={index}>
                        <div className="img-post">
                            <Link href={`/blog/${populerBlog.slug}/`}>
                                    <img
                                        src={`https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul${populerBlog.banner.replace('/media', '')}`}
                                        alt={populerBlog.title}
                                        title={populerBlog.title}
                                    />
                            </Link>
                        </div>
                        <div className="info-dscrp">
                            <Link href={`/blog/${populerBlog.slug}/`} > <p>{ populerBlog.title }</p></Link>  
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