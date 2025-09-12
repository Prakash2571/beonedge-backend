import mongoose from "mongoose";

const connectDB = async ()   => {
   
       await mongoose.connect("mongodb+srv://beonedge38_db_user:Beonedge%40123@beonedge.igentcf.mongodb.net/Statup?retryWrites=true&w=majority");
    //  "mongodb+srv://Prakash428:Prakash25@poka428.eym5ifu.mongodb.net/DevTinder?retryWrites=true&w=majority&appName=Poka428/DevTinder"
   
     
    
};

export default connectDB;
