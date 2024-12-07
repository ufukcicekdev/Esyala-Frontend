import React from "react";
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";
import ForgotPasswordDialog from "./ForgotPasswordDialog";

export default function AuthDialogs({
  openDialog,
  currentDialog,
  closeDialog,
}: {
  openDialog: (dialog: "login" | "register" | "forgotPassword") => void;
  closeDialog: () => void;
  currentDialog: "login" | "register" | "forgotPassword" | null;
}) {
  return (
    <>
      {currentDialog === "login" && (
        <LoginDialog
          open={true}
          onClose={closeDialog}
          onSwitchToRegister={() => openDialog("register")}
          onSwitchToForgotPassword={() => openDialog("forgotPassword")} 
        />
      )}

      {currentDialog === "register" && (
        <RegisterDialog
          open={true}
          onClose={closeDialog}
          onSwitchToLogin={() => openDialog("login")}
        />
      )}

      {currentDialog === "forgotPassword" && (
        <ForgotPasswordDialog
          open={true}
          onClose={closeDialog}
          onSwitchToLogin={() => openDialog("login")}
        />
      )}
    </>
  );
}
