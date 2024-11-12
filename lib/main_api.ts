// lib/api.ts
import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export async function fetchSocialMediaLinks() {
    try {
        const response = await instance.get("/main/get_social_media_links/");
        if (response.data["status"] == true) {
            return response.data;
        }
        else {
            return response.data["messages"]
        }
    } catch (error) {
        console.error("Sosyal medya linkleri alınırken bir hata oluştu:", error);
        return [];
    }
}


export async function fetchBrands() {
    try {
        const response = await instance.get("/main/get_brand/");
        if (response.data["status"] == true) {
            return response.data;
        }
        else {
            return response.data["messages"]
        }
    } catch (error) {
        console.error("Markalar alınırken bir hata oluştu:", error);
        return [];
    }
}


export async function fetchAbout() {
    try {
        const response = await instance.get("/main/about/");
        if (response.data["status"] == true) {
            return response.data;
        }
        else {
            return response.data["messages"]
        }
    } catch (error) {
        console.error("Hakkımızda alınırken bir hata oluştu:", error);
        return [];
    }
}



export async function fetchHomeMainBanner() {
    try {
        const response = await instance.get("/main/get_home_main_banner/");
        if (response.data["status"] == true) {
            return response.data;
        }
        else {
            return response.data["messages"]
        }
    } catch (error) {
        console.error("Bannerlar alınırken bir hata oluştu:", error);
        return [];
    }
}



export async function fetchCategory() {
    try {
        const response = await instance.get("/main/get_category/");
        if (response.data["status"] == true) {
            return response.data;
        }
        else {
            return response.data["messages"]
        }
    } catch (error) {
        console.error("Kategoriler alınırken bir hata oluştu:", error);
        return [];
    }
}