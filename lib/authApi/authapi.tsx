import { AxiosError } from "axios";
import instance from "../axiosInstance";


export const loginApi = async (email: string, password: string) => {
    try {
        const response = await instance.post(
            "/customerauth/user/login/",
            {
              email,
              password,
            }
          );
        if (response.data.status === true) {
            const { token } = response.data;
            localStorage.setItem("access_token", token.access);
            localStorage.setItem("refresh_token", token.refresh);
            document.cookie = `access_token=${token.access}; path=/; secure; samesite=strict;`; 
            document.cookie = `refresh_token=${token.refresh}; path=/; secure; samesite=strict;`;

            return response.data; 
        } else {
            return response.data;  
        }
    } catch (error) {
        console.error("Giriş işlemi sırasında bir hata oluştu:", error);
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



export const getRefreshSession = async (refreshToken : string) => {
    try {
        const response = await instance.post(`/customerauth/user/token/refresh/`, {
            refresh:refreshToken
        })

        if (response.data.status === true) {
            const { access } = response.data;
            localStorage.setItem("access_token", access);
            document.cookie = `access_token=${access}; path=/; secure; samesite=strict;`; 

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
