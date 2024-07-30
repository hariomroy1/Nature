// src/pages/BlogDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BLOG_API_URL}/api/FetchBlogById/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  const imageUrl = `${process.env.REACT_APP_BLOG_API_URL}${blog.image}`;

  return (
    
    <Card>
      <CardMedia
        component="img"
        alt={blog.BlogName}
        height="300"
        image={imageUrl}
        title={blog.BlogName}
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="h1">
          {blog.BlogName}
        </Typography>
        <Typography variant="body1" color="text.primary" paragraph>
          {blog.content}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>By:</b> {blog.username} <br />
          <b>Type:</b> {blog.BlogType}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogDetail;
