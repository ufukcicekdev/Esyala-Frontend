import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

// severity parametresi için "success", "error", "warning", "info" değerlerini alacağını belirtiyoruz
interface AlertProps {
  severity: "success" | "error" | "warning" | "info";
  message: string;
}

export function AutoDismissAlert({ severity, message }: AlertProps) {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 5000);

    // Temizlik işlemi
    return () => clearTimeout(timer);
  }, []);

  // Eğer alert kapandıysa hiçbir şey döndürme
  if (!showAlert) {
    return null;
  }

  return (
    <Stack
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        maxWidth: "90%",
        width: "auto",
        padding: "2rem", 
      }}
      spacing={2}
    >
      <Alert
        severity={severity}
        sx={{
          fontSize: "2rem", 
          wordWrap: "break-word", 
          textAlign: "center", 
        }}
      >
        {message}
      </Alert>
    </Stack>
  );
}
