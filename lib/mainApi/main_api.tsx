import { AxiosError } from "axios";
import instance from "../axiosInstance";



export async function fetchBrands() {
    try {
        const response = await instance.get("/main/get_brand/");
        console.log(response.data.status);
        if (response.data.status === true) {
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



export async function getHomeMainBanner() {
    try {
        const response = await instance.get("/main/get_home_main_banner/");
        if (response.data.status == true) {
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

export async function fetchBrand() {
    try {
        const response = await instance.get("/main/get_brand/");
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

export async function fetchFooterCategory() {
    try {
        const response = await instance.get("/main/get_footer_category/");
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




export async function fetchCategoryProduct(category_slugs: string | string[], page: number, itemsPerPage: number, filters: any) {
    try {
        const slugPath = Array.isArray(category_slugs)
            ? category_slugs.join('/')
            : category_slugs;

        const params: any = {
            page: page,
            items_per_page: itemsPerPage,
            ...filters, 
        };

        if (filters.is_rent !== undefined) {
            params.is_rent = filters.is_rent;
        }

        const response = await instance.get(`/main/category/${slugPath}/`, {
            params: params, 
        });

        // API yanıtını kontrol et
        if (response.data?.results?.status === true) {
            return response.data.results; // Burada dönen verinin formatını kontrol edin
        } else {
            return { error: response.data?.messages || "Ürün bulunamadı." };
        }
    } catch (error) {
        console.error('Error:', error);
        return { error: "Ürün detayları alınırken bir hata oluştu." };
    }
}



export async function fetchProductCategoryList(category_slugs: string | string[]) {
    try {
        const slugPath = Array.isArray(category_slugs)
            ? category_slugs.join('/')
            : category_slugs;

        const response = await instance.get(`/main/productCategoryList/${slugPath}/`);
        if (response.data?.status === true) {
            return response.data;
        } else {
            return { error: response.data?.messages || "Kategori bulunamadı." };
        }
    } catch (error) {
        console.error('Error:', error);
        return { error: "Kategori detayları alınırken bir hata oluştu." };
    }
}





export async function fetchRentalProduct() {
    try {
        const response = await instance.get(`/main/category/rental/`);
        if (response.data.results.status === true) {
            return response.data.results; 
        } else {
            console.warn("API response is empty or status is false:", response.data?.messages || "No message provided");
            return { error: response.data?.messages || "Ürün bulunamadı." };
        }
    } catch (error) {
        return { error: "Ürün detayları alınırken bir hata oluştu." };
    }
}

export async function fetchSalesProduct() {
    try {
        const response = await instance.get(`/main/category/sales/`);
        if (response.data.results.status === true) {
            return response.data.results; 
        } else {
            return { error: response.data?.messages || "Ürün bulunamadı." };
        }
    } catch (error:unknown) {
        return { error: "Ürün detayları alınırken bir hata oluştu." };
    }
}



export const getHomepageBestSellerProduct = async () => {
    try {
        const response = await instance.get(`/main/homepage_best_seller_products/`);
        if (response.data.status === true) {
            return response.data; 
        } else {
            return response.data;  
        }
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
            return axiosError.response.data;  
        }   
    }
};



export const getHomepageFeaturedProduct = async () => {
    try {
        const response = await instance.get(`/main/homepage_featured_products/`);
        if (response.data.status === true) {
            return response.data; 
        } else {
            return response.data;  
        }
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
            return axiosError.response.data;  
        }   
    }
};



export const getHomepageLatestProducts = async () => {
    try {
        const response = await instance.get(`/main/homepage_latest_products/`);
        if (response.data.status === true) {
            return response.data; 
        } else {
            return response.data;  
        }
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
            return axiosError.response.data;  
        }   
    }
};




