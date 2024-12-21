import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    CardActions,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    useTheme,
} from "@mui/material";
import Link from "next/link";
import { getOrderDetailApi, getOrdersApi } from "@/lib/customerAuthApi/customerauth_api";
import { useAlert } from "@/app/context/AlertContext";

interface Order {
    order_number: string;
    total_amount: number;
    status_display: string;
    created_at: string;
}

interface OrderDetail {
    order_number: string;
    order_adress: string;
    billing_adress: string;
    total_amount: string;
    status_display: string;
    order_items: Array<{
        product: {
            id: number;
            name: string;
            first_image: {
                image: string;
                img_alt: string;
                img_title: string;
            };
            slug: string;
        };
        quantity: number;
        selling_price: string;
        subtotal: string;
    }>;
    order_city: { name: string };
    order_neighborhood: { name: string };
    order_region: { name: string };
}

const OrderList: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
    const theme = useTheme();
    const showAlert = useAlert();

    useEffect(() => {
        const fetchOrders = async () => {    
            try {
                const response =  await getOrdersApi();
                if (response.status === true) {
                    setOrders(response.orders);
                    setLoading(false);
                }
                else{
                    showAlert("error", response.message);
                }
            } catch (error) {
                console.error("Error fetching orders", error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleOpenDialog = async (orderNumber: string) => {
        try {
            const response = await getOrderDetailApi(orderNumber);
            setOrderDetail(response.data.orders[0]);
            setOpenDialog(true);
        } catch (error) {
            console.error("Error fetching order details", error);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setOrderDetail(null);
    };

    if (loading) {
        return <Typography>Yükleniyor...</Typography>;
    }

    return (
        <div>
            <Grid container spacing={3}>
                {orders.map((order) => (
                    <Grid item xs={12} sm={6} md={4} key={order.order_number}>
                        <Card sx={{
                            boxShadow: 3, // Gölge ekledim
                            borderRadius: 2, // Köşe yuvarlama
                            '&:hover': {
                                boxShadow: 6, // Hover üzerine daha belirgin bir gölge
                                transform: 'scale(1.05)', // Hover ile kart büyümesi
                                transition: 'transform 0.3s, box-shadow 0.3s', // Yumuşak geçiş
                            }
                        }}>
                            <CardContent>
                                <Typography variant="h6" noWrap sx={{ fontWeight: 'bold' }}>
                                    Sipariş Numarası: {order.order_number}
                                </Typography>
                                <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
                                    Toplam Tutar: <strong>{order.total_amount}₺</strong>
                                </Typography>
                                <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
                                    Durum: {order.status_display}
                                </Typography>
                                <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
                                    Tarih: {new Date(order.created_at).toLocaleDateString()}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => handleOpenDialog(order.order_number)}
                                    sx={{
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            backgroundColor: 'primary.main',
                                            color: 'white',
                                        }
                                    }}
                                >
                                    Detay
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>


            {/* Detaylar Dialog'u */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                fullWidth
                maxWidth="md"
                sx={{
                    "& .MuiDialogTitle-root": {
                        fontWeight: "bold",
                        backgroundColor: theme.palette.primary.main,
                        color: "white",
                        padding: theme.spacing(2),
                    },
                    "& .MuiDialogContent-root": {
                        padding: theme.spacing(2),
                    },
                    "& .MuiDialogActions-root": {
                        padding: theme.spacing(1),
                    },
                }}
            >
                <DialogTitle>Sipariş Detayları</DialogTitle>
                <DialogContent>
                    {orderDetail && (
                        <div>
                            <Typography variant="h6" paragraph>
                                Sipariş Numarası: <strong>{orderDetail.order_number}</strong>
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body2">Sipariş Adresi:</Typography>
                                    <Typography variant="body1">{orderDetail.order_adress}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body2">Fatura Adresi:</Typography>
                                    <Typography variant="body1">{orderDetail.billing_adress}</Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="body2">Toplam Tutar:</Typography>
                                    <Typography variant="body1" color="primary">
                                        {orderDetail.total_amount}₺
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="body2">Durum:</Typography>
                                    <Typography variant="body1">{orderDetail.status_display}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="body2">Şehir - Semt - Bölge:</Typography>
                                    <Typography variant="body1">
                                        {orderDetail.order_city.name} - {orderDetail.order_neighborhood.name} - {orderDetail.order_region.name}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Typography variant="h6" sx={{ marginTop: 3 }}>Sipariş Kalemleri:</Typography>

                            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                                <Table aria-label="order details table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Ürün</TableCell>
                                            <TableCell>Adet</TableCell>
                                            <TableCell>Fiyat</TableCell>
                                            <TableCell>Ara Toplam</TableCell>
                                            <TableCell>Resim</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orderDetail.order_items.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Link href={`/product/${item.product.slug}`} passHref>
                                                        <Typography
                                                            variant="body2"
                                                            color="primary"
                                                            sx={{
                                                                textDecoration: "underline",
                                                                display: "block",
                                                                '&:hover': {
                                                                    color: theme => theme.palette.secondary.main, // Hoverda renk değişimi
                                                                    textDecoration: 'none', // Alt çizgi kaybolur
                                                                    transform: 'scale(1.05)', // Hover ile biraz büyüme efekti
                                                                    transition: 'all 0.3s ease', // Yumuşak geçiş
                                                                },
                                                            }}
                                                        >
                                                            {item.product.name}
                                                        </Typography>
                                                    </Link>
                                                </TableCell>
                                                <TableCell>{item.quantity}</TableCell>
                                                <TableCell>{item.selling_price}₺</TableCell>
                                                <TableCell>{item.subtotal}₺</TableCell>
                                                <TableCell>
                                                    {item.product.first_image && (
                                                        <Link href={`/product/${item.product.slug}`} passHref>
                                                            <img
                                                                src={item.product.first_image.image}
                                                                alt={item.product.first_image.img_alt}
                                                                title={item.product.first_image.img_title}
                                                                style={{
                                                                    width: "50px",
                                                                    objectFit: "cover",
                                                                    borderRadius: "4px",
                                                                }}
                                                            />
                                                        </Link>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>

                                </Table>
                            </TableContainer>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Kapat
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default OrderList;
