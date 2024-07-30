import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
 const navigate = useNavigate();

  const handleBlog = () => {
    navigate("/");
  }
  return (
    <AppBar position="static" sx={{ mb: 2, backgroundColor: "#333" }}>
      <Toolbar>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Typography onClick={handleBlog} variant="h4" component="div" sx={{ flexGrow: 1, textAlign: "center", color: "#fff" }}>
            BlogHub
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
