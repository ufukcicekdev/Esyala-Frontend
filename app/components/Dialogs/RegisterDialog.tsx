import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useAlert } from "@/app/context/AlertContext";

interface RegisterDialogProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const prodUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const RegisterDialog: React.FC<RegisterDialogProps> = ({
  open,
  onClose,
  onSwitchToLogin,
}) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const showAlert = useAlert();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { username: "", email: "", password: "", confirmPassword: "" };

    if (!formData.username) {
      newErrors.username = "Kullanıcı adı gereklidir.";
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = "E-posta gereklidir.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Geçersiz e-posta adresi.";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Şifre gereklidir.";
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Şifreler eşleşmiyor.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const requestBody = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        password2: formData.confirmPassword,
      };

      try {
        const response = await fetch(`${prodUrl}/customerauth/user/register/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        if (!response.ok) {
          if (data.messages && Array.isArray(data.messages)) {
            data.messages.forEach((message: string) => {
              showAlert("error", message);
            });
          } else {
            showAlert("error", "Bir hata oluştu. Lütfen tekrar deneyin.");
          }
        } else {
          showAlert("success", "Kayıt başarılı! Lütfen e-postanızı doğrulayın.");
          onClose();
        }
      } catch (error) {
        showAlert("error", "Sunucu hatası. Lütfen daha sonra tekrar deneyin.");
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Üye Ol
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{
            position: "absolute",
            right: "8px",
            top: "8px",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ mb: 2, color: "gray" }}
        >
          Hesap oluşturmak için aşağıdaki bilgileri doldurun.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Kullanıcı Adı"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="E-posta"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Şifre"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Şifre Tekrarı"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          pb: 3,
        }}
      >
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Kayıt Ol
        </Button>
        <Typography variant="body2" align="center">
          Zaten bir hesabınız var mı?{" "}
          <Button
            onClick={onSwitchToLogin}
            color="primary"
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            Giriş Yapın
          </Button>
        </Typography>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterDialog;
