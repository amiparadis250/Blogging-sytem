import express from "express";
import { getBlogWithCommentsAndCreator, createBlog,getAllBlogs } from "../controllers/blog.controller";
import { createComment } from "../controllers/comments.controller";
import { protectRoute } from "../middlewares/auth.middleware";

const blogRoutes = express.Router();

blogRoutes.get("/:blogId", getBlogWithCommentsAndCreator);
blogRoutes.get('/',getAllBlogs);
blogRoutes.post("/",protectRoute, createBlog);
blogRoutes.post("/:blogId/comments",protectRoute, createComment);

export default blogRoutes;