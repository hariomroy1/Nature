const { express } = require("express");
const Blog = require("../DataLayer/Models/blog");

const FetchBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);
    if(!blog)
    {
        res.status(404).json({message:'Blog not found'});

    }
    res.status(200).json(blog);
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports = FetchBlogById;