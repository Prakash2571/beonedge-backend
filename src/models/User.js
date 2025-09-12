import mongoose from "mongoose";


const userSchema =new mongoose.Schema({

    firstName :{
        type:String
    }
})







const userModel=mongoose.model("User",userSchema);

export default userModel;