import React, { FC, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useAlert } from "@/app/context/AlertContext";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void; // Register'e geçiş fonksiyonu
  onSwitchToForgotPassword: () => void; // Şifre sıfırlama fonksiyonu
}

const LoginDialog: FC<LoginDialogProps> = ({ open, onClose, onSwitchToRegister, onSwitchToForgotPassword }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const showAlert = useAlert();

  const handleSubmit = async () => {
    try {
      const response = await instance.post("/customerauth/user/login/", {
        email,
        password,
      });
      const { token, user, message } = response.data;

      if (message === "Giriş Başarılı") {
        localStorage.setItem("access_token", token.access);
        localStorage.setItem("refresh_token", token.refresh);
        localStorage.setItem("user", JSON.stringify(user));
        showAlert("error", message);
        onClose();
        window.location.reload();
      } else {
        showAlert("error", message);
       
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Giriş Yap</DialogTitle>
      <DialogContent>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Şifre"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Kapat
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Giriş Yap
        </Button>
        <Button onClick={onSwitchToRegister} color="secondary">
          Üye Ol
        </Button>
        <Button onClick={onSwitchToForgotPassword} color="default">
          Şifremi Unuttum
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
