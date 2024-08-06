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

const corsOptions ={
    origin:'https://food-be-1.onrender.com/', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
dotenv.config();
connectCloudinary()

app.use('/api/auth', authRoute)
app.use('/api/foods', foodRoute)
app.use('/api/blogs', blogRoute)

mongoose.connect(process.env.DB_URI, {dbName: 'db_food'})
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    })
    .catch(error => {
        console.log(error)
    })
