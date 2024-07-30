const { DataTypes } = require("sequelize");
const sequalize = require("../../../config/sequalize.config.js");

const Blog = sequalize.define(
  "Blog",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    BlogName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    BlogType:{
        type:DataTypes.STRING,  
        allowNull:false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image:{
      type:DataTypes.STRING,
      allowNull:true, 
    }
  },
  {
    tableName: "blogs",
    timestamps: false,
  }
);

module.exports = Blog;
