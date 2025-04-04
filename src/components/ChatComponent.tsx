import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  TextField,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatComponent: React.FC = () => {
  return (
    <Box
      sx={{
        p: 2,
        height: "100%",
        width: "100%",
        bgcolor: "#f8fafc",
        overflow: "auto",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 600,
          color: "#334155",
        }}
      >
        Chat
      </Typography>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          bgcolor: "#f4f6f8",
          p: 2,
          mb: 2,
        }}
      >
        {/* Sidebar */}
        <Box sx={{ width: 280, bgcolor: "white", boxShadow: 1, p: 2 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Chats
          </Typography>
          <List>
            {["Alice", "Bob", "Charlie"].map((name, index) => (
              <ListItem key={index} component="div" sx={{ cursor: "pointer" }}>
                <Avatar sx={{ mr: 2 }}>{name[0]}</Avatar>
                <ListItemText primary={name} secondary="Last message here..." />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Main Chat Window */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            bgcolor: "white",
            boxShadow: 1,
          }}
        >
          {/* Chat Header */}
          <Box
            sx={{
              p: 2,
              bgcolor: "#6200ea",
              color: "white",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ mr: 2 }}>A</Avatar>
            <Typography variant="h6">Alice</Typography>
          </Box>

          <Divider />

          {/* Chat Messages */}
          <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
              <Avatar sx={{ mr: 1 }}>A</Avatar>
              <Box
                sx={{
                  bgcolor: "#e3f2fd",
                  p: 1.5,
                  borderRadius: "10px",
                  maxWidth: "70%",
                }}
              >
                <Typography variant="body2">Hello! How are you?</Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <Box
                sx={{
                  bgcolor: "#d1c4e9",
                  p: 1.5,
                  borderRadius: "10px",
                  maxWidth: "70%",
                }}
              >
                <Typography variant="body2">
                  I'm good! What about you?
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider />

          {/* Chat Input */}
          <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
            />
            <IconButton color="primary">
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatComponent;
