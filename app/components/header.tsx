'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchCategory } from "@/lib/main_api";
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
import AuthDialogs from "./Dialogs/AuthDialogs"; // AuthDialogs bileşenini import ediyoruz

interface Category {
  name: string;
  slug: string;
  children: Category[];
}

const Header = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, user, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // AuthDialog için state
  const [currentDialog, setCurrentDialog] = useState<"login" | "register" | "forgotPassword" | null>(null); // currentDialog state'i
  const [authDialogOpen, setAuthDialogOpen] = useState(false); // authDialogOpen state'i

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchCategory();
        if (response.status && response.data) {
          setCategories(response.data);
        }
      } catch {
        setError("Kategoriler alınamadı");
      }
    };

    fetchCategories();
  }, []);

  const handleAuthDialogOpen = (dialog: "login" | "register" | "forgotPassword") => {
    setCurrentDialog(dialog); // currentDialog'ı güncelliyoruz
    setAuthDialogOpen(true); // Dialog'u açıyoruz
  };

  const handleAuthDialogClose = () => {
    setAuthDialogOpen(false); // Dialog'u kapatıyoruz
    setCurrentDialog(null); // currentDialog'ı null yapıyoruz
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

  const renderCategories = (categories: Category[]) => {
    return categories.map((category) => (
      <li key={category.slug} className="relative group">
        <Link
          href={`/category/${category.slug}/`}
          className="flex flex-col items-center px-4 py-3 bg-gray-100 text-gray-800 font-semibold shadow-sm transition-all hover:text-blue-600 rounded-lg"
        >
          <span className="text-3xl mb-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.27051 14.9515L9.86319 9.86221L14.9524 8.26953L13.3598 13.3588L8.27051 14.9515Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <circle
                cx="11.611"
                cy="11.611"
                r="9.61098"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></circle>
            </svg>
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
      {error && <AutoDismissAlert severity="error" message={error} />}



      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Grid container alignItems="center" spacing={2}>
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

              {/* Search Bar */}
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                className="flex items-center"
                sx={{ my: 3 }}
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
                />
              </Grid>

              {/* Giriş Yap ve Üye Ol Butonları */}
              <Grid
                item
                xs={12}
                sm={12}
                md={3}
                className="flex justify-end items-center hidden md:flex"
              >
                {isAuthenticated ? (
                  <>
                    <IconButton color="primary" onClick={handleUserClick}>
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
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleAuthDialogOpen("login")}
                      className="ml-2"
                    >
                      Giriş Yap
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAuthDialogOpen("register")}
                      className="ml-2"
                    >
                      Üye Ol
                    </Button>
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

      

      <MobileBottomNav/>

      {/* AuthDialogs Bileşeni */}
      <AuthDialogs
        openDialog={handleAuthDialogOpen}
        closeDialog={handleAuthDialogClose}
        currentDialog={currentDialog}
      />
    </header>
  );
};

export default Header;
