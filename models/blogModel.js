import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    image: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    }
});

const Blog = mongoose.model("blogs", blogSchema);

export default Blog;