import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemAvatar, Avatar, Box, Container, Button, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "@/app/context/CartContext";
import Link from 'next/link';
import Image from 'next/image';  // Next.js Image bileşenini import edin

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
    product: Product;
    quantity: number;
    is_rental: boolean;
    rental_price: string | null;
    rental_period: string | null;
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
                    width: '100%', // Full width on mobile
                    maxWidth: 350, // Max width for larger screens
                    padding: 2,
                }
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Container maxWidth="xs" sx={{ flexGrow: 1, overflow: 'auto' }}>
                    <Box display="flex" justifyContent="flex-end" mb={2}>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {cartItems.length > 0 && (
                        <Image
                            src="https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/basket/shopping-basket.png"
                            alt="Sepetim"
                            width={20}
                            height={20}
                            layout="fixed" // Bu özellik, görüntülerin orantılı olmasını sağlar
                            style={{ maxWidth: '100%', height: 'auto' }} // Resmin boyutunu sınırlayarak duyarlı hale getirir
                        />
                    )}

                    <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <ListItem button key={item.id} sx={{ display: 'flex', alignItems: 'center', padding: '8px 0' }}>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={item.product.name}
                                            src={item.product.first_image.image || '/default-image.jpg'}
                                            sx={{ width: 50, height: 50 }}
                                        />
                                    </ListItemAvatar>
                                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', marginLeft: 1 }}>
                                        <Link href={`/product/${item.product.slug}`} passHref>
                                            <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main', textDecoration: 'underline', cursor: 'pointer' }}>
                                                {item.product.name}
                                            </Typography>
                                        </Link>
                                        {item.is_rental ? (
                                            <Typography variant="body2" color="textSecondary">
                                                Kiralık - Süre: {item.rental_period} Ay - Fiyat: {item.rental_price}₺
                                            </Typography>
                                        ) : (
                                            <Typography variant="body2" color="textSecondary">
                                                Satılık - Fiyat: {item.product.selling_price}₺
                                            </Typography>
                                        )}

                                        {!item.is_rental && (
                                            <Box mt={1} display="flex" justifyContent="center" alignItems="center">
                                                <Button
                                                    onClick={() => handleDecreaseQuantity(item)}
                                                    disabled={quantities[item.id] <= 1}
                                                    sx={{ padding: '6px 12px' }}
                                                >
                                                    -
                                                </Button>
                                                <Typography variant="h6" mx={2}>
                                                    {quantities[item.id] || item.quantity}
                                                </Typography>
                                                <Button
                                                    onClick={() => handleIncreaseQuantity(item)}
                                                    sx={{ padding: '6px 12px' }}
                                                >
                                                    +
                                                </Button>
                                            </Box>
                                        )}
                                    </Box>
                                    <IconButton
                                        onClick={() => removeFromCart(item.id)}
                                        sx={{ color: 'red', fontSize: '20px', '&:hover': { color: 'darkred' } }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </ListItem>
                            ))
                        ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                <Image
                                    src="https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/basket/empty-cart.png"
                                    alt="Boş Sepet"
                                    width={90}
                                    height={90}
                                    layout="intrinsic" // Bu özellik, görüntülerin orantılı olmasını sağlar
                                    style={{ maxWidth: '100%', height: 'auto' }} // Resmin boyutunu sınırlayarak duyarlı hale getirir
                                />
                                <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
                                    Sepetiniz boş.
                                </Typography>
                                <Link href="/" passHref>
                                    <Button variant="contained" color="primary" onClick={onClose}>
                                        Alışverişe Başla
                                    </Button>
                                </Link>
                            </Box>
                        )}
                    </List>
                </Container>

                <Box sx={{ padding: 2, backgroundColor: 'background.paper', borderTop: '1px solid', borderColor: 'divider' }}>
                    {cartItems.length > 0 && (
                        <>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Toplam: {totalPrice}₺
                            </Typography>
                            <Link href="/checkout" passHref>
                                <Button fullWidth variant="contained" color="primary" onClick={onClose}>
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
