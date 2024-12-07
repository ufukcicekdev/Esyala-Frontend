import React, { FC, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
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

  const handleSubmit = async () => {
    try {
      const response = await instance.post("/customerauth/user/login/", {
        email,
        password,
      });
      const { token, user, message, status } = response.data;

      if (status === true) {
        localStorage.setItem("access_token", token.access);
        localStorage.setItem("refresh_token", token.refresh);
        localStorage.setItem("user", JSON.stringify(user));
        showAlert("success", message);
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
