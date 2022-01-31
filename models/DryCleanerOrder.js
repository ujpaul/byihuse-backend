const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const DryCleanerOrderSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    streetNumber: String,
    city: String,
    country: String,
    agentCode: String,
    paymentOption: {
      type: String,
      enum: ["MOMO", "CASH", "DEBT"],
    },
    MoMoPhoneNumber: String,
    delivery: Number,
    products: [
      {
        _id: {
          type: ObjectId,
          ref: "DryCleaner",
        },
        productPrice: Number,
        quantity: Number,
      },
    ],
    totalAmmount: {
      type: Number,
    },
    paymentStatus: {
      type: String,
      default: "Not Paid",
    },
    trackNumber: {
      type: String,
      default: "",
    },
    status: {
      status: {
        type: String,
        default: "ORDER SENT",
        enum: [
          "ORDER SENT",
          "RECEIVED",
          "CLOTHES-PICKED",
          "WASHING-START",
          "WASHING COOMPLETED",
          "CANCELED",
          "DELIVERY-START",
          "DELIVERY-RECEIVED",
          "ORDER-SERVED-AND-CLOSED",
        ],
      },
      comment: String,
    },
    totalAmountPaid: {
      type: Number,
      default: 0,
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

export default mongoose.model("DryCleanerOrder", DryCleanerOrderSchema);
