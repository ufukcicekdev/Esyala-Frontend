"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useAlert } from "./AlertContext";
import { checkAuthApi, getRefreshSession, loginApi, logoutApi } from "@/lib/customerAuthApi/customerauth_api";
import { useRouter } from 'next/navigation'



// Yardımcı fonksiyonlar...
const getAccessToken = () => localStorage.getItem("access_token");
const getRefreshToken = () => localStorage.getItem("refresh_token");
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const request = async (url: string, options: RequestInit = {}) => {
  const token = getAccessToken();
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  const response = await fetch(`${BASE_URL}${url}`, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Bir hata oluştu");
  }
  return data;
};

interface User {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  username: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  refreshSession: () => Promise<void>;
  loading: boolean;
  error: string | null;
  checkAuth: () => Promise<any>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const showAlert = useAlert();
  const router = useRouter();

  const checkAuth = async () => {
    const token = getAccessToken();
    if (token) {
      try {

        const data =  await checkAuthApi()
        if (data.status === true) {
          setIsAuthenticated(true);
          setUser(data.user);
        } 
        else{
          setIsAuthenticated(false);
          setUser(null);
          showAlert("error", "Oturum süresi dolmuş. Lütfen tekrar giriş yapın.");
          router.push("/");
        }
      } catch (err) {
        setIsAuthenticated(false);
        setUser(null);
        showAlert("error", "Oturum süresi dolmuş. Lütfen tekrar giriş yapın.");
        router.push("/"); 
      }
    } else {
      setIsAuthenticated(false);
      // router.push("/");
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<any> => {
    try {
      const data = await loginApi(email, password);
      const { user, message, status } = data;

      if (status === true) {
        setIsAuthenticated(true);
        setUser(user);
        router.push("/");
        return data;
      } else {
        showAlert("error", message || "Giriş başarısız.");
        return data;
      }
    } catch (err) {
      console.error("Giriş işlemi sırasında bir hata oluştu:", err);
      showAlert("error", "Bir sorun oluştu. Lütfen tekrar deneyin.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<any> => {
    try {
      const refresh = getRefreshToken();
      if (!refresh) {
        const errorMessage = "Çıkış yapmak için geçerli bir refresh token bulunamadı.";
        console.error(errorMessage);
        setError(errorMessage);
        return { status: false, message: errorMessage };
      }

      const response = await logoutApi(refresh);
      if (response.status === true) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("session_key");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser(null);

        document.cookie.split(';').forEach((cookie) => {
          const cookieName = cookie.split('=')[0].trim();
          document.cookie = `${cookieName}=;expires=${new Date(0).toUTCString()};path=/`;
        });

        router.push("/"); 
      } else {
        const errorMessage = response.message || "Çıkış başarısız.";
        console.error(errorMessage);
        setError(errorMessage);
      }
      return response;
    } catch (error: any) {
      const errorMessage = "Çıkış yapılırken bir hata oluştu.";
      console.error("Çıkış hatası:", error.message || error);
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const refreshSession = async (): Promise<void> => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      setError("Refresh token'ı bulunamadı. Lütfen tekrar giriş yapın.");
      return;
    }

    try {
      const data = await getRefreshSession(refreshToken)
      
    } catch (err) {
      console.error("Hata:", err);
      logout(); // Call logout if refreshing the session fails
      setError("Oturum süresi dolmuş. Lütfen tekrar giriş yapın.");
      router.push("/"); // Redirect to login page
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, refreshSession, loading, error, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth, AuthProvider içinde kullanılmalıdır");
  }
  return context;
};
