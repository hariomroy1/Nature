import React from "react";
import { Route, Routes } from 'react-router-dom';
import Layout from "../pages/layout/layout";
import CreateBlog from "../pages/dashboard/createBlog";
import FetchAllBlogs from "../pages/dashboard/fetchAllBlogs";
import BlogdetailsById from "../pages/dashboard/BlogDetailsById"
import Nothing from "../pages/dashboard/nothing"
const RouteConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<FetchAllBlogs />} />
        <Route path="/upload" element={<CreateBlog/>} />
        <Route path="/blogs/:id" element={<BlogdetailsById />} />
        <Route path="/nothing" element={<Nothing/>} />
      </Route>
    </Routes>
    
  );
};

export default RouteConfig;
