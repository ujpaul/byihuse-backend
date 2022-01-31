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
    operatorNames: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("confirmedReceivedCommand", CommandSchema);
