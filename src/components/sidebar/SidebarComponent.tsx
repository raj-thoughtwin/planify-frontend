import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Box,
  Typography,
  ListItemButton,
  Tooltip,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as TeamIcon,
  Folder as ProjectIcon,
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon,
  ViewKanban as PlanifyIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 250;
const collapsedWidth = 70;

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const SidebarComponent: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Projects", icon: <ProjectIcon />, path: "/projects" },
    { text: "Teams", icon: <TeamIcon />, path: "/teams" },
    { text: "Chat", icon: <TeamIcon />, path: "/chat" },

  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarOpen ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sidebarOpen ? drawerWidth : collapsedWidth,
          transition: "all 0.3s ease-in-out",
          overflowX: "hidden",
          bgcolor: "#1e1e2d",
          color: "white",
          borderRight: "none",
          position: "fixed",
          height: "100vh",
          boxShadow: "4px 0 8px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Box sx={{ height: "100%" }}>
        {/* Logo Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "20px 16px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            minHeight: "64px",
            justifyContent: sidebarOpen ? "flex-start" : "center",
            position: "relative",
          }}
        >
          <PlanifyIcon 
            sx={{
              width: 32,
              height: 32,
              color: "#2196f3",
              marginRight: sidebarOpen ? 2 : 0,
              transition: "all 0.3s ease-in-out",
            }}
          />
          {sidebarOpen && (
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontWeight: 600,
                fontSize: "1.25rem",
                transition: "opacity 0.3s ease-in-out",
              }}
            >
              Planify
            </Typography>
          )}

          {/* Toggle Button */}
          <IconButton
            onClick={() => setSidebarOpen(!sidebarOpen)}
            sx={{
              position: "absolute",
              right: sidebarOpen ? "10px" : "10px",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "#1e1e2d",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              color: "rgba(255, 255, 255, 0.7)",
              "&:hover": {
                backgroundColor: "#2a2a3c",
                color: "white",
              },
              zIndex: 1300,
              width: "28px",
              height: "28px",
              transition: "all 0.3s ease-in-out",
              boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)",
              "& .MuiSvgIcon-root": {
                fontSize: "20px",
                transition: "transform 0.3s ease-in-out",
                transform: sidebarOpen ? "rotate(0deg)" : "rotate(180deg)",
              },
            }}
          >
            {sidebarOpen ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
        </Box>

        {/* Menu Items */}
        <List sx={{ mt: 2, px: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <Tooltip 
                title={!sidebarOpen ? item.text : ""} 
                placement="right"
                arrow
              >
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    minHeight: 48,
                    justifyContent: sidebarOpen ? "initial" : "center",
                    px: 2.5,
                    borderRadius: "8px",
                    backgroundColor: location.pathname === item.path ? "rgba(33, 150, 243, 0.1)" : "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: sidebarOpen ? 2 : "auto",
                      justifyContent: "center",
                      color: location.pathname === item.path ? "#2196f3" : "rgba(255, 255, 255, 0.7)",
                      transition: "color 0.2s ease-in-out",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {sidebarOpen && (
                    <ListItemText 
                      primary={item.text} 
                      sx={{ 
                        opacity: 1,
                        "& .MuiListItemText-primary": {
                          color: location.pathname === item.path ? "#2196f3" : "rgba(255, 255, 255, 0.7)",
                          fontWeight: location.pathname === item.path ? 600 : 500,
                          transition: "all 0.2s ease-in-out",
                        }
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SidebarComponent;
