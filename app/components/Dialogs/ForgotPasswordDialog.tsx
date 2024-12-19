import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import axios from 'axios';

interface ForgotPasswordDialogProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const ForgotPasswordDialog: React.FC<ForgotPasswordDialogProps> = ({ open, onClose, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otpValid, setOtpValid] = useState(false);

  const handleApiCall = async (url: string, payload: object, successCallback: () => void, errorMessage: string) => {
    try {
      const response = await axiosInstance.post(url, payload);
      if (response.status === 200) {
        successCallback();
      } else {
        alert(errorMessage);
      }
    } catch {
      alert('Bir hata oluştu.');
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleApiCall(
      '/customerauth/user/password-reset-request/',
      { email },
      () => setOtpSent(true),
      'E-posta gönderilemedi.'
    );
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleApiCall(
      '/customerauth/user/password-reset-verify/',
      { email, otp },
      () => setOtpValid(true),
      'Geçersiz OTP.'
    );
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleApiCall(
      '/customerauth/user/password-reset-change-password/',
      { email, otp, new_password: newPassword },
      () => {
        alert('Şifreniz başarıyla sıfırlandı.');
        onSwitchToLogin();
      },
      'Şifre sıfırlanamadı.'
    );
  };

  const renderContent = () => {
    if (!otpSent) {
      return (
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
            <Button type="submit" color="primary" variant="contained">
              OTP Gönder
            </Button>
            <Button onClick={onClose} color="secondary" variant="outlined">
              Kapat
            </Button>
          </DialogActions>
        </form>
      );
    }

    if (!otpValid) {
      return (
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
            <Button type="submit" color="primary" variant="contained">
              OTP Doğrula
            </Button>
            <Button onClick={onClose} color="secondary" variant="outlined">
              Kapat
            </Button>
          </DialogActions>
        </form>
      );
    }

    return (
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
          <Button type="submit" color="primary" variant="contained">
            Şifreyi Sıfırla
          </Button>
          <Button onClick={onClose} color="secondary" variant="outlined">
            Kapat
          </Button>
        </DialogActions>
      </form>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Şifremi Unuttum
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{renderContent()}</DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
