import express from "express";
import { getBlogWithCommentsAndCreator, createBlog,getAllBlogs } from "../controllers/blog.controller";
import { createComment } from "../controllers/comments.controller";
import { protectRoute } from "../middlewares/auth.middleware";
import validateBlog from "../validations/blogs.validations";
import validateComments from "../validations/comments.validation";
import { deleteBlog } from "../controllers/blog.controller";
import { updateBlog } from "../controllers/blog.controller";

const blogRoutes = express.Router();

blogRoutes.get("/:blogId", getBlogWithCommentsAndCreator);
blogRoutes.get('/',getAllBlogs);
blogRoutes.post("/",protectRoute, createBlog);
blogRoutes.post("/:blogId/comments",validateComments,protectRoute, createComment);

blogRoutes.delete("/:blogId", protectRoute, deleteBlog);

blogRoutes.put("/:blogId", protectRoute, updateBlog);

export default blogRoutes;