import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { authRoute } from './routes/authRoute.js';
import { foodRoute } from './routes/foodRoute.js';
import { blogRoute } from './routes/blogRoute.js';
import connectCloudinary from './config/index.js';
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
connectCloudinary()

app.use('/api/auth', authRoute)
app.use('/api/foods', foodRoute)
app.use('/api/blogs', blogRoute)
app.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Origin",
        "React app URL"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(
    '/api/*',
    createProxyMiddleware({
        target: 'https://private-backend-url.awsapprunner.com',
        changeOrigin: true,
        pathRewrite: {
        '^/api': '/test'
        },
    })
);

mongoose.connect(process.env.DB_URI, {dbName: 'db_food'})
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    })
    .catch(error => {
        console.log(error)
    })
