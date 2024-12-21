import React, { useState } from "react";
import { Drawer, Box, Container, Button, Typography, IconButton, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "@/app/context/CartContext";
import Link from 'next/link';
import Image from 'next/image';

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
    rentalPeriod?: string | null;
    rentalPrice: string | null; 
    isRental: boolean; 
    sellingPrice: string | null; 
    product: Product;
}

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const { cartItems, removeFromCart, totalPrice, updateQuantity } = useCart();
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
    const [isUpdating, setIsUpdating] = useState(false);

    const handleIncreaseQuantity = (item: CartItem) => {
        if (isUpdating) return;
        setIsUpdating(true);
        setQuantities((prev) => {
            const newQuantity = (prev[item.id] || item.quantity) + 1;
            return { ...prev, [item.id]: newQuantity };
        });
        updateQuantity(item.id, (quantities[item.id] || item.quantity) + 1);
        setTimeout(() => setIsUpdating(false), 300);
    };

    const handleDecreaseQuantity = (item: CartItem) => {
        if (isUpdating) return;
        setIsUpdating(true);
        setQuantities((prev) => {
            const newQuantity = Math.max((prev[item.id] || item.quantity) - 1, 1);
            return { ...prev, [item.id]: newQuantity };
        });
        updateQuantity(item.id, Math.max((quantities[item.id] || item.quantity) - 1, 1));
        setTimeout(() => setIsUpdating(false), 300);
    };

    return (
        <Drawer
        anchor="right"
        open={isOpen}
        onClose={onClose}
        sx={{
            "& .MuiDrawer-paper": {
                width: {
                    xs: '80%',  // Mobilde daha geniş bir sidebar
                    sm: '50%',  // Tablet boyutunda yüzde 50 genişlik
                    md: '30%',  // Masaüstü boyutunda yüzde 30 genişlik
                },
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
            },
        }}
    >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Container maxWidth="xs" sx={{ flexGrow: 1, overflow: 'auto' }}>
                <Box display="flex" justifyContent="flex-end" mb={2}>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
    
                <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <Box
                                key={item.id}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '8px 0',
                                    borderBottom: '1px solid #ddd',
                                }}
                            >
                                <Box sx={{ marginRight: 2 }}>
                                    <Image
                                        src={item.product.first_image.image || '/default-image.jpg'}
                                        alt={item.product.first_image.img_alt}
                                        width={50}  // Mobilde daha küçük bir resim boyutu
                                        height={50}
                                        style={{ borderRadius: '8px' }}
                                    />
                                </Box>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Link href={`/product/${item.product.slug}`} passHref>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 'bold',
                                                color: 'primary.main',
                                                textDecoration: 'underline',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {item.product.name}
                                        </Typography>
                                    </Link>
                                    {item.isRental ? (
                                        <Typography variant="caption" color="textSecondary">
                                            Kiralık - Süre: {item.rentalPeriod} Ay - Fiyat: {item.rentalPrice}₺
                                        </Typography>
                                    ) : (
                                        <Typography variant="caption" color="textSecondary">
                                            Satılık - Fiyat: {item.product.selling_price}₺
                                        </Typography>
                                    )}
    
                                    {!item.isRental && (
                                        <Box mt={1} display="flex" justifyContent="center" alignItems="center">
                                            <Button
                                                onClick={() => handleDecreaseQuantity(item)}
                                                disabled={quantities[item.id] <= 1}
                                                sx={{ padding: '8px 12px', fontSize: '1rem' }}
                                            >
                                                -
                                            </Button>
                                            <Typography variant="body2" mx={1} sx={{ fontSize: '1rem' }}>
                                                {quantities[item.id] || item.quantity}
                                            </Typography>
                                            <Button
                                                onClick={() => handleIncreaseQuantity(item)}
                                                sx={{ padding: '8px 12px', fontSize: '1rem' }}
                                            >
                                                +
                                            </Button>
                                        </Box>
                                    )}
                                </Box>
                                <IconButton
                                    onClick={() => removeFromCart(item.id)}
                                    sx={{ color: 'red', fontSize: '18px', '&:hover': { color: 'darkred' } }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        ))
                    ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                            <Image
                                src="https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/basket/empty-cart.png"
                                alt="Boş Sepet"
                                width={100}
                                height={100}
                                layout="intrinsic"
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                                Sepetiniz boş.
                            </Typography>
                            <Link href="/" passHref>
                                <Button variant="contained" color="primary" sx={{ padding: '12px 16px', fontSize: '1rem' }} onClick={onClose}>
                                    Alışverişe Başla
                                </Button>
                            </Link>
                        </Box>
                    )}
                </Box>
            </Container>
    
            <Box sx={{ padding: 2, backgroundColor: 'background.paper', borderTop: '1px solid', borderColor: 'divider' }}>
                {cartItems.length > 0 && (
                    <>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: 2 }}>
                            Toplam: {totalPrice}₺
                        </Typography>
                        <Link href="/checkout" passHref>
                            <Button fullWidth variant="contained" color="primary" sx={{ padding: '12px 16px', fontSize: '1rem' }} onClick={onClose}>
                                Ödeme Yap
                            </Button>
                        </Link>
                    </>
                )}
            </Box>
        </Box>
    </Drawer>
    
    );
};

export default Sidebar;
