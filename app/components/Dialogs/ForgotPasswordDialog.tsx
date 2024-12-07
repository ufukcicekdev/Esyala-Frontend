import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import axios from 'axios';

interface ForgotPasswordDialogProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // API'nin temel URL'sini buraya ekleyin
  headers: {
    'Content-Type': 'application/json',
  },
});

const ForgotPasswordDialog: React.FC<ForgotPasswordDialogProps> = ({ open, onClose, onSwitchToLogin }) => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpValid, setOtpValid] = useState(false); // OTP doğrulandı mı?
  
  // E-posta gönderme (OTP)
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await instance.post('/customerauth/user/password-reset-request/', { email });
      if (response.status === 200) {
        setOtpSent(true);
      } else {
        alert("E-posta gönderilemedi.");
      }
    } catch (error) {
      alert("Bir hata oluştu.");
    }
  };

  // OTP doğrulama
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await instance.post('/customerauth/user/password-reset-verify/', { email, otp });
      if (response.status === 200) {
        setOtpValid(true); // OTP doğrulandı
      } else {
        alert("Geçersiz OTP.");
      }
    } catch (error) {
      alert("Bir hata oluştu.");
    }
  };

  // Şifre sıfırlama
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await instance.post('/customerauth/user/password-reset-change-password/', { email, otp, new_password: newPassword });
      if (response.status === 200) {
        alert("Şifreniz başarıyla sıfırlandı.");
        onSwitchToLogin();
      } else {
        alert("Şifre sıfırlanamadı.");
      }
    } catch (error) {
      alert("Bir hata oluştu.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Şifremi Unuttum
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {!otpSent ? (
          <form onSubmit={handleEmailSubmit}>
            <TextField
              label="E-posta adresiniz"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              margin="normal"
              variant="outlined"
            />
            <DialogActions>
              <Button type="submit" color="primary" variant="contained" sx={{ marginRight: 1 }}>
                OTP Gönder
              </Button>
              <Button onClick={onClose} color="secondary" variant="outlined">
                Kapat
              </Button>
            </DialogActions>
          </form>
        ) : !otpValid ? (
          <form onSubmit={handleOtpSubmit}>
            <TextField
              label="OTP Kodu"
              type="text"
              fullWidth
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              margin="normal"
              variant="outlined"
            />
            <DialogActions>
              <Button type="submit" color="primary" variant="contained" sx={{ marginRight: 1 }}>
                OTP Doğrula
              </Button>
              <Button onClick={onClose} color="secondary" variant="outlined">
                Kapat
              </Button>
            </DialogActions>
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit}>
            <TextField
              label="Yeni Şifre"
              type="password"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              margin="normal"
              variant="outlined"
            />
            <DialogActions>
              <Button type="submit" color="primary" variant="contained" sx={{ marginRight: 1 }}>
                Şifreyi Sıfırla
              </Button>
              <Button onClick={onClose} color="secondary" variant="outlined">
                Kapat
              </Button>
            </DialogActions>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
