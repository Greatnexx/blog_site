import express from 'express'
import { createBlog } from '../controllers/Blog.Controller/createBlog.controller.js';
import {protect} from "../middlewares/authMiddleware.js"
import { getAllBlogs } from '../controllers/Blog.Controller/getAllBlog.controller.js';
import { deleteBlog } from '../controllers/Blog.Controller/deleteBlog.controller.js';
import { updatedBlog } from '../controllers/Blog.Controller/updateBlog.controller.js';
import { getSingleBlog } from '../controllers/Blog.Controller/getsingleBlog.controller.js';
const router = express.Router();

router.post("/",protect ,createBlog)
router.get("/",getAllBlogs)
router.delete("/:id",protect,deleteBlog)
router.put("/:id",protect,updatedBlog)
router.get("/:id",getSingleBlog)

export default router;