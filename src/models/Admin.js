import mongoose from "mongoose";

const adminSchema=new mongoose.Schema({

      firstName: { type: String, required: true },
  lastName: { type: String, required: true },

  email: { type: String, unique: true },
  password: { type: String },
})



const adminModel=mongoose.model("Admin",adminSchema);

export default adminModel;
