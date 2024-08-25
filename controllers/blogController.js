import mongoose from "mongoose";
import { handleResponseSuccess, handleResponseError } from "../utils/responses.js";
import Blog from "../models/blogModel.js";

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        handleResponseSuccess(res, 200, "Get blogs successfullly", { blogs })
    } catch (error) {
        handleResponseError(res, 500, "Internal server error")
        return
    }
}

export const getBlogDetail = async( req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        handleResponseError(res, 400, "Incorrect format id")
        return 
    }
    const checkBlogByIdInDb = await Blog.findById(id);
    if (!checkBlogByIdInDb) {
        handleResponseError(res, 404, "Blog not found")
        return
    }
    handleResponseSuccess(res, 200, "Get blog successfully", {
        _id: checkBlogByIdInDb._id,
        image: checkBlogByIdInDb.image,
        title: checkBlogByIdInDb.title,
        description: checkBlogByIdInDb.description,
        content: checkBlogByIdInDb.content
    })
}

export const createBlog = async (req, res) => {
    const { image, title, description, content } = req.body;
    if (!image || !title || !description || !content) {
        handleResponseError(res, 400, "All fields are required")
        return
    }
    const newBlog = await Blog.create({ image, title, description, content });
    handleResponseSuccess(res, 201, "Create new blog successfully", {...newBlog._doc})
}

export const updateBlog = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        handleResponseError(res, 400, "Incorrect format id")
        return 
    }
    const checkBlogByIdInDb = await Blog.findById(id);
    if (!checkBlogByIdInDb) {
        handleResponseError(res, 404, "Blog not found")
        return
    }
    const { image, title, description, date, content } = req.body;
    if (!image || !title || !description || !date || !content) {
        handleResponseError(res, 400, "Bad request. All fields are required")
        return
    }
    await checkBlogByIdInDb.updateOne({ image, title, description, date, content })
    const updateBlog = await Blog.findById(id);
    handleResponseSuccess(res, 200, "Update blog successfully", {...updateBlog._doc})
}

export const deleteBlog = async (req, res) => {
    const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    handleResponseError(res, 400, "Incorrect format id")
    return
  }
  const checkBlogByIdInDb = await Blog.findById(id)
  if (!checkBlogByIdInDb) {
    handleResponseError(res, 404, "Blog not found")
    return
  }
  await Blog.findByIdAndDelete(id)
  handleResponseSuccess(res, 200, "Blog deleted successfully")
}