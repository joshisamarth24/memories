import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";

const app=express();
dotenv.config();

app.use(bodyParser.json({limit:'30mb' ,extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}));

app.use(cors({
    origin : ["https://memories-tawny.vercel.app"],
    methods : ["POST","GET","PATCH","DELETE"],
    credentials : true
}));

app.use('/users',userRoutes);
app.use('/posts',postRoutes);


// const CONNECTION_URL='mongodb+srv://joshisamarth26:RCtmhnLmbtXop4oI@cluster0.b4mkcs8.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;
// mongodb+srv://joshisamarth26:RCtmhnLmbtXop4oI@cluster0.b4mkcs8.mongodb.net/?retryWrites=true&w=majority

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology:true})
.then(() => app.listen(PORT,()=> console.log(`server running on port:${PORT}`)))
.catch((error)=>console.log(error.message));

app.get('/',(req,res)=>{
    res.send([]);
});
