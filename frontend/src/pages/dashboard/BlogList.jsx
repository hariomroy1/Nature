// components/BlogList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

const BlogList = ({ blogs }) => {
  return (
    <Grid container spacing={3} sx={{ padding: '1rem' }}>
      {blogs.length > 0 ? (
        blogs.map((blog) => {
          const imageUrl = `${process.env.REACT_APP_BLOG_API_URL}${blog.image}`;
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
          <Typography variant="h6" color="text.secondary" align="center">
            No blogs available.
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default BlogList;
