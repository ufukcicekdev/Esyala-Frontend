"use client";
import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Avatar,
  Button,
  useMediaQuery,
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ProfileEditDialog from "../components/profile/user_info";

// Tab Panel Helper Component
interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

// User Profile Interface
interface UserProfile {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string;
  tckn: string;
}

const Profile: React.FC = () => {
  const [tabValue, setTabValue] = useState(0); // Varsayılan sekme 'Profil Bilgileri'
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // Dialog açma durumu
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: "",
  first_name: "",
  last_name: "",
  email: "",
  birth_date: "",
  tckn: ""
  });
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen); // Dialog penceresini açıp kapatmak
  };

  const handleProfileSave = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile); // Profil bilgisini güncelle
  };

  return (
    <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", minHeight: "100vh" }}>
      {/* Mobilde Drawer (Çekmece Menüsü) */}
      {isMobile && (
        <>
          <AppBar position="sticky">
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ ml: 2 }}>
                Profil
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
            <Box sx={{ width: 250, p: 2 }}>
              <Avatar
                alt="User Avatar"
                src="https://via.placeholder.com/150"
                sx={{ width: 80, height: 80, mb: 2 }}
              />
              <Typography variant="h6">Ufuk Çiçek</Typography>
              <Button variant="contained" color="primary" sx={{ my: 2 }} fullWidth onClick={toggleDialog}>
                Profili Düzenle
              </Button>
              <Tabs
                orientation="vertical"
                value={tabValue}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
              >
                <Tab label="Siparişlerim" />
                <Tab label="Adreslerim" />
              </Tabs>
            </Box>
          </Drawer>
        </>
      )}

      {/* Masaüstü Sol Menü */}
      {!isMobile && (
        <Box
          sx={{
            minWidth: 250,
            borderRight: 1,
            borderColor: "divider",
            p: 2,
            backgroundColor: "white",
          }}
        >
          <Avatar
            alt="User Avatar"
            src="https://via.placeholder.com/150"
            sx={{ width: 80, height: 80, mb: 2 }}
          />
          <Typography variant="h6">Ufuk Çiçek</Typography>
          <Typography variant="body2" color="text.secondary">
            Backend Developer
          </Typography>
          <Button variant="contained" color="primary" sx={{ my: 2 }} fullWidth onClick={toggleDialog}>
            Profili Düzenle
          </Button>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Siparişlerim" />
            <Tab label="Adreslerim" />
          </Tabs>
        </Box>
      )}

      {/* Sağ İçerik */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>
            Profil Bilgileri
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Email:</strong> {userProfile.email}
          </Typography>
        
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Siparişlerim
          </Typography>
          <ul>
            <li>Sipariş #1: Ürün A - 250 TL</li>
            <li>Sipariş #2: Ürün B - 150 TL</li>
            <li>Sipariş #3: Ürün C - 300 TL</li>
          </ul>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Adreslerim
          </Typography>
          <ul>
            <li>Ev Adresi: Mahalle, Sokak, Şehir</li>
            <li>İş Adresi: Ofis Adresi, Şehir</li>
          </ul>
        </TabPanel>
      </Box>

      {/* Profil Düzenleme Dialogu */}
      <ProfileEditDialog
        open={dialogOpen}
        onClose={toggleDialog}
        onSave={handleProfileSave}
      />
    </Box>
  );
};

export default Profile;
