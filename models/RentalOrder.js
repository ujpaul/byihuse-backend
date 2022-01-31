const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const rentalOrderSchema = new mongoose.Schema(
  {
    rental: {
      type: ObjectId,
      ref: "rental",
    },
    paymentStatus: {
      type: String,
    },
    price: Number,
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    address: String,
    details: String,
    agentCode: String,
    contract: {
      type: String,
    },
    idCard: {
      type: String,
    },
    drivingLicence: {
      type: String,
    },
    driver: [
      {
        firstName: String,
        lastName: String,
        phone: String,
        drivingLicence: String,
        idCard: String,
      },
    ],
    destination: {
      district: String,
      sector: String,
      cell: String,
    },
    type: {
      type: String,
    },
    status: {
      status: {
        type: String,
        default: "SENT",
        enum: ["SENT", "RECEIVED", "CANCELED", "RENTED", "CLOSED"],
      },
      comment: String,
    },
    rentingHours: Number,
    rentOption: String,
    realHours: Number,
    returned: {
      status: {
        type: Boolean,
        default: false,
      },
      date: {
        type: Date,
      },
      comment: String,
    },
    rentingCost: Number,
    additionalCosts: {
      detailedCosts: [
        {
          reason: String,
          cost: Number,
        },
      ],
      total: Number,
    },
    totalAmountExpected: Number,
    totalAmountPaid: Number,
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
    logs: [
      {
        name: String,
        role: String,
        action: String,
        comment: String,
        status: Boolean,
        time: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("rentalOrder", rentalOrderSchema);
