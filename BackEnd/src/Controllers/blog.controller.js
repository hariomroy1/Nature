const fs = require('fs');
const Blog = require('../DataLayer/Models/blog.js');
const path = require('path');

const createBlog = async (req, res) => {
  try {
    const { username, BlogName, BlogType } = req.body;

    // Validate input data
    if (!username || !BlogName || !BlogType) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if files are present
    if (!req.files || !req.files.file || !req.files.image) {
      return res.status(400).json({ message: "Required files are missing." });
    }

    // Access the text file and image from req.files
    const filePath = req.files.file[0].path; // Path to the text file
    const imagePath = req.files.image[0].path; // Path to the image file

    // Read content from the uploaded text file
    const content = fs.readFileSync(filePath, "utf-8"); // Reads the content as a string

    // Construct the URL to serve the image
    const imageUrl = `/public/images/${path.basename(imagePath)}`; // Use relative URL

    // Create a blog post
    const newBlog = await Blog.create({
      username,
      BlogName,
      BlogType,
      content, // Save the text content to the database
      image: imageUrl, // Save the image URL to the database
    });

    // Send success response
    res.status(201).json({ message: "Blog Created Successfully!", blog: newBlog });
  } catch (error) {
    console.error("Error:", error);

    // Cleanup files if an error occurs
    if (req.files && req.files.file) {
      fs.unlink(req.files.file[0].path, (err) => {
        if (err) console.error("Failed to delete text file:", err);
      });
    }
    if (req.files && req.files.image) {
      fs.unlink(req.files.image[0].path, (err) => {
        if (err) console.error("Failed to delete image file:", err);
      });
    }

    res.status(500).json({
      message: "An error occurred while creating the blog",
      error: error.message,
    });
  }
};

module.exports = { createBlog };
