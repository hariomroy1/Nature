const Blog = require("../DataLayer/Models/blog.js");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: 'An error occurred while fetching blogs', error: error.message });
  }
};

module.exports = { getAllBlogs };
