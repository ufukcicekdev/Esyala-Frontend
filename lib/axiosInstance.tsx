"use client";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";  // AuthContext'ten hook alıyoruz
import { useEffect, useState, ReactNode } from "react";


// Axios instance
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Axios request interceptor
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const AxiosInterceptorWrapper = ({ children }: { children: ReactNode }) => {
  const { refreshSession } = useAuth();
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry && retryCount < 1) {
          originalRequest._retry = true;
          setRetryCount(retryCount + 1);  // Retry count artırıyoruz

          await refreshSession(); // Yeni token alıyoruz
          
          const newAccessToken = localStorage.getItem("access_token");

          if (newAccessToken) {
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axios(originalRequest); // Yeni token ile orijinal isteği yeniden gönderiyoruz
          }
        }

        return Promise.reject(error);
      }
    );
  }, [retryCount, refreshSession]);

  return children; // Child component'i render ediyoruz
};

export default instance;
export { AxiosInterceptorWrapper };
