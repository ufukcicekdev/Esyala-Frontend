import React, { FC, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { useAlert } from "@/app/context/AlertContext";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
  onSwitchToForgotPassword: () => void;
}

const LoginDialog: FC<LoginDialogProps> = ({
  open,
  onClose,
  onSwitchToRegister,
  onSwitchToForgotPassword,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
        "& .MuiDialog-paper": {
          borderRadius: "12px",
          padding: "24px",
          backgroundColor: "#f9f9f9",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Giriş Yap
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: "#9e9e9e",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography
          variant="body2"
          sx={{
            color: "#6c6c6c",
            mb: 3,
          }}
        >
          Hesabınıza giriş yapmak için bilgilerinizi girin.
        </Typography>
        <TextField
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            mb: 2,
          }}
        />
        <TextField
          label="Şifre"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={onSwitchToForgotPassword}
          sx={{
            mt: 1,
            textTransform: "none",
            fontSize: "0.9rem",
            color: "#007bff",
            alignSelf: "flex-start",
          }}
        >
          Şifremi Unuttum
        </Button>
        <Button
          onClick={handleSubmit}
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            textTransform: "none",
            fontWeight: "600",
            py: 1.5,
            backgroundColor: "#007bff",
            "&:hover": {
              backgroundColor: "#0056b3",
            },
          }}
        >
          Giriş Yap
        </Button>
        <Typography
          variant="body2"
          align="center"
          sx={{
            mt: 3,
            color: "#6c6c6c",
          }}
        >
          Hesabınız yok mu?{" "}
          <Button
            onClick={onSwitchToRegister}
            sx={{
              textTransform: "none",
              fontSize: "0.9rem",
              color: "#007bff",
            }}
          >
            Üye Ol
          </Button>
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
