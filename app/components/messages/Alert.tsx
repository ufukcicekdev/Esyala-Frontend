import React, { useEffect, useState } from 'react';

export function Alert({ tag, message }) {
  const [showAlert, setShowAlert] = useState(true);

  // 5 saniye sonra mesajı kapatma
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 5000);

    // Cleanup timer
    return () => clearTimeout(timer);
  }, []);

  // tag'e göre alert sınıfını ve ikonları belirleme
  const getAlertClassAndIcon = () => {
    switch (tag) {
      case 'info':
        return {
          alertClass: 'alert-info',
          iconPath: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        };
      case 'success':
        return {
          alertClass: 'alert-success',
          iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
        };
      case 'warning':
        return {
          alertClass: 'alert-warning',
          iconPath: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
        };
      case 'error':
        return {
          alertClass: 'alert-error', // Bootstrap'da genellikle 'alert-danger' kullanılır
          iconPath: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
        };
      default:
        return {
          alertClass: 'alert-info', // Varsayılan olarak info
          iconPath: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        };
    }
  };

  const { alertClass, iconPath } = getAlertClassAndIcon();

  return (
    showAlert && (
      <div
        role="alert"
        className={`alert ${alertClass}`}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          padding: '1rem 2rem',
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          width: 'auto',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-10 w-10 shrink-0 stroke-current"
          style={{ marginRight: '10px' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
        </svg>
        <span style={{ fontSize: '16px' }}>{message}</span>
      </div>
    )
  );
}
