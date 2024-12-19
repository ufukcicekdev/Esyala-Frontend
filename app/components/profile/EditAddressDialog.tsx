"use client";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Dialog,
  TextField,
  Grid
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Address {
  id: number;
  address_type: number;
  address_model: number;
  username: string;
  usersurname: string;
  phone: string;
  city: { id: number; name: string };
  region: { district_id: number; name: string };
  neighborhood: { neighborhood_id: number; name: string };
  address_name: string;
  address_line1: string;
  postal_code: string;
  firm_name: string;
  firm_taxcode: string;
  firm_tax_home: string;
  is_default: boolean;
}

interface EditAddressDialogProps {
  open: boolean;
  onClose: () => void;
  address: Address;
  onSave: () => void;
}

const EditAddressDialog: React.FC<EditAddressDialogProps> = ({
  open,
  onClose,
  address,
  onSave,
}) => {
  const [formData, setFormData] = useState<Address>({ ...address });
  const [cities, setCities] = useState<any[]>([]); // Şehirler
  const [regions, setRegions] = useState<any[]>([]); // Bölgeler
  const [neighborhoods, setNeighborhoods] = useState<any[]>([]); // Mahalleler
  const [addressType, setAddressType] = useState<number>(address.address_type); // Adres Tipi
  const [addressModel, setAddressModel] = useState<number>(address.address_model); // Adres Modeli

  const prodUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (open) {
      // Şehir verisini alıyoruz
      axios.get(`${prodUrl}/customerauth/user/city/`)
        .then(response => {
          if (response.data && response.data.data) {
            setCities([response.data.data]);  // Veriyi işleme
            setFormData(prev => ({
              ...prev,
              city: response.data.data.city_id == address.city.id ? response.data.data : null
            }));
          } else {
            console.error("Beklenen veri formatı alınamadı.");
          }
        })
        .catch(error => console.error("City verisi alınırken hata oluştu: ", error));
    }
  }, [open, address.city]);

  useEffect(() => {
    if (formData.city && formData.city.id) {
      // Şehir seçildikten sonra, ilçeleri alıyoruz
      axios.get(`${prodUrl}/customerauth/user/district/${formData.city.id}`)
        .then(response => {
          setRegions(response.data.data);
          // İlçe verisini formData'ya set ediyoruz
          setFormData(prev => ({
            ...prev,
            region: response.data.data.find((region: any) => region.district_id === address.region.district_id)
          }));
        })
        .catch(error => console.error("District verisi alınırken hata oluştu: ", error));
    }
  }, [formData.city]);

  useEffect(() => {
    if (formData.region && formData.region.district_id) {
      // Bölge seçildikten sonra, mahalleleri alıyoruz
      axios.get(`${prodUrl}/customerauth/user/neighborhood/${formData.region.district_id}`)
        .then(response => {
          setNeighborhoods(response.data.data);
          // Mahalle verisini formData'ya set ediyoruz
          setFormData(prev => ({
            ...prev,
            neighborhood: response.data.data.find((neighborhood: any) => neighborhood.neighborhood_id === address.neighborhood.neighborhood_id)
          }));
        })
        .catch(error => console.error("Neighborhood verisi alınırken hata oluştu: ", error));
    }
  }, [formData.region]);

  const handleCityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const cityId = event.target.value as number;
    setFormData((prev) => ({
      ...prev,
      city: cities.find((city: any) => city.id === cityId),
      region: null, // Bölgeyi sıfırlıyoruz
      neighborhood: null, // Mahalleyi sıfırlıyoruz
    }));
  };

  const handleRegionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const regionId = event.target.value as number;
    setFormData((prev) => ({
      ...prev,
      region: regions.find((region: any) => region.district_id === regionId),
      neighborhood: null, // Mahalleyi sıfırlıyoruz
    }));
  };

  const handleNeighborhoodChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const neighborhoodId = event.target.value as number;
    setFormData((prev) => ({
      ...prev,
      neighborhood: neighborhoods.find(
        (neighborhood: any) => neighborhood.neighborhood_id === neighborhoodId
      ),
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name!]: type === "checkbox" ? checked : value, // name kontrolü
    }));
  };

  const handleSubmit = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      
      // Sadece city.id'yi gönderecek şekilde formData'yı güncelle
      const dataToSend = {
        ...formData,
        city: formData.city?.id, // Şehir id'sini sadece gönder
        region: formData.region?.district_id, // Bölge id'sini sadece gönder
        neighborhood: formData.neighborhood?.neighborhood_id, // Mahalle id'sini sadece gönder
        address_type: addressType, // Adres tipi burada gönderiliyor
        address_model: addressModel,
      };
      
      await axios.put(
        `${prodUrl}/customerauth/user/addresses/edit/${address.id}/`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      onSave(); // Adres listesini güncellemek için callback
      onClose(); // Dialog penceresini kapat
    } catch (error) {
      console.error("Adres güncelleme hatası:", error);
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Adres Düzenle</DialogTitle>
      <DialogContent>
        {/* Adres Tipi */}
        
        <FormControl fullWidth margin="normal">
          <InputLabel>Adres Tipi</InputLabel>
          <Select
            value={addressType}
            onChange={(e) => setAddressType(Number(e.target.value))}
            label="Adres Tipi"
          >
            <MenuItem value={1}>Bireysel</MenuItem>
            <MenuItem value={2}>Kurumsal</MenuItem>
          </Select>
        </FormControl>

        {/* Adres Modeli */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Adres Modeli</InputLabel>
          <Select
            value={addressModel}
            onChange={(e) => setAddressModel(Number(e.target.value))}
            label="Adres Modeli"
          >
            <MenuItem value={1}>Fatura Adresi</MenuItem>
            <MenuItem value={2}>Sipariş Adresi</MenuItem>
          </Select>
        </FormControl>

        {/* Şehir seçimi */}
        <FormControl fullWidth margin="dense">
          <InputLabel>Şehir</InputLabel>
          <Select
            name="city"
            value={formData.city?.id || ""}
            onChange={handleCityChange}
          >
            {cities.map((city) => (
              <MenuItem key={city.id} value={city.id}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Bölge seçimi */}
        <FormControl fullWidth margin="dense">
          <InputLabel>Bölge</InputLabel>
          <Select
            name="region"
            value={formData.region?.district_id || ""}
            onChange={handleRegionChange}
          >
            {regions.map((region) => (
              <MenuItem key={region.district_id} value={region.district_id}>
                {region.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Mahalle seçimi */}
        <FormControl fullWidth margin="dense">
          <InputLabel>Mahalle</InputLabel>
          <Select
            name="neighborhood"
            value={formData.neighborhood?.neighborhood_id || ""}
            onChange={handleNeighborhoodChange}
          >
            {neighborhoods.map((neighborhood) => (
              <MenuItem key={neighborhood.neighborhood_id} value={neighborhood.neighborhood_id}>
                {neighborhood.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Diğer alanlar */}
        <TextField
          label="Adres Adı"
          fullWidth
          variant="outlined"
          margin="normal"
          value={formData.address_name}
          onChange={handleChange}
          name="address_name"
        />

        <TextField
          label="Adres Satırı"
          fullWidth
          variant="outlined"
          margin="normal"
          value={formData.address_line1}
          onChange={handleChange}
          name="address_line1"
        />

<TextField
          name="postal_code"
          label="Posta Kodu"
          fullWidth
          margin="dense"
          value={formData.postal_code}
          onChange={handleChange}
        />
        <TextField
          name="phone"
          label="Telefon"
          fullWidth
          margin="dense"
          value={formData.phone}
          onChange={handleChange}
        />

        {/* Fatura adresi alanları sadece "Fatura Adresi" seçildiğinde görünsün */}
        {addressType === 2 && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Firma Adı"
                fullWidth
                variant="outlined"
                margin="normal"
                value={formData.firm_name}
                onChange={handleChange}
                name="firm_name"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Vergi Numarası"
                fullWidth
                variant="outlined"
                margin="normal"
                value={formData.firm_taxcode}
                onChange={handleChange}
                name="firm_taxcode"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Firma Vergi Dairesi"
                fullWidth
                variant="outlined"
                margin="normal"
                value={formData.firm_tax_home}
                onChange={handleChange}
                name="firmTaxHome"
              />
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Vazgeç
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAddressDialog;
