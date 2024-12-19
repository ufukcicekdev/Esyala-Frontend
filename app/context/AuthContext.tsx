"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
// Yardımcı fonksiyon: localStorage'dan erişim token'ını alır
const getAccessToken = () => localStorage.getItem("access_token");

// Yardımcı fonksiyon: refresh token'ını alır
const getRefreshToken = () => localStorage.getItem("refresh_token");


// API temel URL'si
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// API'ye yapılan istekleri yöneten yardımcı fonksiyon
const request = async (url: string, options: RequestInit = {}) => {
  const token = getAccessToken(); // Erişim token'ını al
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`, // Authorization başlığı ekle
    };
  }

  const response = await fetch(`${BASE_URL}${url}`, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Bir hata oluştu");
  }
  return data;
};



interface User{
  email:string;
  first_name:string;
  id:number;
  last_name:string;
  username:string;
}



// Auth context tip tanımlaması
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshSession: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

// Context oluşturuluyor
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider bileşeni
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  // Kullanıcının oturum açıp açmadığını kontrol eden fonksiyon
  const checkAuth = async () => {
    const token = getAccessToken(); // Erişim token'ını al
    if (token) {
      try {
        const data = await request("customerauth/user/auth/verify", { method: "GET" });
        setIsAuthenticated(true);
        setUser(data.user); // Kullanıcıyı set et
      } catch (err) {
        setIsAuthenticated(false);
        setUser(null);
        setError("Oturum süresi dolmuş. Lütfen tekrar giriş yapın.");
      }
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth(); // Uygulama yüklendiğinde oturum kontrolü yap
  }, []);

  // Giriş yapma fonksiyonu
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await request("customerauth/user/login/", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const { token, user } = data;
      localStorage.setItem("access_token", token.access);
      localStorage.setItem("refresh_token", token.refresh);
      setUser(user);
      setError(null);
    } catch (err) {
      setError("Geçersiz email veya şifre.");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const response = await request("customerauth/user/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: JSON.stringify({
          refresh: getRefreshToken(),
        }),
      });
      if (response.status == true){
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
   
        setIsAuthenticated(false);
        setError(response.message);
      }
      else
      {
        setError(response.message);
      }

    } catch (error: any) {
      setError("Çıkış yapılırken bir hata oluştu.");
      console.error("Çıkış hatası:", error.message || error);
    }
  };
  

  

  const refreshSession = async () => {
    console.log("buradsiiii");
    const refreshToken = getRefreshToken(); // Refresh token'ı al

    // Refresh token'ı bulunamazsa hata mesajı ver
    if (!refreshToken) {
        setError("Refresh token'ı bulunamadı. Lütfen tekrar giriş yapın.");
        return;
    }

    try {
        // Refresh token ile yeni erişim token'ı almak için doğru API endpoint'ini kullanıyoruz
        const data = await request("customerauth/user/token/refresh/", {
            method: "POST",
            body: JSON.stringify({ refresh: refreshToken }),  // Refresh token'ı request body'sine ekliyoruz
            headers: {
                "Content-Type": "application/json",  // JSON formatı ile veri gönderiyoruz
            },
        });

        const { access } = data;  // Yeni erişim token'ını alıyoruz
        localStorage.setItem("access_token", access);  // Yeni erişim token'ını localStorage'a kaydediyoruz

    } catch (err) {
        console.error("Hata:", err);
        logout();  // Hata oluşursa çıkış yapıyoruz
        setError("Oturum süresi dolmuş. Lütfen tekrar giriş yapın.");
    }
};


  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, refreshSession, loading, error }}
    >
      {loading ? (
        <div className="loading-message">
          Yükleniyor, lütfen bekleyin...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

// Özel hook: AuthContext kullanımı
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth, AuthProvider içinde kullanılmalıdır");
  }
  return context;
};
