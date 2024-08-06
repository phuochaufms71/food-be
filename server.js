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

app.use(cors({
    origin: 'https://food-fe-xod3.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  

// app.use('/api/foods/admin-food/create', (req, res) => {
//     // Your route handler code
// });
mongoose.connect(process.env.DB_URI, {dbName: 'db_food'})
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    })
    .catch(error => {
        console.log(error)
    })
