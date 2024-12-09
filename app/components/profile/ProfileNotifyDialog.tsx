import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAlert } from "@/app/context/AlertContext";

interface ProfileNotifyDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (notifications: NotificationsSettings) => void;
}

interface NotificationsSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
}

const ProfileNotifyDialog: React.FC<ProfileNotifyDialogProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [notifications, setNotifications] = React.useState<NotificationsSettings>({
    emailNotifications: false,
    smsNotifications: false,
  });

  const showAlert = useAlert();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Mobil ekran boyutlarını tespit etmek için

  useEffect(() => {
    const fetchNotificationSettings = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId: string | null = user ? user.id : null;
      const accessToken: string | null = localStorage.getItem("access_token");

      const prodUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

      if (userId && accessToken && prodUrl) {
        try {
          // GET isteği ile bildirim ayarlarını al
          const response = await fetch(`${prodUrl}/customerauth/user/notifications/${userId}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${accessToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            // API'den gelen veriyi uyarlıyoruz
            setNotifications({
              emailNotifications: data.receive_email_notifications,
              smsNotifications: data.receive_sms_notifications,
            });
          } else {
            console.error("Bildirim ayarları alınamadı");
          }
        } catch (error) {
          console.error("API isteği sırasında hata oluştu", error);
        }
      } else {
        console.error("User ID, access token veya API URL eksik");
      }
    };

    if (open) {
      fetchNotificationSettings();  // Dialog açıldığında bildirim ayarlarını çek
    }
  }, [open]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setNotifications((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSave = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId: string | null = user ? user.id : null;
    const accessToken: string | null = localStorage.getItem("access_token");

    const prodUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // API URL'sini çevresel değişkenden al

    if (userId && accessToken && prodUrl) {
      try {
        // PUT isteği ile bildirim ayarlarını güncelle
        const response = await fetch(`${prodUrl}/customerauth/user/notifications/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            receive_email_notifications: notifications.emailNotifications,
            receive_sms_notifications: notifications.smsNotifications,
          }),
        });

        if (response.ok) {
          onSave(notifications);  // Bildirimleri kaydet
          showAlert("success", "Bildirimler Güncellendi");
          onClose();  // Dialog'u kapat
        } else {
            showAlert("error", "Bildirimler güncellenemedi");
        }
      } catch (error) {
        console.error("API isteği sırasında hata oluştu", error);
      }
    } else {
      console.error("User ID, access token veya API URL eksik");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
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
      }}
    >
      <DialogTitle>Bildirim Ayarları</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Bildirim tercihlerinizi seçin:
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={notifications.emailNotifications}
              onChange={handleCheckboxChange}
              name="emailNotifications"
            />
          }
          label="E-posta ile bildirim al"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={notifications.smsNotifications}
              onChange={handleCheckboxChange}
              name="smsNotifications"
            />
          }
          label="SMS ile bildirim al"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" sx={{ width: isMobile ? "100%" : "auto" }}>
          İptal
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained" sx={{ width: isMobile ? "100%" : "auto" }}>
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileNotifyDialog;
