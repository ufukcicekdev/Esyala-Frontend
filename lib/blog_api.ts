// lib/api.ts
"use client";
import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});



export async function fetchBlogs() {
    try {
        const response = await instance.get("/blog/");
        if (response.data?.status === true && response.data?.data?.length > 0) {
            console.log(response.data);
            return response.data;
        }
        else {
            return response.data["messages"]
        }
    } catch (error) {
        console.error("Bloglar alınırken bir hata oluştu:", error);
        return [];
    }
}

export async function fetchBlogDetail(slug: string) {
    try {
        const response = await instance.get(`/blog/${slug}/`);
        
        if (response.data?.status === true && response.data?.data?.length > 0) {
            return response.data.data[0]; // İlk blog detayını döndür
        } else {
            return { error: response.data?.messages || "Blog bulunamadı." };
        }
    } catch (error) {
        return { error: "Blog detayları alınırken bir hata oluştu." };
    }
}



export async function fetchBlogCategory() {
    try {
        const response = await instance.get(`/blog/blog_categories/`);
        
        if (response.data?.status === true && response.data?.data?.length > 0) {
            return response.data; 
        } else {
            return { error: response.data?.messages || "Blog bulunamadı." };
        }
    } catch (error) {
        return { error: "Blog kategori verisi alınırken hata oluştu" };
    }
}

export async function fetchPopularBlogs() {
    try {
        const response = await instance.get(`/blog/popular_blogs/`);
        
        if (response.data?.status === true && response.data?.data?.length > 0) {
            return response.data; // İlk blog detayını döndür
        } else {
            return { error: response.data?.messages || "Blog bulunamadı." };
        }
    } catch (error) {
        return { error: "Popüler Blog verisi alınırken hata oluştu" };
    }
}



export async function fetchBlogCategoryDetail(slug: string) {
    try {
        const response = await instance.get(`/blog/blog_category_product/${slug}/`);
        
        if (response.data?.status === true && response.data?.data?.length > 0) {
            return response.data;
        }
        else {
            return response.data["messages"]
        }
    } catch (error) {
        return { error: "Blog detayları alınırken bir hata oluştu." };
    }
}