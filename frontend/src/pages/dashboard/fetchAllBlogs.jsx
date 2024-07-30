import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Card, CardContent, CardMedia, Typography, Grid, Button, Box, Typography as MuiTypography } from '@mui/material';


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
];

const FetchAllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [noBlogsMessage, setNoBlogsMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BLOG_API_URL}/api/getAllBlogs`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleUploadClick = () => {
    navigate("/upload");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleBlogClick = () => {
    navigate("/");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleBlogTypeSelect = async (type) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BLOG_API_URL}/api/getBlogsByType/${type}`);
      if (response.data.length === 0) {
        navigate("/nothing");
        setBlogs([]);
      } else {
        setBlogs(response.data);
        setNoBlogsMessage('');
      }
    } catch (error) {
      console.error("Error fetching blogs by type:", error);
      navigate("/nothing");
    }
    setAnchorEl(null); // Close the menu after selection
  };

  return (
    <div>
      <AppBar position="static" sx={{ mb: 2, boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}>
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              onClick={handleHomeClick}
              variant="contained"
              color="primary"
              sx={{ marginRight: 2 }}
            >
              Home
            </Button>
            <Button
              onClick={handleUploadClick}
              variant="contained"
              color="primary"
            >
              Upload
            </Button>
            <Button
              onClick={handleMenuOpen}
              variant="contained"
              color="primary"
              sx={{ marginLeft: 2 }}
            >
              CategoryWise
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{ style: { maxHeight: 250, width: '20ch' } }}
            >
              {BLOG_TYPES.map((type) => (
                <MenuItem
                  key={type}
                  onClick={() => handleBlogTypeSelect(type)}
                >
                  {type}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3} sx={{ padding: '1rem' }}>
        {noBlogsMessage && (
          <Grid item xs={12}>
            <MuiTypography variant="h6" color="error" align="center">
              {noBlogsMessage}
            </MuiTypography>
          </Grid>
        )}

        {blogs.length > 0 ? (
          blogs.map((blog) => {
            // Construct image URL
            const imageUrl = `${process.env.REACT_APP_BLOG_API_URL}${blog.image}`;
            console.log(imageUrl)
            return (
              <Grid item xs={12} sm={6} md={4} key={blog.id}>
                <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none' }}>
                  <Card>
                    <CardMedia
                      component="img"
                      alt={blog.BlogName} 
                      height="140"
                      image={imageUrl} 
                      title={blog.BlogName}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {blog.BlogName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {blog.content.substring(0, 100)}...
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <b>Author Name:</b> {blog.username} <br />
                        <b>Type:</b> {blog.BlogType}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12}>
            <MuiTypography variant="h6" color="text.secondary" align="center">
              No blogs available.
            </MuiTypography>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default FetchAllBlogs;
