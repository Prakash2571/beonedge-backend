import express from "express";
import connectDB from "./config/database.js";

import cookieParser from "cookie-parser";
import cors from "cors";



const app=express();

app.use(express.json())
app.use(cookieParser());

import authRouter from "./routes/userAuth.js";
import adminRouter from "./routes/adminAuth.js";
import powerRouter from "./routes/adminPowers.js";
import userSideRouter from "./routes/userSide.js";

app.use("/",authRouter);
app.use("/",adminRouter);
app.use("/",powerRouter);
app.use("/",userSideRouter);






connectDB().then(()=>{console.log("Dtabase connection establised...");
    
app.listen(4444,()=>{
    console.log("app is running at port 4444.")
});

}).catch((err)=>{console.error("Dtabase cannot be connected !!"+err.message);})
