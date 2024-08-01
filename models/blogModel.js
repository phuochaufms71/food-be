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
        type: Date,
        require: true
    },
    content: {
        type: String,
        require: true
    }
});

const Blog = mongoose.model("models", blogSchema);

export default Blog;