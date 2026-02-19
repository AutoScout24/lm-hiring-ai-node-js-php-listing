"use client";

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Avatar,
  Badge,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LanguageIcon from "@mui/icons-material/Language";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [carMenuAnchor, setCarMenuAnchor] = useState(null);
  const [langMenuAnchor, setLangMenuAnchor] = useState(null);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCarMenuOpen = (event) => {
    setCarMenuAnchor(event.currentTarget);
  };

  const handleCarMenuClose = () => {
    setCarMenuAnchor(null);
  };

  const handleLangMenuOpen = (event) => {
    setLangMenuAnchor(event.currentTarget);
  };

  const handleLangMenuClose = () => {
    setLangMenuAnchor(null);
  };

  const menuItems = [
    { name: "New Cars", path: "/?category=new" },
    { name: "Used Cars", path: "/?category=used" },
    { name: "News & Reviews", path: "/news" },
    { name: "Videos", path: "/videos" },
  ];

  const carTypes = [
    "Hatchback",
    "Sedan",
    "SUV",
    "Luxury SUV",
    "Electric",
    "MPV",
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "white",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ py: 1, px: 0 }}>
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: { xs: 1, md: 0 },
            }}
          >
            <Link
              href="/"
              passHref
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
              onClick={(e) => {
                e.preventDefault();
                router.push("/");
              }}
            >
              <Box sx={{ mr: 1, position: "relative", width: 40, height: 40 }}>
                <Image
                  src="/logo.png"
                  alt="Suzuki"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  fontWeight: "bold",
                  display: { xs: "none", sm: "block" },
                  background:
                    "linear-gradient(90deg, #1a4b8c 0%, #3b6db4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Suzuki
              </Typography>
            </Link>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 4 }}>
            {menuItems.map((item) => (
              <Button
                key={item.name}
                sx={{
                  color: "text.primary",
                  mx: 1,
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
                onClick={() => router.push(item.path)}
              >
                {item.name}
              </Button>
            ))}
            <Button
              sx={{
                color: "text.primary",
                mx: 1,
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handleCarMenuOpen}
            >
              Car Types
            </Button>
            <Menu
              anchorEl={carMenuAnchor}
              open={Boolean(carMenuAnchor)}
              onClose={handleCarMenuClose}
              MenuListProps={{
                "aria-labelledby": "car-types-button",
              }}
            >
              {carTypes.map((type) => (
                <MenuItem
                  key={type}
                  onClick={() => {
                    router.push(`/?type=${type}`);
                    handleCarMenuClose();
                  }}
                >
                  {type}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Right Menu */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 2, display: { xs: "none", md: "block" } }}
            />

            {/* Login/Profile Button */}
            <Button
              variant="outlined"
              startIcon={<PersonOutlineIcon />}
              sx={{
                ml: { xs: 0, md: 2 },
                display: { xs: "none", md: "flex" },
                borderRadius: 2,
              }}
              onClick={() => router.push("/login")}
            >
              Login / Register
            </Button>

            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            background: "linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%)",
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" component="div" fontWeight="bold">
              Menu
            </Typography>
            <IconButton onClick={handleDrawerToggle}>&times;</IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />

          <Button
            variant="outlined"
            fullWidth
            startIcon={<PersonOutlineIcon />}
            sx={{ mb: 2, borderRadius: 2 }}
            onClick={() => {
              router.push("/login");
              handleDrawerToggle();
            }}
          >
            Login / Register
          </Button>

          <List>
            {menuItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  onClick={() => {
                    router.push(item.path);
                    handleDrawerToggle();
                  }}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push("/favorites");
                  handleDrawerToggle();
                }}
              >
                <ListItemText primary="Favorites" />
                <Badge badgeContent={2} color="error">
                  <FavoriteBorderIcon fontSize="small" />
                </Badge>
              </ListItemButton>
            </ListItem>
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Car Types
          </Typography>
          <List>
            {carTypes.map((type) => (
              <ListItem key={type} disablePadding>
                <ListItemButton
                  onClick={() => {
                    router.push(`/?type=${type}`);
                    handleDrawerToggle();
                  }}
                  sx={{ py: 0.5 }}
                >
                  <ListItemText primary={type} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: "auto", pt: 2 }}>
            <Divider sx={{ mb: 2 }} />
            <Button
              size="small"
              fullWidth
              startIcon={<LanguageIcon fontSize="small" />}
              endIcon={<KeyboardArrowDownIcon fontSize="small" />}
              sx={{ justifyContent: "flex-start", color: "text.secondary" }}
              onClick={handleLangMenuOpen}
            >
              English
            </Button>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}
