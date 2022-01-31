const mongoose = require("mongoose");

const LawyersSchema = new mongoose.Schema(
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
    document: {
      type: String,
    },
    picture: {
      type: String,
    },
    amount: {
      type: { Number },
    },
  },
  { timestamps: true }
);

export default mongoose.model("lawyers", LawyersSchema);
