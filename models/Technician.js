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
    idNumber: { type: Number },
    province: {
      type: String,
    },
    district: {
      type: String,
    },
    type: {
      type: String,
    },
    level: {
      type: String,
    },
    cv: {
      type: String,
    },
    passport: {
      type: String,
    },
    diploma: {
      type: String,
    },
    workedOnImage: {
      type: String,
    },
    amount: {
      type: { Number },
    },
  },
  { timestamps: true }
);

export default mongoose.model("technicians", TechnicianSchema);
