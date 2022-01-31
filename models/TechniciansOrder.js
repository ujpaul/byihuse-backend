const mongoose = require("mongoose");

const TechnicianSchema = new mongoose.Schema(
  {
    names: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: { type: String },
    experience: {
      type: String,
    },
    details: {
      type: String,
    },
    type: {
      type: String,
    },
    workPlace: {
      type: String,
    },
    amount: {
      type: { Number },
    },
    paymentStatus: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("techniciansOrder", TechnicianSchema);
