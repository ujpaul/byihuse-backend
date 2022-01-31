const mongoose = require("mongoose");

const housingSchema = new mongoose.Schema(
  {
    names: {
      type: String,
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,
    },
    totalPaid: {
      type: Number,
    },
    paymentStatus: {
      type: String,
    },
    type: {
      type: String,
    },
    trackNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("housing", housingSchema);
