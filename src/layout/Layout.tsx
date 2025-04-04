import React from "react";
import { Box } from "@mui/material";
import SidebarComponent from "../components/sidebar/SidebarComponent";
import Header from "../components/header/HeaderComponent";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <SidebarComponent
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          transition: "margin-left 0.3s ease-in-out",
          bgcolor: "#f8fafc",
          overflow: "hidden",
        }}
      >
        <Header sidebarOpen={sidebarOpen} />
        <Box
          sx={{
            flexGrow: 1,
            p: 0,
            mt: "64px",
            overflow: "hidden",
            bgcolor: "#f8fafc",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
