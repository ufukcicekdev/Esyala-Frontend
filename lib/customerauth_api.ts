import axios from "axios";

// Axios instance oluşturma
const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Çevresel değişkene bağlı API URL'si
});


const handleLogin = async (email: string, password: string) => {
    try {
        // Giriş isteği yap
        const response = await instance.post("/customerauth/user/login/", {
            email,
            password,
        });

        // Giriş başarılıysa
        if (response.data.status) {
            const { token, message } = response.data;

            // Token'ları localStorage'a kaydet
            localStorage.setItem("accessToken", token.access);
            localStorage.setItem("refreshToken", token.refresh);

            console.log("Giriş başarılı:", message);

            return response.data; // Başarılı yanıtı döndür
        } else {
            console.error("Giriş hatası:", response.data.message);
            return null; // Hata durumunda null döndür
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            // Axios hatası ise
            console.error("Hata:", error.response?.data || error.message);
            throw error.response?.data || error.message; // Hata fırlat
        } else {
            // Diğer hatalar için
            console.error("Bilinmeyen hata:", error);
            throw "Bilinmeyen hata oluştu"; // Genel hata mesajı fırlat
        }
    }
};


export default handleLogin;
