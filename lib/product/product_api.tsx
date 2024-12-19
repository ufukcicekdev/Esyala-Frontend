import { AxiosError } from "axios";
import instance from "../axiosInstance";

// Ürün detaylarını getirme
export const fetchProductDetails = async (slug : string) => {
    try {
        const response = await instance.get(`/products/api/products/${slug}/`);
    return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
            return axiosError.response.data;  
        } else {
            return { error: true, message: "Bir hata oluştu." };
        }
    }
    
};

// Ürün yorumlarını getirme
export const fetchProductComments = async (productId : number) => {
    try {
        const response = await instance.get(`products/api/product_get_comment/${productId}/`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
            return axiosError.response.data;  
        } else {
            return { error: true, message: "Bir hata oluştu." };
        }
    }
    
};

// Ürün sorularını getirme
export const fetchProductQuestions = async (productId : number) => {
    try {
        const response = await instance.get(`products/api/product_get_questions/${productId}/`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
            return axiosError.response.data;  
        } else {
            return { error: true, message: "Bir hata oluştu." };
        }
    }
    
};

// Yorum ekleme
export const createProductComment = async (productId : number, commentData : any) => {
    try {
        const response = await instance.post(
            `products/api/product_create_comment/${productId}/`,
            commentData
        );
        return response.data;
        
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
            return axiosError.response.data;  
        } else {
            return { error: true, message: "Bir hata oluştu." };
        }
    }
    
};

// Soru ekleme
export const createProductQuestion = async (productId : number, questionData: any) => {
    try {
        const response = await instance.post(
            `products/api/product_create_question/${productId}/`,
            questionData
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
            return axiosError.response.data;  
        } else {
            return { error: true, message: "Bir hata oluştu." };
        }
    }
    
};




export const addToCartApi = async (requestData :any) => {
    try {
        const response = await instance.post(
            `products/api/product/cart/add/`,
            requestData
        );
        return response.data;  // Başarılı durumda gelen veriyi döndürüyoruz
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
            return axiosError.response.data;  
        } else {
            return { error: true, message: "Bir hata oluştu." };
        }
    }
};



export const removeCartApi = async (productId : number) => {
    try {
        const response = await instance.post(
            `products/api/product/remove/`,
            { cart_item_id: productId }
        );
        return response.data;
        
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
            return axiosError.response.data;  
        } else {
            return { error: true, message: "Bir hata oluştu." };
        }
    }
    
};



export const updateQuantityCartApi = async (cartItemId : number, newQuantity: number) => {
    try {
        const response = await instance.post(
            `products/api/product/update_quantity/`,
            {
                cart_item_id: cartItemId,
                quantity: newQuantity,
            }
        );
        return response.data;
        
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
            return axiosError.response.data;  
        } else {
            return { error: true, message: "Bir hata oluştu." };
        }
    }
    
};


export const getCartApi = async () => {
    try {
        const sessionKey = localStorage.getItem("session_key");
        const response = await instance.post(
            `products/api/product/cart/`,
            { session_key: sessionKey }  // Veriyi body'de gönderiyoruz
        );
        return response.data;
        
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
            return axiosError.response.data;  
        } else {
            return { error: true, message: "Bir hata oluştu." };
        }
    }
};
