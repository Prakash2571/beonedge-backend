import express from "express";
import adminloginAuth, { adminsignupauth } from "../config/utils/middlewareadmin.js";
import adminModel from "../models/Admin.js";
import bcrypt from "bcrypt"
import { adminLogin } from "../config/utils/middlewareadmin.js";
import jwt from "jsonwebtoken";

const adminRouter=express.Router();


adminRouter.post("/adminsignup",adminsignupauth,async(req,res)=>{

    try{
       const adminObj=req.body;

       const adminpassword=adminObj.password;
       const pass=await bcrypt.hash(adminpassword,10)
       adminObj.password=pass;

       const admin=new adminModel(adminObj);
       await admin.save();

       res.send("Admin signup sucessful")


    }catch(err){err.message}
})


adminRouter.post("/adminlogin",adminLogin,async(req,res)=>{
  
 try {
      
  const emailId = req.body.email
  const adminpass = req.body.password;
  const secretcode="whatthefuck"
  const seccode=req.body.code;

     if (seccode !== secretcode) {
      throw new Error ("Invalid Code.");
    }
  
    const data = await adminModel.findOne({ email: emailId });

    const pass = data.password;
    const id=data._id;
    const isValid = await bcrypt.compare(adminpass, pass);

    if (isValid) {
      const token=jwt.sign({_id:id},"Prakash")
      res.cookie("token",token);
      res.send(data);
    } else {
      res.status(401).send("Incorrect password.");
    }

  
   }

    catch(err){  res.status(401).send("Login unsuccessful: " + err.message)}
})



adminRouter.post("/adminlogout",adminloginAuth,async(req,res)=>{
  try {
    res.clearCookie("token");
    res.send("Logout Successful");
  } catch (err) {
    res.status(500).send("Logout failed: " + err.message);
  }
})

export default adminRouter;

