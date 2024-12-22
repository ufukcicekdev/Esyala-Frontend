"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Box, Button, Grid, Typography, Select, MenuItem, FormControl, InputLabel, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit'; // EditIcon'ı unutmayın
import AddAddressDialog from '../components/profile/NewAddressDialog';
import EditAddressDialog from '../components/profile/EditAddressDialog';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const Checkout = () => {
    // Interface tanımlamaları
    interface ProductImage {
        image: string;
        img_alt: string;
        img_title: string;
    }

    interface Product {
        id: number;
        name: string;
        slug: string;
        first_image: ProductImage;
        selling_price: string;
        selling_old_price: string;
        purchase_price: string;
        in_stock: number;
        category: {
            name: string;
            slug: string;
        };
        discount_percentage: number;
        rental_prices: any[];
    }

    interface CartItem {
        id: number;
        product: Product;
        quantity: number;
        is_rental: boolean;
        rental_price: string | null;
        rental_period: string | null;
        selling_price: string;
        cart_id: number;
    }

    interface Address {
        id: number;
        address_type: number;
        address_model: number;
        username: string;
        usersurname: string;
        phone: string;
        city: { id: number; name: string } | null;
        region: { district_id: number; name: string } | null;
        neighborhood: { neighborhood_id: number; name: string } | null;
        address_name: string;
        address_line1: string;
        postal_code: string;
        firm_name: string;
        firm_taxcode: string;
        firm_tax_home: string;
        is_default: boolean;
    }

    interface Cart {
        id: number;
        user: number;
        session_key: string;
        cart_items: CartItem[];
        created_at: string;
        updated_at: string;
        order_completed: boolean;
        total_price: number;
    }

    interface CheckoutResponse {
        cart: Cart;
        addresses: Address[];
    }

    // State ve loading
    const [cart, setCart] = useState<Cart | null>(null);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedOrderAddress, setSelectedOrderAddress] = useState<Address | null>(null);
    const [selectedInvoiceAddress, setSelectedInvoiceAddress] = useState<Address | null>(null); // Fatura adresi
    const { cartItems, removeFromCart, totalPrice, updateQuantity } = useCart();
    const [addAddressDialogOpen, setAddAddressDialogOpen] = useState(false); // Yeni adres dialogu için state
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null); // Seçilen adres state

    // Varsayılan adreslerin ayarlanması
    useEffect(() => {
        const fetchCheckoutData = async () => {
            try {
                const accessToken = localStorage.getItem('access_token');
                const config = accessToken
                    ? { headers: { Authorization: `Bearer ${accessToken}` } }
                    : {};

                const response = await instance.get<CheckoutResponse>('/customerauth/checkout/', config);
                setCart(response.data.cart);
                setAddresses(response.data.addresses);

                // Varsayılan adresleri belirleyelim
                const orderDefault = response.data.addresses.filter(address => address.address_model === 2 && address.is_default)[0];
                const invoiceDefault = response.data.addresses.filter(address => address.address_model === 1 && address.is_default)[0];

                setSelectedOrderAddress(orderDefault || null);
                setSelectedInvoiceAddress(invoiceDefault || null);

            } catch (err) {
                setError('Bir hata oluştu. Lütfen tekrar deneyin.');
            } finally {
                setLoading(false);
            }
        };

        fetchCheckoutData();
    }, [addresses]); 

    const handleNewAddressSave = (newAddress: any) => {
        // Burada yeni adresi kaydetmek için gerekli işlemi yapın
        toggleAddAddressDialog(); // Dialogu kapat
    };

    const toggleAddAddressDialog = () => {
        setAddAddressDialogOpen(!addAddressDialogOpen); // Yeni adres dialogu için fonksiyon
    };

    const handleEdit = (address: Address) => {
        setSelectedAddress(address);  // Seçilen adresi state'e atıyoruz
        setEditDialogOpen(true);  // Edit dialogu açılıyor
    };

    // Ürün silme işlevi
    const handleRemoveItem = (itemId: number) => {
        removeFromCart(itemId);

        if (cart) {
            const updatedCartItems = cart.cart_items.filter(item => item.id !== itemId);
            setCart({
                ...cart,
                cart_items: updatedCartItems,
                total_price: updatedCartItems.reduce((total, item) => total + parseFloat(item.selling_price) * item.quantity, 0),
            });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Box sx={{ padding: 4, maxWidth: '1200px', margin: '0 auto' }}>
            <Grid container spacing={4}>
                {/* Yeni Adres Ekleme Butonu */}
                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={() => setAddAddressDialogOpen(true)}
                        sx={{ marginBottom: 2 }}
                    >
                        Yeni Adres Ekle
                    </Button>
                </Grid>

                {/* Sipariş Adresi */}
                {/* Sipariş Adresi */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ padding: 2, border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                        <Typography variant="h6" gutterBottom>
                            Sipariş Adresi
                        </Typography>
                        {/* Adres Seçimi */}
                        <FormControl fullWidth sx={{ marginBottom: '16px' }}>
                            <InputLabel>Sipariş Adresi Seç</InputLabel>
                            <Select
                                value={selectedOrderAddress?.id || ''}
                                onChange={(e) => {
                                    const addressId = e.target.value;
                                    setSelectedOrderAddress(addresses.find(address => address.id === addressId) || null);
                                }}
                                label="Sipariş Adresi Seç"
                            >
                                <MenuItem value="">Sipariş Adresi Seç</MenuItem>
                                {addresses.filter(address => address.address_model === 2).map(address => (
                                    <MenuItem key={address.id} value={address.id}>
                                        {address.address_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {selectedOrderAddress && (
                            <Box sx={{ marginTop: 2 }}>
                                <IconButton
                                    size="small"
                                    color="primary"
                                    onClick={() => handleEdit(selectedOrderAddress)} // Düzenleme butonu
                                >
                                    <EditIcon />
                                </IconButton>
                                <Typography><strong>Ad:</strong> {selectedOrderAddress.username} {selectedOrderAddress.usersurname}</Typography>
                                <Typography><strong>Telefon:</strong> {selectedOrderAddress.phone}</Typography>
                                <Typography><strong>Adres:</strong> {selectedOrderAddress.address_line1} - {selectedOrderAddress?.neighborhood?.name} - {selectedOrderAddress?.region?.name} - {selectedOrderAddress?.city?.name}</Typography>
                            </Box>
                        )}
                    </Box>
                </Grid>


                {/* Fatura Adresi */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ padding: 2, border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                        <Typography variant="h6" gutterBottom>
                            Fatura Adresi
                        </Typography>
                        <FormControl fullWidth sx={{ marginBottom: '16px' }}>
                            <InputLabel>Fatura Adresi Seç</InputLabel>
                            <Select
                                value={selectedInvoiceAddress?.id || ''}
                                onChange={(e) => {
                                    const addressId =  e.target.value;
                                    setSelectedInvoiceAddress(addresses.find(address => address.id === addressId) || null);
                                }}
                                label="Fatura Adresi Seç"
                            >
                                <MenuItem value="">Fatura Adresi Seç</MenuItem>
                                {addresses.filter(address => address.address_model === 1).map(address => (
                                    <MenuItem key={address.id} value={address.id}>
                                        {address.address_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {selectedInvoiceAddress && (
                            <Box sx={{ marginTop: 2 }}>
                                <IconButton
                                    size="small"
                                    color="primary"
                                    onClick={() => handleEdit(selectedInvoiceAddress)} // Burada selectedInvoiceAddress gönderiliyor
                                >
                                    <EditIcon />
                                </IconButton>
                                <Typography><strong>Ad:</strong> {selectedInvoiceAddress.username} {selectedInvoiceAddress.usersurname}</Typography>
                                <Typography><strong>Telefon:</strong> {selectedInvoiceAddress.phone}</Typography>
                                <Typography><strong>Adres:</strong> {selectedInvoiceAddress.address_line1} - {selectedInvoiceAddress?.neighborhood?.name} - {selectedInvoiceAddress?.region?.name} -  {selectedInvoiceAddress?.city?.name}</Typography>
                            </Box>
                        )}
                    </Box>
                </Grid>

                {/* Ödeme Özeti */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ padding: 2, border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                        <Typography variant="h6" gutterBottom>
                            Ödeme Özeti
                        </Typography>
                        <Typography><strong>Toplam Fiyat:</strong> {cart?.total_price}₺</Typography>
                    </Box>
                </Grid>

                {/* Ürün Listesi */}
                <Grid item xs={12}>
                    <Box sx={{ marginTop: 2 }}>
                        {cart?.cart_items.map(item => (
                            <Box
                                key={item.id}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderBottom: '1px solid #e0e0e0',
                                    padding: '8px 0',
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={item.product.first_image.image}
                                        alt={item.product.first_image.img_alt}
                                        style={{ width: '50px', height: '50px', marginRight: '16px' }}
                                    />
                                    <Typography>{item.product.name}</Typography>
                                </Box>
                                <Box>
                                    <Typography>{item.quantity} x {item.selling_price}₺</Typography>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        onClick={() => handleRemoveItem(item.id)}
                                    >
                                        Sil
                                    </Button>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Grid>
            </Grid>

            {addAddressDialogOpen && (
                <AddAddressDialog
                    open={addAddressDialogOpen}
                    onClose={toggleAddAddressDialog}
                    onSave={handleNewAddressSave}
                />
            )}

            {/* Düzenleme Adresi Dialogu */}
            {editDialogOpen && selectedAddress && (
                <EditAddressDialog
                    open={editDialogOpen}
                    onClose={() => setEditDialogOpen(false)}
                    address={selectedAddress}
                    fetchAddresses={undefined}
                />
            )}
        </Box>
    );
};

export default Checkout;
