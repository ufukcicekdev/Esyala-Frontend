import axios from "axios";

// Axios instance oluşturma
const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, 
});


const handleLogin = async (email: string, password: string) => {
    try {
        const response = await instance.post("/customerauth/user/login/", {
            email,
            password,
        });

        if (response.data.status) {
            const { token } = response.data;

            localStorage.setItem("accessToken", token.access);
            localStorage.setItem("refreshToken", token.refresh);


            return response.data; 
        } else {
            return null; 
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error("Hata:", error.response?.data || error.message);
            throw error.response?.data || error.message;
        } else {
            throw "Bilinmeyen hata oluştu"; 
        }
    }
};


export default handleLogin;
