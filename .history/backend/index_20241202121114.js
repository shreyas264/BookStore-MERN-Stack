import express from "express";
import {mongoDBURL, PORT } from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";

const app = express();

//Middleware for parsing request body
app.use(express.json());

app.get('/', (request, response) =>{
    console.log(request)
    return response.status(234).send("Welcome to mern stack tutorial")
});



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