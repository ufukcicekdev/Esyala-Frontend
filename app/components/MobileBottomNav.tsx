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
import LoginDialog from "./Dialogs/LoginDialog";

// Tema oluşturma
const theme = createTheme({
  typography: {
    fontSize: 20, // Varsayılan font boyutu
  },
});

export default function MobileBottomNav() {
  const [value, setValue] = useState<string>("home");
  const [openLoginDialog, setOpenLoginDialog] = useState(false); // LoginDialog'ın açık olup olmadığını kontrol etmek için state
  const { isAuthenticated, user, logout } = useAuth(); // useAuth'dan gerekli veriler alınıyor

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
      setOpenLoginDialog(true);
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
            icon={<Person2Icon sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }} />}
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

      {/* LoginDialog burada açılacak */}
      <LoginDialog open={openLoginDialog} onClose={() => setOpenLoginDialog(false)} openSignUp={() => console.log('Sign Up')} />
    </ThemeProvider>
  );
}
