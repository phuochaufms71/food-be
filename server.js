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
// app.use(cors());
dotenv.config();
connectCloudinary()

app.use('/api/auth', authRoute)
app.use('/api/foods', foodRoute)
app.use('/api/blogs', blogRoute)

app.use(cors());
app.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Origin",
        "clientURL"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    
    console.log("Request received:", req.method, req.url);
    
    next();
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
