// components/RegisterDialog.tsx

import React, { FC, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface RegisterDialogProps {
  open: boolean;
  onClose: () => void;
}

const RegisterDialog: FC<RegisterDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Üye Ol</DialogTitle>
      <DialogContent>
        <TextField label="Ad" fullWidth margin="normal" />
        <TextField label="Email" fullWidth margin="normal" />
        <TextField label="Şifre" type="password" fullWidth margin="normal" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Kapat
        </Button>
        <Button onClick={onClose} color="primary">
          Üye Ol
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterDialog;
