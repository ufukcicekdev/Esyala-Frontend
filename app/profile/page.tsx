"use client";
import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Avatar,
  Button,
  useMediaQuery,
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ProfileEditDialog from "../components/profile/user_info";
import ProfileNotifyDialog from "../components/profile/ProfileNotifyDialog";
import OrderList from "../components/profile/OrderList";
import Addresses from "../components/profile/AddressList";
import AddAddressDialog from "../components/profile/NewAddressDialog";
import { AddCircleOutline as AddIcon } from '@mui/icons-material'; // + ikonu için


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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

interface UserProfile {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string;
  tckn: string;
}

const Profile: React.FC = () => {
  const [tabValue, setTabValue] = useState(0); // Main tabs (Siparişlerim / Adreslerim)
  const [addressTabValue, setAddressTabValue] = useState(0); // Address sub-tabs (Fatura Adresi / Sipariş Adresi)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notifyDialogOpen, setNotifyDialogOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    birth_date: "",
    tckn: "",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: false,
    smsNotifications: false,
  });

  const [addAddressDialogOpen, setAddAddressDialogOpen] = useState(false); // Yeni adres dialogu için state

  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAddressTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setAddressTabValue(newValue);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  const toggleNotifyDialog = () => {
    setNotifyDialogOpen(!notifyDialogOpen);
  };

  const toggleAddAddressDialog = () => {
    setAddAddressDialogOpen(!addAddressDialogOpen); // Yeni adres dialogu için fonksiyon
  };

  const handleProfileSave = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
  };

  const handleNotificationsSave = (updatedNotifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
  }) => {
    setNotifications(updatedNotifications);
  };

  const handleNewAddressSave = (newAddress: any) => {
    // Burada yeni adresi kaydetmek için gerekli işlemi yapın
    console.log(newAddress);
    toggleAddAddressDialog(); // Dialogu kapat
  };

  return (
    <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", minHeight: "100vh" }}>
      {/* Mobilde AppBar */}
      {isMobile && (
        <>
          <AppBar position="sticky">
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Profil
              </Typography>
              <IconButton color="inherit" onClick={toggleNotifyDialog}>
                <NotificationsIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
            <Box sx={{ width: 250, p: 2 }}>
              <Avatar
                alt="User Avatar"
                src="https://via.placeholder.com/150"
                sx={{ width: 100, height: 100, mb: 2, mx: "auto" }}
              />
              <Typography variant="h6" align="center">Ufuk Çiçek</Typography>
              <Button variant="contained" color="primary" sx={{ my: 2 }} fullWidth onClick={toggleDialog}>
                Profili Düzenle
              </Button>
              <Tabs
                orientation="vertical"
                value={tabValue}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                sx={{
                  "& .MuiTab-root": {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  },
                }}
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
            sx={{ width: 100, height: 100, mb: 2, mx: "auto" }}
          />
          <Typography variant="h6" align="center">Ufuk Çiçek</Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
            Backend Developer
          </Typography>
          <Button variant="contained" color="primary" sx={{ my: 2 }} fullWidth onClick={toggleDialog}>
            Profili Düzenle
          </Button>
          <Button
            variant="outlined"
            startIcon={<NotificationsIcon />}
            sx={{ my: 2 }}
            fullWidth
            onClick={toggleNotifyDialog}
          >
            Bildirimler
          </Button>
          <Tabs
            orientation="vertical"
            value={tabValue}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            sx={{
              "& .MuiTab-root": {
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              },
            }}
          >
            <Tab label="Siparişlerim" />
            <Tab label="Adreslerim" />
          </Tabs>
        </Box>
      )}

      {/* Sağ İçerik */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" sx={{ mb: 2 }}>Siparişlerim</Typography>
          <OrderList /> {/* userId'yi dinamik olarak alabilirsiniz */}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" sx={{ mb: 2 }}>Adreslerim</Typography>

          {/* Yeni Adres Ekle Butonu */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />} // + ikonu
              sx={{
                borderRadius: '50px', // Yuvarlak buton kenarları
                padding: '8px 24px', // Buton içi boşluk
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#f0f0f0', // Hover efekti
                },
              }}
              onClick={toggleAddAddressDialog}
            >
              Yeni Adres Ekle
            </Button>
          </Box>

          {/* Adres Tabları */}
          <Tabs
            value={addressTabValue}
            onChange={handleAddressTabChange}
            indicatorColor="primary"
            textColor="primary"
            sx={{ mt: 2 }}
          >
            <Tab label="Fatura Adresi" />
            <Tab label="Sipariş Adresi" />
          </Tabs>

          <TabPanel value={addressTabValue} index={0}>
            <Addresses addressModel="billing" />
          </TabPanel>
          <TabPanel value={addressTabValue} index={1}>
            <Addresses addressModel="shipping" />
          </TabPanel>
        </TabPanel>
      </Box>

      <ProfileEditDialog open={dialogOpen} onClose={toggleDialog} onSave={handleProfileSave} />
      <ProfileNotifyDialog
        open={notifyDialogOpen}
        onClose={toggleNotifyDialog}
        onSave={handleNotificationsSave}
      />
      <AddAddressDialog
        open={addAddressDialogOpen}
        onClose={toggleAddAddressDialog}
        onSave={handleNewAddressSave} // Yeni adres kaydedildiğinde
      />
    </Box>
  );
};

export default Profile;
