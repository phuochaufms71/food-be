import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { authRoute } from './routes/authRoute.js';
import { foodRoute } from './routes/foodRoute.js';
import { blogRoute } from './routes/blogRoute.js';
import connectCloudinary from './config/index.js';

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
connectCloudinary()

app.use('/api/auth', authRoute)
app.use('/api/foods', foodRoute)
app.use('/api/blogs', blogRoute)

app.use(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
});
mongoose.connect(process.env.DB_URI, {dbName: 'db_food'})
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    })
    .catch(error => {
        console.log(error)
    })
