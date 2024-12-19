"use client";
import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Context oluşturma
const SessionContext = createContext<string | null>(null);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [sessionKey, setSessionKey] = useState<string | null>(null);

    // localStorage'dan session key almak
    useEffect(() => {
        const savedSessionKey = localStorage.getItem('session_key');
        if (savedSessionKey) {
            setSessionKey(savedSessionKey);
        } else {
            // Session key yoksa yeni oluştur
            const newSessionKey = generateSessionKey();
            localStorage.setItem('session_key', newSessionKey);
            setSessionKey(newSessionKey);
        }
    }, []);

    // Kriptografik güvenli session key üretme fonksiyonu
    const generateSessionKey = () => {
        const length = 250; // Anahtar uzunluğu
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?'; // Karakter seti
        const randomValues = new Uint32Array(length);  // Kriptografik olarak güvenli rastgele sayılar
        window.crypto.getRandomValues(randomValues);  // Kriptografik güvenli sayı üretimi

        let sessionKey = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = randomValues[i] % chars.length;  // Rastgele indeks seçimi
            sessionKey += chars[randomIndex];
        }

        return sessionKey;
    };

    return (
        <SessionContext.Provider value={sessionKey}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => {
    const context = React.useContext(SessionContext);
    if (context === null) {
        throw new Error("useSession must be used within a SessionProvider");
    }
    return context;
};
