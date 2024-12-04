import express from "express";
import {mongoDBURL, PORT } from "./config.js";
import mongoose from 'mongoose';

import booksRoute from './routes/booksRoute.js'
import cors from 'cors';

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middelware for handling cors policy
//option 1: default
app.use(cors());
//Option 2: allow customs
// app.use(
//     cors({
//         origin: 'http://localhost:5555',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get('/', (request, response) =>{
    console.log(request)
    return response.status(234).send("Welcome to mern stack tutorial")
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to database');
        app.listen(PORT, () =>{
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error)=> {
        console.log(error);
    })