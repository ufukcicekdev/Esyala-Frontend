'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import MobileBottomNav from "./MobileBottomNav";
import { AutoDismissAlert } from "./messages/Alert";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useAuth } from "../context/AuthContext";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import AuthDialogs from "./Dialogs/AuthDialogs";
import { useCategories } from "../context/CategoryProvider";
import Sidebar from "./SideBar/basket";
import CartIcon from "./CartIcon";

interface Category {
  name: string;
  slug: string;
  children: Category[];
  image: string;
}

const Header = () => {
  const [localError, setLocalError] = useState<string | null>(null);
  const { isAuthenticated, user, logout } = useAuth();
  const { categories, error, loading } = useCategories(); // Category context error

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [currentDialog, setCurrentDialog] = useState<"login" | "register" | "forgotPassword" | null>(null);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar açma kapama durumu

  const handleAuthDialogOpen = (dialog: "login" | "register" | "forgotPassword") => {
    setCurrentDialog(dialog);
    setAuthDialogOpen(true);
  };

  const handleAuthDialogClose = () => {
    setAuthDialogOpen(false);
    setCurrentDialog(null);
  };

  const handleUserClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseMenu();
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen); // Sidebar açma/kapama
  };

  const renderCategories = (categories: Category[]) => {
    return categories.map((category) => (
      <li key={category.slug} className="relative group">
        <Link
          href={`/category/${category.slug}/`}
          className="flex flex-col items-center px-4 py-3 bg-gray-100 text-gray-800 font-semibold shadow-sm transition-all hover:text-blue-600 rounded-lg"
        >
          <span className="mb-3 w-12 h-12">
            <Image
              src={category.image ? category.image : "/path/to/default-image.jpg"}
              alt={category.name}
              width={48}
              height={48}
              className="object-cover rounded-full"
            />
          </span>
          <span className="text-lg font-semibold">{category.name}</span>
        </Link>

        {category.children && category.children.length > 0 && (
          <ul className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 pointer-events-none transition-all duration-300 z-10 group-hover:opacity-100 group-hover:pointer-events-auto">
            {category.children.map((child) => (
              <li key={child.slug} className="p-2">
                <Link
                  href={`/category/${category.slug}/${child.slug}`}
                  className="block px-4 py-2 rounded-md hover:bg-gray-200 text-gray-800 transition-all truncate"
                >
                  {child.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <header id="mt-header" className="style19">
      {(localError || error) && (
        <AutoDismissAlert severity="error" message={localError || error || ''} />
      )}

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Grid container alignItems="center" spacing={2}>
              {/* Logo ve slogan */}
              <Grid item xs={12} sm={12} md={3} className="flex items-center">
                <div className="mt-logo text-center">
                  <Link href="/">
                    <Image
                      className="logo-img"
                      src="https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/images/esyala_syh_noktal%C4%B1.png"
                      alt="Esyala"
                      width={200}
                      height={120}
                      sizes="(max-width: 640px) 150px, (max-width: 1024px) 200px, 250px"
                    />
                  </Link>
                  <div className="logo-text mt-2">
                    <span className="block text-xl font-semibold">Keşfet</span>
                    <span className="block text-xl font-semibold">Kullan</span>
                    <span className="block text-xl font-semibold">Eşyala</span>
                  </div>
                </div>
              </Grid>

              <Grid
                item
                xs={12} sm={12} md={4}
                className="flex items-center"
                sx={{ my: 3, display: 'flex', justifyContent: 'center' }} // Genişliği merkezde tut
              >
                <TextField
                  variant="outlined"
                  placeholder="Ara..."
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ maxWidth: 500 }}  // Maksimum genişlik belirleyebilirsiniz
                />
              </Grid>



              {/* Giriş Yap ve Üye Ol Butonları */}
              <Grid
                item
                xs={12}
                sm={12}
                md={3}
                sx={{
                  display: {
                    xs: 'none',
                    md: 'flex',
                  },
                  '@media (max-width: 991px)': {
                    display: 'none',
                  },
                }}
                className="flex justify-end items-center"
              >
                <CartIcon
                  onClick={handleSidebarToggle}
                />

                {isAuthenticated ? (
                  <>
                    <IconButton color="primary" onClick={handleUserClick}>
                      <Avatar sx={{ width: 40, height: 40, fontSize: 18, backgroundColor: "#3f51b5" }}>
                        {user?.username?.charAt(0).toUpperCase() || "?"}
                      </Avatar>
                    </IconButton>

                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleCloseMenu}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <MenuItem>
                        <Link href="/profile">Profil</Link>
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <div className="login-register-button">
                      <Button variant="outlined" color="primary" onClick={() => handleAuthDialogOpen("login")} className="ml-2">
                        Giriş Yap
                      </Button>
                      <Button variant="contained" color="primary" onClick={() => handleAuthDialogOpen("register")} className="ml-2">
                        Üye Ol
                      </Button>
                    </div>
                  </>
                )}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>

      <div className="mt-nav-holder breadcrumb-header">
        <nav>
          <ul className="breadcrumb">
            {categories && renderCategories(categories)}
          </ul>
        </nav>
      </div>

      <MobileBottomNav />

      <AuthDialogs
        openDialog={handleAuthDialogOpen}
        closeDialog={handleAuthDialogClose}
        currentDialog={currentDialog}
      />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
    </header>
  );
};

export default Header;
