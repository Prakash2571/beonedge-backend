
 import jwt from "jsonwebtoken";
import adminModel from "../../models/Admin.js";
import isEmail from "validator/lib/isEmail.js";



export const adminsignupauth = async (req, res, next) => {
  try {
    const data = req.body;
     if(!data)
     {
        throw new Error("Enter the details.")
     }
    const allowed = ["firstName", "lastName", "email", "password"];

    const keys = Object.keys(data);

    for (let field of allowed) {
      if (!keys.includes(field) || !data[field]) {
        throw new Error(`Field "${field}" is required.`);
      }
    }


    for (let key of keys) {
      if (!allowed.includes(key)) {
        throw new Error(`Field "${key}" is not allowed.`);
      }
    }

    if(!isEmail(data.email))
        {
          throw new Error("Enter a valid email id.")
        }
         const id=data.email;
        const e=await adminModel.findOne({email:id})
        if(e)
        {
          throw new Error("This email is already registered.")
        }

    next();
  } catch (err) {
    return res.status(500).send("Signup failed: " + err.message);
  }
};








    export const adminLogin=async(req,res,next)=>{
 
      try{
        const info=req.body;
        if(!info)
        {
            throw new Error("Please enter your details.");

        }
       
            const { email, password ,code } = req.body;

      if (!email || !password || !code) {
      return res.status(400).send("Enter full details (email and password required as well as secret code).");
      }

   

      const emailId=req.body.email;
      const data = await adminModel.findOne({ email: emailId });

        if (!data) {
      throw new Error("Invalid credentials.");
      }
  

    next();

      }catch(err){return res.status(500).send("Login Unsucessful... "+err.message)}


    }



    
const adminloginAuth= async (req,res,next)=>{


    try{
        const cookie=req.cookies;
        const token=cookie.token;

        if(!token)
        {
            throw new Error("Login in first.");
        }
          const decode=await jwt.verify(token,"Prakash")
             
           const {_id}=decode;
           const user=await adminModel.findById(_id);
             if (!user) {
         throw new Error( res.status(404).send("User not found in DB"))
}
            req.user=user;
             next();
         

    }catch(err){res.send(err.message)}}



    export default adminloginAuth;