import express from "express";
import connectDB from "./config/database.js";

import cookieParser from "cookie-parser";
import cors from "cors";



const app=express();

app.use(express.json())

import authRouter from "./routes/auth.js";

app.use("/",authRouter);







connectDB().then(()=>{console.log("Dtabase connection establised...");
    
app.listen(4444,()=>{
    console.log("app is running at port 4444.")
});

}).catch((err)=>{console.error("Dtabase cannot be connected !!"+err.message);})
