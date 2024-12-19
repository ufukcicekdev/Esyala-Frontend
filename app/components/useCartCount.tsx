import { useEffect, useState } from "react";

const useCartCount = (sessionKey: string | null) => {
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      if (!sessionKey) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}products/api/product/cart/?session_key=${sessionKey}`
        );

        if (!response.ok) {
          console.error("API yanıtı başarısız:", response.status);
          setCartCount(0); 
          return;
        }

        const data = await response.json();
        if (data.cart_items && Array.isArray(data.cart_items)) {
          setCartCount(data.cart_items.length); 
        } else {
          setCartCount(0);
        }
      } catch (error) {
        console.error("Sepet verisi alınırken hata oluştu:", error);
        setCartCount(0);
      }
    };

    fetchCartCount(); 
  }, [sessionKey]);

  return [cartCount, setCartCount] as const;
};

export default useCartCount;
