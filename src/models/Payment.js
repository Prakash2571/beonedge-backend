import mongoose from "mongoose";



const paymentSchema = new mongoose.Schema({
  sipId: { type: mongoose.Schema.Types.ObjectId, ref: "SIP", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  monthsCovered: { type: Number, required: true }, 
  amount: { type: Number, required: true },        

  date: { type: Date, default: Date.now },        
  mode: { type: String, enum: ["UPI", "Cash", "Bank"], default: "UPI" },

  status: { 
    type: String, 
    enum: ["Pending", "Approved", "Flagged", "Declined"], 
    default: "Pending" 
  }
}, { timestamps: true });


const paymentModel=mongoose.model("Payment",paymentSchema);

export default  paymentModel;