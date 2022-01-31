const mongoose = require("mongoose");

const TechniciansSchema = new mongoose.Schema(
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
    totalAmount: {
      type: Number,
    },
    paymentLogs: [
      {
        amount: Number,
        time: {
          type: Date,
          default: Date.now,
        },
        method: {
          type: String,
          enum: ["MOMO", "CASH"],
        },
        receivedBy: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("technicianRequest", TechniciansSchema);
