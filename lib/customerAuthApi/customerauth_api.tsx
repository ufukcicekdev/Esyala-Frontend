import { AxiosError } from "axios";
import instance from "../axiosInstance";




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



