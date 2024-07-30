const express = require('express');
const upload = require('../Middleware/upload.js'); // Adjust the path accordingly
const { createBlog } = require("../Controllers/blog.controller.js");
const {getAllBlogs} = require("../Controllers/fetchBlog.controller.js");
const FetchBlogById = require('../Controllers/BlogById.js');
const {getBlogsByType} = require("../Controllers/getBlogByTypes.js")
const router = express.Router();

// Handle multiple fields
router.post('/createBlog', upload.fields([{ name: 'file', maxCount: 1 }, { name: 'image', maxCount: 1 }]), createBlog);
router.get('/getAllBlogs',getAllBlogs)
router.get('/FetchBlogById/:id',FetchBlogById)
router.get('/getBlogsByType/:type',getBlogsByType)
module.exports = router;
