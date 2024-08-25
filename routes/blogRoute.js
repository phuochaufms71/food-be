import express from 'express';
import { auth } from "../middleware/auth.js";
import { authAdmin } from "../middleware/authAdmin.js";
import { createBlog, deleteBlog, getBlogDetail, getBlogs, updateBlog } from '../controllers/blogController.js';

const router = express.Router();

router.get('/admin-blog/lists', auth, getBlogs);
router.get('/blog/:id', auth, getBlogDetail);
router.post('/admin-blog/create', auth, authAdmin, createBlog);
router.put('/:id', auth, authAdmin, updateBlog);
router.delete('/:id', auth, authAdmin, deleteBlog);

export {router as blogRoute};