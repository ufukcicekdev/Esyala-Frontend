import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  TextField, 
  Button, 
  CircularProgress, 
  Box, 
  useTheme
} from "@mui/material";
import axios from "axios";
import { useAlert } from "@/app/context/AlertContext";

const prodUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Profile {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string;
  tckn: string;
}

interface ProfileEditDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (updatedProfile: Profile) => void;
}

const ProfileEditDialog: React.FC<ProfileEditDialogProps> = ({ open, onClose, onSave }) => {
  const [updatedProfile, setUpdatedProfile] = useState<Profile>({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    birth_date: "",
    tckn: "",
  });
  const [loading, setLoading] = useState(false);
  const showAlert = useAlert();
  const theme = useTheme();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId: string | null = user ? user.id : null;
  const accessToken: string | null = localStorage.getItem("access_token");

  useEffect(() => {
    if (open && userId && accessToken) {
      setLoading(true);
      axios
        .get(`${prodUrl}/customerauth/user/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setUpdatedProfile(response.data);
          } else {
            console.error("Profil verisi alınırken bir sorun oluştu");
          }
        })
        .catch((error) => {
          console.error("Profil verisi alınırken bir hata oluştu:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [open, userId, accessToken]);

  const handleSave = async () => {
    if (!userId || !accessToken) {
      console.error("Kullanıcı ID veya access token bulunamadı");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(
        `${prodUrl}/customerauth/user/profile/update/${userId}`,
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.status === true) {
        onSave(updatedProfile);
        showAlert("success", response.data.message);
        onClose();
      } else {
        showAlert("error", "Bir hata oluştu");
      }
    } catch (error: unknown) {
      if (error instanceof Error && "response" in error) {
        const axiosError = error as { response: { data: { message: string } } };
        showAlert("error", axiosError.response.data.message || "Bir hata oluştu");
      } else {
        showAlert("error", "Beklenmeyen bir hata oluştu");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" sx={{
      "& .MuiDialogTitle-root": {
        fontWeight: "bold",
        backgroundColor: theme.palette.primary.main,
        color: "white",
        padding: theme.spacing(2),
      },
      "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
      },
    }}>
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
        Profil Bilgilerini Düzenle
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TextField
              label="Kullanıcı Adı"
              name="username"
              value={updatedProfile.username || ""}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Ad"
              name="first_name"
              value={updatedProfile.first_name || ""}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Soyad"
              name="last_name"
              value={updatedProfile.last_name || ""}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="E-posta"
              name="email"
              value={updatedProfile.email || ""}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Doğum Tarihi"
              name="birth_date"
              type="date"
              value={updatedProfile.birth_date || ""}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <TextField
              label="TCKN"
              name="tckn"
              value={updatedProfile.tckn || ""}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          İptal
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          variant="contained"
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? "Kaydediliyor..." : "Kaydet"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileEditDialog;
