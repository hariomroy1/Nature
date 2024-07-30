import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Menu,
  MenuItem,
  InputLabel,
  Input,
  FormControl,
} from "@mui/material";

const BLOG_TYPES = [
  "Personal Blogs",
  "Niche Blogs",
  "Professional Blogs",
  "Educational Blogs",
  "News Blogs",
  "Review Blogs",
  "Creative Blogs",
  "Community Blogs",
  "Business Blogs",
  "Health and Wellness Blogs",
  "Entertainment Blogs",
  "Other"
];



const CreateBlog = () => {
  const [username, setUsername] = useState("");
  const [BlogName, setBlogname] = useState("");
  const [BlogType, setBlogtype] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  // Menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleBlogTypeSelect = (type) => {
    setBlogtype(type);
    handleMenuClose();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !BlogName || !BlogType || !file || !image) {
      alert("All fields are required");

      
      return;
      
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("BlogName", BlogName);
    formData.append("BlogType", BlogType);
    formData.append("file", file);
    formData.append("image", image);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BLOG_API_URL}/api/createBlog`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Blog created successfully");
      navigate("/"); 
      // Clear the form or handle response
      setUsername("");
      setBlogname("");
      setBlogtype("");
      setFile(null);
      setImage(null);
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Error creating blog");
    }
  };

  return (
    <Box
      sx={{ maxWidth: 600, margin: "0 auto", padding: 2, marginTop: "20px" }}
    >
      <Typography variant="h4" gutterBottom textAlign={"center"}>
        Create Blog
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Blog Name"
            variant="outlined"
            value={BlogName}
            onChange={(e) => setBlogname(e.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Blog Type</InputLabel>
            <Input
              value={BlogType}
              onClick={handleMenuOpen}
              readOnly
              endAdornment={
                <Button onClick={handleMenuOpen}>Select Blog Type</Button>
              }
            />
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              PaperProps={{ style: { maxHeight: 250, width: "20ch" } }}
            >
              {BLOG_TYPES.map((type) => (
                <MenuItem key={type} onClick={() => handleBlogTypeSelect(type)}>
                  {type}
                </MenuItem>
              ))}
            </Menu>
          </FormControl>
        </Box>
        <Box sx={{ mb: 2 }}>
          <input
            type="file"
            accept=".txt"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="text-file-upload"
          />
          <label htmlFor="text-file-upload">
            <Button
              variant="contained"
              component="span"
              sx={{ width: "100%" }}
            >
              {file ? `Selected File: ${file.name}` : "Choose Text File"}
            </Button>
          </label>
        </Box>
        <Box sx={{ mb: 2 }}>
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <Button
              variant="contained"
              component="span"
              sx={{ width: "100%" }}
            >
              {image ? `Selected Image: ${image.name}` : "Choose Image"}
            </Button>
          </label>
        </Box>
        <Box textAlign={"center"}>
          <Button variant="contained" color="primary" type="submit">
            Create Blog
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateBlog;
