import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Grid,
    Button,
    Box,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAlert } from "@/app/context/AlertContext";
import EditAddressDialog from "./EditAddressDialog";

const prodUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Address {
    id: number;
    address_type: number;
    address_model: number;
    username: string;
    usersurname: string;
    phone: string;
    city: { name: string };
    region: { name: string };
    neighborhood: { name: string };
    address_name: string;
    address_line1: string;
    postal_code: string;
    firm_name: string;
    firm_taxcode: string;
    firm_tax_home: string;
    is_default: boolean;
}

interface AddressesProps {
    addressModel: "billing" | "shipping";
}

const ADDRESS_MODEL_MAP: { [key: string]: number } = {
    billing: 1, // Fatura adresi
    shipping: 2, // Sipariş adresi
};

const Addresses: React.FC<AddressesProps> = ({ addressModel }) => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const showAlert = useAlert();

    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [addressToDelete, setAddressToDelete] = useState<number | null>(null);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId: string | null = user ? user.id : null;
    const accessToken: string | null = localStorage.getItem("access_token");

    const fetchAddresses = () => {
        if (userId && accessToken) {
            setLoading(true);
            axios
                .get(`${prodUrl}customerauth/user/addresses/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((response) => {
                    if (response.data.status === true) {
                        const filteredAddresses = response.data.address.filter(
                            (address: Address) =>
                                address.address_model === ADDRESS_MODEL_MAP[addressModel]
                        );
                        setAddresses(filteredAddresses);
                    } else {
                        showAlert("error", "Adres verisi alınamadı");
                    }
                })
                .catch((error) => {
                    console.error("Adres verisi alınırken bir hata oluştu:", error);
                    showAlert("error", "Adres verisi alınırken bir hata oluştu");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, [userId, accessToken, addressModel]);

    const handleEdit = (address: Address) => {
        setSelectedAddress(address);
        setEditDialogOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        setAddressToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (addressToDelete) {
            deleteAddress(addressToDelete);
        }
        setDeleteDialogOpen(false);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setAddressToDelete(null);
    };

    const deleteAddress = (id: number) => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            axios
                .delete(`${prodUrl}customerauth/user/addresses/delete/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((response) => {
                    if (response.data.status === true) {
                        showAlert("success", "Adres başarıyla silindi.");
                        fetchAddresses(); // Adresleri yeniden yükleyin
                    } else {
                        showAlert("error", "Adres silinemedi.");
                    }
                })
                .catch((error) => {
                    console.error("Adres silinirken bir hata oluştu:", error);
                    showAlert("error", "Adres silinirken bir hata oluştu.");
                });
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (addresses.length === 0) {
        return (
            <Typography>
                Henüz kayıtlı {addressModel === "billing" ? "fatura" : "sipariş"} adresiniz yok.
            </Typography>
        );
    }

    return (
        <>
            <Grid container spacing={3}>
                {addresses.map((address) => (
                    <Grid item xs={12} sm={6} md={4} key={address.id}>
                        <Card
                            sx={{
                                boxShadow: 3,
                                borderRadius: 2,
                                p: 2,
                                position: "relative",
                                transition: "transform 0.3s, box-shadow 0.3s",
                                "&:hover": {
                                    boxShadow: 6,
                                    transform: "scale(1.05)",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    display: "flex",
                                    gap: 1,
                                }}
                            >
                                <IconButton
                                    size="small"
                                    color="primary"
                                    onClick={() => handleEdit(address)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    color="secondary"
                                    onClick={() => handleDeleteClick(address.id)} // Silme butonuna tıklayınca onay dialog'unu açar
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>

                            <CardContent>
                                <Typography variant="h6">{address.address_name}</Typography>
                                <Typography variant="body2">{address.address_line1}</Typography>
                                <Typography variant="body2">{address.city.name}, {address.region.name}</Typography>
                                <Typography variant="body2">{address.neighborhood.name}</Typography>
                                <Typography variant="body2">{address.phone}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Silme onayı için Dialog */}
            <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
                <DialogTitle>Adres Silme Onayı</DialogTitle>
                <DialogContent>
                    <Typography>Bu adresi silmek istediğinizden emin misiniz?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="secondary">
                        İptal
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="primary">
                        Evet, Sil
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Adres düzenleme Dialog'u */}
            {selectedAddress && (
                <EditAddressDialog
                    open={editDialogOpen}
                    onClose={() => setEditDialogOpen(false)}
                    address={selectedAddress}
                />
            )}
        </>
    );
};

export default Addresses;
