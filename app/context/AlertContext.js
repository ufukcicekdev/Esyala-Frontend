"use client";
import React, { createContext, useContext, useState } from 'react';
import { AutoDismissAlert } from '../components/messages/Alert';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (tag, message) => {
    setAlert({ tag, message });
    setTimeout(() => setAlert(null), 5000); // 5 saniye sonra otomatik gizle
  };

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      {alert && <AutoDismissAlert severity={alert.tag} message={alert.message} />}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
