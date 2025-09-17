import express from "express";
import adminloginAuth from "../config/utils/middlewareadmin.js";
import userModel from "../models/User.js";


const powerRouter=express.Router();


powerRouter.get("/pendingusers",adminloginAuth,async(req,res)=>{

    try{

     const data=await userModel.find({status:"Pending"})

     res.send(data);

    }catch(err){err.message}
})

powerRouter.patch("/authorise/:userId",adminloginAuth,async(req,res)=>{

   const userId=req.params.userId

    try{

        const data=await userModel.findOne({_id:userId,status:"Pending"})
        if(!data)
        {
            throw new Error("This user cannot be authorised.");
        }
       
          data.status="Approved"
          await data.save();

          res.send("User approved Sucessfully.")
       
       

    }catch(err){res.status(400).send(err.message)}
})



export default powerRouter;