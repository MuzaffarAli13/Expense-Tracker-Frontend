import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const drawerWidth = 260;
const green = {
  main: "#16a34a",
  light: "#22c55e",
  dark: "#15803d",
};

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Income", path: "/income" },
    { name: "Expenses", path: "/expense" },
    { name: "Profile", path: "/profile" },
  ];

  const drawerContent = (
    <Box
      sx={{
        width: drawerWidth,
        height: "100%",
        bgcolor: green.main,
        color: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
          px: 2,
          borderBottom: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Expense Tracker
        </Typography>
        <IconButton
          onClick={() => setSidebarOpen(false)}
          sx={{ color: "white", display: { lg: "none" } }}
        >
          <RxCross2 size={20} />
        </IconButton>
      </Box>

      <List sx={{ p: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.name}
              component={Link}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              sx={{
                borderRadius: 2,
                mb: 1,
                color: isActive ? green.main : "white",
                bgcolor: isActive ? "white" : "transparent",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontWeight: isActive ? 600 : 400,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            position: "relative",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
