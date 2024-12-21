import { AxiosError } from "axios";
import instance from "../axiosInstance";
import { setCookie } from "nookies";


export const loginApi = async (email: string, password: string) => {
    try {
        const response = await instance.post("/customerauth/user/login/", {
            email,
            password,
        });
        if (response.data.status === true) {
            const { token } = response.data;
            localStorage.setItem("access_token", token.access);
            localStorage.setItem("refresh_token", token.refresh);
            setCookie(null, "access_token", token.access, {
                maxAge: 3600, // 1 saat
                path: "/",
                httpOnly: false, // HttpOnly flag
                secure: process.env.NODE_ENV === "production",
            });

            setCookie(null, "refresh_token", token.refresh, {
                maxAge: 7 * 24 * 60 * 60, // 7 gün
                path: "/",
                httpOnly: false,
                secure: process.env.NODE_ENV === "production",
            });
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

export const logoutApi = async (refreshToken : string ) => {
    try {
        const response = await instance.post("customerauth/user/logout/", {
            refresh : refreshToken
        });
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


export const registerApi = async (requestBody : any) => {
    try {
        const response = await instance.post("/customerauth/user/register/", 
            requestBody
        );
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


export const getAddressApi = async () => {
    try {
        const response = await instance.get("/customerauth/user/addresses/");
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


export const updateAddressApi = async (address_id:number, requestBody : any) => {
    try {
        const response = await instance.put(`/customerauth/user/addresses/edit/${address_id}/`, 
            requestBody
        );
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


export const createAddressApi = async (requestBody : any) => {
    try {
        const response = await instance.post(`/customerauth/user/addresses/create/`, 
            requestBody
        );
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


export const getOrdersApi = async () => {
    try {
        const response = await instance.get("/customerauth/user/orderlist/");
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

export const getOrderDetailApi = async (orderNumber: string) => {
    try {
        const response = await instance.get(`/customerauth/user/orderdetail/${orderNumber}/`);
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




export const getProfileApi = async () => {
    try {
        const response = await instance.get(`/customerauth/user/profile/`);
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




export const updateProfileApi = async (requestBody : any) => {
    try {
        const response = await instance.put(`customerauth/user/profile/update/`, 
            requestBody
        );
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



export const getNotifySettings = async () => {
    try {
        const response = await instance.get(`/customerauth/user/notifications/`);
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



export const updateNotifySettings = async (email : boolean, sms : boolean) => {
    try {
        const response = await instance.put(`/customerauth/user/notifications/`, {
            receive_email_notifications: email,
            receive_sms_notifications: sms
        });
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




export const getRefreshSession = async (requestBody : any) => {
    try {
        const response = await instance.post(`/customerauth/user/token/refresh/`, {
            requestBody
        })

        if (response.data.status === true) {
            const { access } = response.data;
            localStorage.setItem("access_token", access);

            setCookie(null, "access_token", access, {
                maxAge: 3600, // 1 saat
                path: "/",
                httpOnly: false, // HttpOnly flag
                secure: process.env.NODE_ENV === "production",
            });

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



export const checkAuthApi = async () => {
    try {
        const response = await instance.get(`/customerauth/user/auth/verify`);
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



