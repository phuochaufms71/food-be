import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { authRoute } from './routes/authRoute.js';
import { foodRoute } from './routes/foodRoute.js';
import { blogRoute } from './routes/blogRoute.js';
import { addressRoute } from './routes/addressRoute.js';
import { messageRoute } from './routes/messageRoute.js';

const app = express();

app.use(cors())

app.use(express.json());
dotenv.config();

app.use('/api/auth', authRoute)
app.use('/api/foods', foodRoute)
app.use('/api/blogs', blogRoute)
app.use('/api/checkout', addressRoute)
app.use('/api/message', messageRoute)
  
mongoose.connect(process.env.DB_URI, {dbName: 'db_food'})
    .then((res) => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    })
    .catch(error => {
        console.log(error)
    })
