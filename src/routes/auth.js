import express from "express";
import userModel from "../models/User.js";


const authRouter=express.Router();


authRouter.post("/signup",async(req,res)=>{
  const userObj=req.body;


   const user=new userModel(userObj);
    await user.save();
     res.send("user added sucessfully.");


})



export default authRouter;