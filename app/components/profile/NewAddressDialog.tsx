import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Grid,
} from "@mui/material";
import axios from "axios";
import { createAddressApi } from "@/lib/customerAuthApi/customerauth_api";
import { useAlert } from "@/app/context/AlertContext";

interface AddAddressDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (newAddress: any) => void;
}

const AddAddressDialog: React.FC<AddAddressDialogProps> = ({ open, onClose, onSave }) => {
    const [addressType, setAddressType] = useState(1);  // Varsayılan değer: Sipariş Adresi
    const [addressModel, setAddressModel] = useState(2);  // Varsayılan değer: Sipariş Adresi
    const [username, setUsername] = useState("");
    const [usersurname, setUsersurname] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState<string>("");
    const [district, setDistrict] = useState<string>("");
    const [neighborhood, setNeighborhood] = useState<string>("");
    const [addressName, setAddressName] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [firmName, setFirmName] = useState("");
    const [firmTaxCode, setFirmTaxCode] = useState("");
    const [firmTaxHome, setFirmTaxHome] = useState("");

    const [cityData, setCityData] = useState<any>(null); // Şehir verisi burada saklanacak
    const [districts, setDistricts] = useState<any[]>([]);
    const [neighborhoods, setNeighborhoods] = useState<any[]>([]);
    const showAlert = useAlert();

    const prodUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        if (open) {
            axios.get(`${prodUrl}/customerauth/user/city/`)
                .then(response => {
                    setCityData(response.data.data); // cityData'ya doğru veriyi atıyoruz
                })
                .catch(error => console.error("City verisi alınırken hata oluştu: ", error));
        }
    }, [open]);

    useEffect(() => {
        if (city) {
            axios.get(`${prodUrl}/customerauth/user/district/${city}`)
                .then(response => {
                    setDistricts(response.data.data);
                    setDistrict(""); // İlçe ve Mahalle alanlarını temizliyoruz
                    setNeighborhood("");
                })
                .catch(error => console.error("District verisi alınırken hata oluştu: ", error));
        }
    }, [city]);

    useEffect(() => {
        if (district) {
            axios.get(`${prodUrl}/customerauth/user/neighborhood/${district}`)
                .then(response => {
                    setNeighborhoods(response.data.data);
                })
                .catch(error => console.error("Neighborhood verisi alınırken hata oluştu: ", error));
        }
    }, [district]);

    const handleSave = async () => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const userId: string | null = user ? user.id : null;
        const accessToken: string | null = localStorage.getItem("access_token");


        if (userId && accessToken) {
            const addressData = {
                address_type: addressType,
                address_model: addressModel,
                username,
                usersurname,
                phone,
                city: city,
                region: district,
                neighborhood: neighborhood,
                address_name: addressName,
                address_line1: addressLine1,
                postal_code: postalCode,
                firm_name: firmName,
                firm_taxcode: firmTaxCode,
                firm_tax_home: firmTaxHome,
                user_id: userId,
            };

            try {
                const response = await createAddressApi(addressData);

                if (response.status === true) {
                    showAlert("success", "Başarıyla eklendi");
                    onSave(response.data);
                    resetForm();
                    onClose();
                } else {
                    showAlert("error", response.message || "Adres kaydedilirken bir hata oluştu");
                }
            } catch (error) {
                console.error("Adres kaydedilirken bir hata oluştu: ", error);
                showAlert("error", "Adres kaydedilirken bir hata oluştu");
            }


        }
    };

    const resetForm = () => {
        setUsername("");
        setUsersurname("");
        setPhone("");
        setCity("");
        setDistrict("");
        setNeighborhood("");
        setAddressName("");
        setAddressLine1("");
        setPostalCode("");
        setFirmName("");
        setFirmTaxCode("");
        setFirmTaxHome("");
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Yeni Adres Ekle</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Adres Tipi</InputLabel>
                    <Select
                        value={addressType}
                        onChange={(e) => setAddressType(Number(e.target.value))}
                        label="Adres Tipi"
                    >
                        <MenuItem value={1}>Bireysel</MenuItem>
                        <MenuItem value={2}> Kurumsal</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Adres Modeli</InputLabel>
                    <Select
                        value={addressModel}
                        onChange={(e) => setAddressModel(Number(e.target.value))}
                        label="Adres Modeli"
                    >
                        <MenuItem value={1}>Fatura Adresi</MenuItem>
                        <MenuItem value={2}> Sipariş Adresi</MenuItem>
                    </Select>
                </FormControl>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Ad"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Soyad"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={usersurname}
                            onChange={(e) => setUsersurname(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Telefon"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Grid>
                </Grid>

                {/* İl alanı ekledik */}
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>İl</InputLabel>
                            <Select
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                label="İl"
                            >
                                {cityData && cityData.name && (
                                    <MenuItem value={cityData.city_id}>
                                        {cityData.name}
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* İlçe ve Mahalle alanlarını yan yana yerleştiriyoruz */}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>İlçe</InputLabel>
                            <Select
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                label="İlçe"
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: 200, // Menü yüksekliğini sınırlıyoruz
                                            overflow: 'auto', // Kaydırma ekliyoruz
                                        },
                                    },
                                }}
                            >
                                {districts?.map((district: any) => (
                                    <MenuItem key={district.district_id} value={district.district_id}>
                                        {district.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Mahalle</InputLabel>
                            <Select
                                value={neighborhood}
                                onChange={(e) => setNeighborhood(e.target.value)}
                                label="Mahalle"
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: 200, // Menü yüksekliğini sınırlıyoruz
                                            overflow: 'auto', // Kaydırma ekliyoruz
                                        },
                                    },
                                }}
                            >
                                {neighborhoods?.map((neighborhood: any) => (
                                    <MenuItem key={neighborhood.neighborhood_id} value={neighborhood.neighborhood_id}>
                                        {neighborhood.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>


                <TextField
                    label="Adres Adı"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={addressName}
                    onChange={(e) => setAddressName(e.target.value)}
                />
                <TextField
                    label="Adres Satırı 1"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                />
                <TextField
                    label="Posta Kodu"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={postalCode}
                    onChange={(e) => {
                        // Sadece sayılar ve en fazla 5 karakter kabul edilsin
                        const value = e.target.value;
                        if (/^\d{0,5}$/.test(value)) {  // 0 ila 5 arası rakamlar
                            setPostalCode(value);
                        }
                    }}
                    inputProps={{
                        maxLength: 5,  // Maksimum 5 karakter
                    }}
                />

                {/* Fatura adresi alanları sadece "Fatura Adresi" seçildiğinde görünsün */}
                {addressType === 2 && (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Firma Adı"
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                value={firmName}
                                onChange={(e) => setFirmName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Firma Vergi No"
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                value={firmTaxCode}
                                onChange={(e) => setFirmTaxCode(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Firma Vergi Dairesi"
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                value={firmTaxHome}
                                onChange={(e) => setFirmTaxHome(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>İptal</Button>
                <Button onClick={handleSave} color="primary">Kaydet</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddAddressDialog;




