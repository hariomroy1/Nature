// src/components/Footer.js
import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#333",
        color: "#fff",
        py: 3,
        px: 2,
        mt: "auto",
        textAlign: "center",
      }}
    >
      <Typography variant="h6" gutterBottom>
        BlogHub
      </Typography>
      <Typography variant="body2" color="inherit" paragraph>
        Welcome to BlogHub, your go-to platform for sharing and discovering a wide range of blogs across various categories. Stay informed, stay connected!
      </Typography>
      <Box>
        <Link href="/about" color="inherit" underline="hover" sx={{ mx: 2 }}>
          About
        </Link>
        <Link href="/contact" color="inherit" underline="hover" sx={{ mx: 2 }}>
          Contact
        </Link>
        <Link href="/privacy-policy" color="inherit" underline="hover" sx={{ mx: 2 }}>
          Privacy Policy
        </Link>
        <Link href="/terms-of-service" color="inherit" underline="hover" sx={{ mx: 2 }}>
          Terms of Service
        </Link>
      </Box>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        &copy; {new Date().getFullYear()} BlogHub. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
