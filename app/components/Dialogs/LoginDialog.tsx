import React, { FC, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import RegisterDialog from "./RegisterDialog";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // API base URL'ini çevresel değişkenden alıyoruz
});

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

const LoginDialog: FC<LoginDialogProps> = ({ open, onClose }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [openSignUp, setOpenSignUp] = useState<boolean>(false); // SignUp dialog'u için state

  // Form gönderimi
  const handleSubmit = async () => {
    try {
      const response = await instance.post("/customerauth/user/login/", {
        email,
        password,
      });
      const { token, user, message } = response.data; // API yanıtını alıyoruz

      if (message === "Giriş Başarılı") {
        // Token ve kullanıcı bilgilerini saklıyoruz
        localStorage.setItem("access_token", token.access); 
        localStorage.setItem("refresh_token", token.refresh);
        localStorage.setItem("user", JSON.stringify(user)); 

        onClose();
        window.location.reload();
      } else {
        setError("Giriş işlemi sırasında bir hata oluştu.");
      }
    } catch (err) {
      setError("Giriş işlemi sırasında bir hata oluştu.");
      console.error(err);
    }
  };

  // Üye Ol butonuna tıklandığında SignUp dialog'unu açıyoruz
  const handleSignUpClick = () => {
    setOpenSignUp(true);
    onClose(); // Login dialog'unu kapatıyoruz
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Giriş Yap</DialogTitle>
        <DialogContent>
          {error && <div style={{ color: "red" }}>{error}</div>} {/* Hata mesajı */}
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
          <Button onClick={handleSignUpClick} color="secondary">
            Üye Ol
          </Button>
        </DialogActions>
      </Dialog>

      {/* SignUpDialog sadece openSignUp state'i true olduğunda açılır */}
      <RegisterDialog open={openSignUp} onClose={() => setOpenSignUp(false)} />
    </>
  );
};

export default LoginDialog;
