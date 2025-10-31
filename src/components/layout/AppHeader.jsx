import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { FiMenu, FiUser } from "react-icons/fi";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export default function AppHeader({ sidebarOpen, setSidebarOpen }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("name");
    window.location.reload();
  };

  const menuOpen = Boolean(anchorEl);

  return (
    <AppBar
      position="sticky"
      elevation={3}
      sx={{
        bgcolor: "#1B5E20", // Deep green
        backgroundImage: "linear-gradient(90deg, #2E7D32, #1B5E20)",
        borderBottom: "2px solid #43A047",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 4 } }}>
        {/* Sidebar Toggle */}
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          sx={{
            display: { lg: "none" },
            "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
          }}
          aria-label="Toggle sidebar"
        >
          <FiMenu size={22} />
        </IconButton>

        {/* Dashboard Title */}
        <Typography
          variant="h6"
          component={Link}
          to="/dashboard"
          sx={{
            textDecoration: "none",
            color: "#E8F5E9",
            fontWeight: 700,
            letterSpacing: 0.5,
            "&:hover": { color: "#C8E6C9" },
          }}
        >
          Expense Dashboard
        </Typography>

        {/* Profile Menu */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography
            variant="body1"
            sx={{
              display: { xs: "none", sm: "block" },
              fontWeight: 500,
              color: "#E8F5E9",
            }}
          >
            {Cookies.get("name")}
          </Typography>

          <IconButton
            onClick={handleMenuOpen}
            sx={{
              bgcolor: "#A5D6A7",
              color: "#1B5E20",
              "&:hover": { bgcolor: "#81C784" },
              width: 40,
              height: 40,
            }}
          >
            {Cookies.get("image") ? (
              <Avatar
                alt={Cookies.get("name")}
                src={Cookies.get("image")}
                sx={{ width: 36, height: 36 }}
              />
            ) : (
              <Avatar
                sx={{
                  bgcolor: "#388E3C",
                  width: 36,
                  height: 36,
                  color: "#E8F5E9",
                }}
              >
                <FiUser size={20} />
              </Avatar>
            )}
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            sx={{
              "& .MuiPaper-root": {
                borderRadius: 2,
                minWidth: 160,
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              },
            }}
          >
            <MenuItem
              component={Link}
              to="/profile"
              onClick={handleMenuClose}
              sx={{
                "&:hover": { bgcolor: "#E8F5E9", color: "#1B5E20" },
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleLogout();
                handleMenuClose();
              }}
              sx={{
                "&:hover": { bgcolor: "#E8F5E9", color: "#C62828" },
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

