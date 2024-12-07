"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

// Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Environment variable
});

// User interface
interface User {
  id: string;
  email: string;
  username: string;
  // Additional user fields
}

// Auth context type definition
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshSession: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Helper to get access token from localStorage
  const getAccessToken = () => localStorage.getItem("access_token");

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const token = getAccessToken();
      if (token) {
        try {
          const response = await api.get("/customerauth/user/auth/verify", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.status === 200) {
            setIsAuthenticated(true);
            setUser(response.data.user);
          }
        } catch (err) {
          setIsAuthenticated(false);
          setUser(null);
          setError("Session expired. Please log in again.");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await api.post("/customerauth/user/login/", { email, password });
      const { token, user } = response.data;

      // Store tokens and user data
      localStorage.setItem("access_token", token.access);
      localStorage.setItem("refresh_token", token.refresh);
      localStorage.setItem("user", JSON.stringify(user));

      setIsAuthenticated(true);
      setUser(user);
      setError(null);
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUser(null);
    setError(null);
  };

  // Refresh session
  const refreshSession = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      try {
        const response = await api.post("/customerauth/user/token/refresh/", { refresh: refreshToken });
        const { access } = response.data;

        // Update access token
        localStorage.setItem("access_token", access);
        setError(null);
      } catch (err) {
        logout(); 
        setError("Session expired. Please log in again.");
      }
    } else {
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, refreshSession, loading, error }}
    >
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
