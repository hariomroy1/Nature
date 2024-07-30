// controllers/blogController.js
const Blog = require('../DataLayer/Models/blog'); // Adjust the path as needed

const getBlogsByType = async (req, res) => {
  try {
    // Decode URI component to handle spaces and special characters
    const type = decodeURIComponent(req.params.type);

    if (!type) {
      return res.status(400).json({ message: 'Blog type is required' });
    }

    // Find blogs with the specified type
    const blogs = await Blog.findAll({
      where: {
        BlogType: type
      }
    });

    if (blogs.length === 0) {
      return res.status(404).json({ message: `No blogs found for type: ${type}` });
    }

    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching blogs by type:', error);
    res.status(500).json({ message: 'Error fetching blogs by type' });
  }
};

module.exports = { getBlogsByType };
