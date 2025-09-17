import jwt from "jsonwebtoken";
import userModel from "../../models/User.js";
import isEmail from "validator/lib/isEmail.js";


export const usersignupAuth=async(req,res,next)=>{

    try{
        const data=req.body;
        const required=["firstName","lastName","phone","email","password"];
        for(let x of Object.keys(data))
        {
           if (!required.includes(x))
            {
                throw new Error("This detail is not accepted.")
            }
        }
        for(let x of required)
        {
          if(!Object.keys(data).includes(x))
          {
            throw new Error("Enter the full details.");
          }
        }
        
        if(!isEmail(data.email))
        {
          throw new Error("Enter a valid email id.")
        }
         const id=data.email;
        const e=await userModel.findOne({email:id})
        if(id)
        {
          throw new Error("This email is already registered.")
        }
          
        

       next();

    }catch(error){    return res.status(500).send("Signup Unsuccessful: " + error.message);}

   
}




const userloginAuth= async (req,res,next)=>{


    try{
        const cookie=req.cookies;
        const token=cookie.token;

        if(!token)
        {
            throw new Error("No token found.");
        }
          const decode=await jwt.verify(token,"prakash")
             
           const {_id}=decode;
           const user=await userModel.findById(_id);
             if (!user) {
         throw new Error( res.status(404).send("User not found in DB"))
}
            req.user=user;
             next();
         

    }catch(err){res.send(null)}}






    export const checkstate=async(req,res,next)=>{
 
      try{
       
            const { email, password } = req.body;

      if (!email || !password  ) {
      return res.status(400).send("Enter full details (email and password required).");
      }

   

      const emailId=req.body.email;
      const data = await userModel.findOne({ email: emailId });

        if (!data) {
      throw new Error("Invalid credentials.");
      }
      if(data.status==="Pending")
      {
        throw new Error("Wait for your data to be approved by admin.");
      }

    next();

      }catch(err){return res.status(500).send("Login Unsucessful"+err.message)}


    }


    export default userloginAuth;