// RegisterDialog.tsx
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface RegisterDialogProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void; // Login'e geçiş fonksiyonu
}

const RegisterDialog: React.FC<RegisterDialogProps> = ({ open, onClose, onSwitchToLogin }) => {
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

  const handleSubmit = () => {
    if (validateForm()) {
      // Kayıt işlemini burada yapabilirsiniz
      console.log("Kayıt başarılı!", formData);
      onClose(); // Form gönderildiğinde dialog kapanabilir
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Üye Ol</DialogTitle>
      <DialogContent>
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
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Kapat
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Kayıt Ol
        </Button>
      </DialogActions>
      <Typography variant="body2" align="center" style={{ marginTop: "10px" }}>
        Zaten Üye misiniz?{" "}
        <Button onClick={onSwitchToLogin} color="primary">
          Giriş Yapın
        </Button>
      </Typography>
    </Dialog>
  );
};

export default RegisterDialog;
