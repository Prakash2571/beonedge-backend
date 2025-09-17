import mongoose from "mongoose";


const sipSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  totalMonths: { type: Number, required: true }, 
  amountPerMonth: { type: Number, required: true }, 

  monthsPaid: { type: Number, default: 0 },
  monthsLeft: { type: Number },  
  totalPaid: { type: Number, default: 0 },

  startDate: { type: Date },
  firstPaymentDate: { type: Date },
  maturityDate: { type: Date },
  skippedMonths: { type: Number, default: 0 },

  status: { 
    type: String, 
    enum: ["NotStarted", "Active", "Completed", "Cancelled"], 
    default: "NotStarted" 
  }
}, { timestamps: true });


const sipModel=mongoose.model("SIP",sipSchema);

export default sipModel;