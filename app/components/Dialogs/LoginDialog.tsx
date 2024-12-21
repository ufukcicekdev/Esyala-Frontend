import React, { FC, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useAlert } from "@/app/context/AlertContext";
import { useAuth } from "@/app/context/AuthContext";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void; // Register'e geçiş fonksiyonu
  onSwitchToForgotPassword: () => void; // Şifre sıfırlama fonksiyonu
}

const LoginDialog: FC<LoginDialogProps> = ({
  open,
  onClose,
  onSwitchToRegister,
  onSwitchToForgotPassword,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const showAlert = useAlert();
  const { login } = useAuth();

  const handleSubmit = async () => {
    setError(null); // Hata mesajını temizle
    if (!email.trim()) {
      setError("Email alanı boş olamaz.");
      return;
    }
    if (!password.trim()){
      setError("Şifre alanı boş olamaz.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Geçerli bir email adresi giriniz.");
      return;
    }
    
    try {
      const response = await login(email, password);
      if (response.status === true) {
        showAlert("success", "Giriş Başarılı");
        onClose();
      } else {
        setError(response.message || "Giriş başarısız.");
        showAlert("error", response.message || "Giriş başarısız.");
      }
    } catch (err) {
      console.error("Giriş işlemi sırasında bir hata oluştu:", err);
      setError("Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.");
      showAlert("error", "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      sx={{
        "& .MuiDialogTitle-root": {
          fontSize: "1.25rem",
          fontWeight: "bold",
        },
        "& .MuiDialogContent-root": {
          paddingBottom: "1rem",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Giriş Yap
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
        {error && <div style={{ color: "red", marginBottom: "8px" }}>{error}</div>}
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Şifre"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
        />
      </DialogContent>

      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px 24px",
        }}
      >
        <Button
          onClick={onSwitchToForgotPassword}
          color="secondary"
          sx={{
            textTransform: "none",
            fontWeight: "600",
            fontSize: "0.9rem",
            marginRight: "auto",
          }}
        >
          Şifremi Unuttum
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{
            textTransform: "none",
            fontWeight: "600",
            fontSize: "0.9rem",
            width: "100px",
          }}
        >
          Giriş Yap
        </Button>
        <Button
          onClick={onSwitchToRegister}
          color="secondary"
          sx={{
            textTransform: "none",
            fontWeight: "600",
            fontSize: "0.9rem",
          }}
        >
          Üye Ol
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
