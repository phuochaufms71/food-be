import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { authRoute } from './routes/authRoute.js';
import { foodRoute } from './routes/foodRoute.js';

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use('/api/auth', authRoute)
app.use('/api/foods', foodRoute)

mongoose.connect(process.env.DB_URI, {dbName: 'db_food'})
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    })
    .catch(error => {
        console.log(error)
    })
