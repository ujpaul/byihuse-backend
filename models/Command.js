const mongoose = require("mongoose");

const CommandSchema = new mongoose.Schema(
  {
    names: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: { type: String },
    product: { type: String },
    details: {
      type: String,
    },
    amount: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("command", CommandSchema);
