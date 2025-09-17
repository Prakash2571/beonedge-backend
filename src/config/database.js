import mongoose from "mongoose";

const connectDB = async ()   => {
   
       await mongoose.connect("mongodb+srv://beonedge38_db_user:Beonedge%40123@beonedge.igentcf.mongodb.net/Statup?retryWrites=true&w=majority");
   
   
     
    
};

export default connectDB;
