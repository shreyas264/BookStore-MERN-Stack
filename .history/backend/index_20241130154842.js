import express from "express";
import {PORT } from "./config.js";

const app = express();

app.listen(Port, () =>{
    console.log(`App is listening to port: ${PORT}`);
});