"use client";
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useAlert } from "./AlertContext";
import { addToCartApi, getCartApi, removeCartApi, updateQuantityCartApi } from "@/lib/product/product_api";

interface Product {
    id: number;
    name: string;
    slug: string;
    first_image: {
        image: string;
        img_alt: string;
        img_title: string;
    };
    selling_price: string | null;
    rental_prices?: { name: string; rental_price: string }[];
}

interface CartItem {
    id: number;
    name: string;
    quantity: number;
    rental_period?: string | null;
    rental_price: string | null; 
    is_rental: boolean; 
    selling_price: string | null; 
    product: Product;
}

interface CartContextType {
    cartCount: number;
    cartItems: CartItem[];
    totalPrice: number;
    addToCart: (item: {
        id: number; 
        quantity: number; 
        isRental: boolean; 
        rentalPrice: string | null; 
        sellingPrice: string | null; 
        sessionKey: string | null; 
        rentalPeriod: string | null;
    }) => Promise<void>; 
    removeFromCart: (id: number) => void; 
    updateQuantity: (id: number, quantity: number) => Promise<void>; 
}

interface CartResponseData {
    state: boolean;
    messages: string | null;
    cart?: {
        cart_items: CartItem[];
        total_price: number;
    };
}

// CartProvider'ın props tipini tanımladık
interface CartProviderProps {
  children: ReactNode;
}

interface AddtoCartRequestData {
    id: number; 
        quantity: number; 
        isRental: boolean; 
        rentalPrice: string | null; 
        sellingPrice: string | null; 
        sessionKey: string | null; 
        rentalPeriod: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartCount, setCartCount] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const showAlert = useAlert();
    const addToCart = async (item: {
        id: number; 
        quantity: number; 
        isRental: boolean; 
        rentalPrice: string | null; 
        sellingPrice: string | null; 
        sessionKey: string | null; 
        rentalPeriod: string | null;
    }): Promise<void> => {
        const requestData = {
            product_id: item.id,
            quantity: item.quantity,
            is_rental: item.isRental,
            rental_price: item.rentalPrice,
            selling_price: item.sellingPrice,
            rental_period: item.rentalPeriod,
        };
        
        try {
            const responseData: CartResponseData = await addToCartApi(requestData);
            
            if (responseData.state) {
                showAlert("success", responseData.messages);
            } else {
                showAlert("warning", responseData.messages);
            }

            if (responseData.cart?.cart_items && Array.isArray(responseData.cart.cart_items)) {
                setCartItems(responseData.cart.cart_items);
                setCartCount(responseData.cart.cart_items.length);
                setTotalPrice(responseData.cart.total_price);
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            showAlert("error", "Sepet eklerken bir hata oluştu.");
        }
    };

    const removeFromCart = async (id: number) => {
        try {
            const responseData: CartResponseData = await removeCartApi(id);

            if (responseData.state) {
                showAlert("success", responseData.messages);
            } else {
                showAlert("warning", responseData.messages);
            }

            setCartItems(responseData.cart?.cart_items || []);
            setCartCount(responseData.cart?.cart_items?.length || 0);
            setTotalPrice(responseData.cart?.total_price || 0);
        } catch (error) {
            console.error("Error removing item from cart:", error);
            showAlert("error", "Sepet öğesi silinirken bir hata oluştu.");
        }
    };

    const updateQuantity = async (cartItemId: number, newQuantity: number) => {
        try {
            const responseData: CartResponseData = await updateQuantityCartApi(cartItemId, newQuantity);

            if (responseData.state) {
                showAlert("success", responseData.messages);
                setCartItems(responseData.cart?.cart_items || []);
                setCartCount(responseData.cart?.cart_items?.length || 0);
                setTotalPrice(responseData.cart?.total_price || 0);
            } else {
                showAlert("warning", responseData.messages);
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
            showAlert("error", "Miktar güncellenirken bir hata oluştu.");
        }
    };

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response: CartResponseData = await getCartApi();
                if (response.cart?.cart_items) {
                    setCartItems(response.cart.cart_items);
                    setCartCount(response.cart.cart_items.length);
                    setTotalPrice(response.cart.total_price);
                }
            } catch (error) {
                console.error("Error fetching cart:", error);
                showAlert("error", "Sepet verileri alınırken bir hata oluştu.");
            }
        };

        fetchCart();
    }, []);

    return (
        <CartContext.Provider value={{ cartCount, cartItems, totalPrice, addToCart, removeFromCart, updateQuantity }}>
            {children}  {/* children doğru şekilde kullanıldı */}
        </CartContext.Provider>
    );
};
