import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  password: { type: String },

  status: { 
    type: String, 
    enum: ["Pending", "Approved", "Rejected"], 
    default: "Pending" 
  },

 
  sips: [{ type: mongoose.Schema.Types.ObjectId, ref: "SIP" }]
}, { timestamps: true });





const userModel=mongoose.model("User",userSchema);

export default userModel;