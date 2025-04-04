import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import { useState } from "react";
import { Settings, Logout, Search as SearchIcon, Add as AddIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  sidebarOpen: boolean;
}

const HeaderComponent: React.FC<HeaderProps> = ({ sidebarOpen }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const drawerWidth = sidebarOpen ? 250 : 70;
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${sidebarOpen ? drawerWidth : 0}px)`,
        marginLeft: `${sidebarOpen ? drawerWidth : 0}px`,
        transition: "all 0.3s ease-in-out",
        bgcolor: "#2196f3",
        boxShadow: "none",
        borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
        zIndex: 1000,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", minHeight: 64 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "white" }}>
            {sidebarOpen ? "My Application" : "App"}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search tasks..."
            sx={{
              width: "300px",
              "& .MuiOutlinedInput-root": {
                bgcolor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "4px",
                color: "white",
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "rgba(255, 255, 255, 0.7)",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/create-task')}
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.1)",
              color: "white",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.2)",
              },
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Create Task
          </Button>

          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar 
              sx={{ 
                bgcolor: "rgba(255, 255, 255, 0.1)",
                color: "white",
                width: 32,
                height: 32,
              }}
            >
              {userInitial}
            </Avatar>
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          sx={{ 
            mt: 1,
            "& .MuiPaper-root": {
              bgcolor: "#fff",
              minWidth: "200px",
            }
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem sx={{ py: 1 }}>
            <Avatar sx={{ mr: 2, width: 24, height: 24 }} /> Profile
          </MenuItem>
          <MenuItem sx={{ py: 1 }}>
            <Settings sx={{ mr: 2, width: 20, height: 20 }} /> Account Settings
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ py: 1 }}>
            <Logout sx={{ mr: 2, width: 20, height: 20 }} /> Log out
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent;
