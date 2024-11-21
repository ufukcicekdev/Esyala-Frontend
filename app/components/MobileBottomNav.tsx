import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import Person2Icon from "@mui/icons-material/Person2";
import CallIcon from "@mui/icons-material/Call";
import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { createTheme, ThemeProvider } from "@mui/material";
import Link from "next/link";

// Tema oluşturma
const theme = createTheme({
  typography: {
    fontSize: 20, // Daha okunabilir bir font boyutu ayarlandı
  },
});

export default function MobileBottomNav() {
  const [value, setValue] = React.useState<string>("home");

  // handleChange fonksiyonu parametre türlerini belirtiyoruz
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="mobile-bottom-nav fixed bottom-0 left-0 w-full bg-white shadow-md">
        <BottomNavigation
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction
            label="Ana Sayfa"
            value="home"
            icon={<HomeIcon />}
            component={Link}
            href="/"
          />
          <BottomNavigationAction
            label="Arama"
            value="search"
            icon={<SearchIcon />}
            component={Link}
            href="/search"
          />
          <BottomNavigationAction
            label="Profil"
            value="profile"
            icon={<Person2Icon />}
            component={Link}
            href="/profile"
          />
          <BottomNavigationAction
            label="İletişim"
            value="contact"
            icon={<CallIcon />}
            component={Link}
            href="/contact"
          />
        </BottomNavigation>
      </div>
    </ThemeProvider>
  );
}
