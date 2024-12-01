import HomeIcon from "@mui/icons-material/Home";
import Person2Icon from "@mui/icons-material/Person2";
import CallIcon from "@mui/icons-material/Call";
import CategoryIcon from "@mui/icons-material/Category";
import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { createTheme, ThemeProvider } from "@mui/material";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import AuthDialogs from "./Dialogs/AuthDialogs";
import Avatar from "@mui/material/Avatar";

// Tema oluşturma
const theme = createTheme({
  typography: {
    fontSize: 20, // Varsayılan font boyutu
  },
});

export default function MobileBottomNav() {
  const [value, setValue] = useState<string>("home");
  const { isAuthenticated, user, logout } = useAuth(); // useAuth'dan gerekli veriler alınıyor

  const [currentDialog, setCurrentDialog] = useState<"login" | "register" | "forgotPassword" | null>(null); // currentDialog state'i
  const [authDialogOpen, setAuthDialogOpen] = useState(false); // authDialogOpen state'i


  const handleAuthDialogOpen = (dialog: "login" | "register" | "forgotPassword") => {
    setCurrentDialog(dialog); // currentDialog'ı güncelliyoruz
    setAuthDialogOpen(true); // Dialog'u açıyoruz
  };

  const handleAuthDialogClose = () => {
    setAuthDialogOpen(false); // Dialog'u kapatıyoruz
    setCurrentDialog(null); // currentDialog'ı null yapıyoruz
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // Profil butonuna tıklandığında giriş yapmamışsa LoginDialog aç
  const handleProfileClick = () => {
    if (isAuthenticated) {
      // Eğer kullanıcı giriş yapmışsa, profil sayfasına git
      window.location.href = "/profile";
    } else {
      // Eğer giriş yapmamışsa, LoginDialog'ı aç
      handleAuthDialogOpen("login")
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="mobile-bottom-nav fixed bottom-0 left-0 w-full bg-white shadow-md">
        <BottomNavigation value={value} onChange={handleChange}>
          {/* Anasayfa */}
          <BottomNavigationAction
            label="Anasayfa"
            value="home"
            icon={<HomeIcon sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }} />}
            sx={{
              "& .MuiBottomNavigationAction-label": {
                fontSize: { xs: "10px", sm: "12px", md: "14px" },
              },
            }}
            component={Link}
            href="/"
          />

          {/* Kategoriler */}
          <BottomNavigationAction
            label="Kategoriler"
            value="category"
            icon={<CategoryIcon sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }} />}
            sx={{
              "& .MuiBottomNavigationAction-label": {
                fontSize: { xs: "10px", sm: "12px", md: "14px" },
              },
            }}
            component={Link}
            href="/categories"
          />

          {/* Profil (Login kontrolü yapılacak) */}
          <BottomNavigationAction
            label="Profil"
            value="profile"
            icon={
              isAuthenticated ? (
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    fontSize: 18,
                    backgroundColor: "#3f51b5",
                  }}
                >
                  {user?.username?.charAt(0).toUpperCase() || "?"}
                </Avatar>
              ) : (
                <Person2Icon sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }} />
              )
            }
            sx={{
              "& .MuiBottomNavigationAction-label": {
                fontSize: { xs: "10px", sm: "12px", md: "14px" },
              },
            }}
            onClick={handleProfileClick} // Profil butonuna tıklandığında
          />

          {/* İletişim */}
          <BottomNavigationAction
            label="İletişim"
            value="contact"
            icon={<CallIcon sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }} />}
            sx={{
              "& .MuiBottomNavigationAction-label": {
                fontSize: { xs: "10px", sm: "12px", md: "14px" },
              },
            }}
            component={Link}
            href="/contact"
          />
        </BottomNavigation>
      </div>

      <AuthDialogs
        openDialog={handleAuthDialogOpen}
        closeDialog={handleAuthDialogClose}
        currentDialog={currentDialog}
      />
      
    </ThemeProvider>
  );
}
