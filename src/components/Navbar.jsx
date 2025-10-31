import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const pages = ["Home", "Login", "Signup", "Profile"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#e8f5e9", // light green background
        color: "#1b5e20", // deep green text
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        borderBottom: "1px solid #c8e6c9",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccountBalanceIcon sx={{ color: "#2e7d32" }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 700,
                color: "#2e7d32",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              Expense Tracker
            </Typography>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => navigate(`/${page.toLowerCase()}`)}
                sx={{
                  color: "#1b5e20",
                  textTransform: "capitalize",
                  fontWeight: 500,
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#2e7d32",
                    color: "white",
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              PaperProps={{
                sx: {
                  mt: 1,
                  borderRadius: 2,
                  backgroundColor: "#e8f5e9",
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    navigate(`/${page.toLowerCase()}`);
                    handleCloseNavMenu();
                  }}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#2e7d32",
                      color: "white",
                    },
                  }}
                >
                  {page}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Profile / Login Button */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="User Menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {!Cookies.get("token") ? (
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#2e7d32",
                      textTransform: "capitalize",
                      "&:hover": { backgroundColor: "#1b5e20" },
                    }}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                ) : (
                  <Avatar alt={Cookies.get("name")} src={Cookies.get("image")} />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  borderRadius: 2,
                  backgroundColor: "#e8f5e9",
                  p: 1,
                },
              }}
            >
              {Cookies.get("token") ? (
                <>
                  <MenuItem
                    onClick={() => {
                      Cookies.remove("token");
                      navigate("/login");
                    }}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#2e7d32",
                        color: "white",
                      },
                    }}
                  >
                    Logout
                  </MenuItem>
                  <MenuItem
                    onClick={() => navigate("/profile")}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#2e7d32",
                        color: "white",
                      },
                    }}
                  >
                    Profile
                  </MenuItem>
                </>
              ) : (
                <MenuItem
                  onClick={() => navigate("/login")}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#2e7d32",
                      color: "white",
                    },
                  }}
                >
                  Login
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
