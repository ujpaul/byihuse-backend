const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
    },
    password: String,
    role: {
      type: String,
      enum: ["SUPER-ADMIN", "DEPARTMENT-ADMIN", "CASHIER", "AGENT", "CLIENT"],
    },
    agentType: String,
    assignedDepartments: [
      {
        type: ObjectId,
        ref: "department",
      },
    ],
    isVerfied: {
      type: Boolean,
      default: false,
    },
    agentData: {
      businessAddress: {
        type: String,
      },
      tin: {
        type: String,
      },
      ipatante: {
        type: String,
      },
      phone: {
        type: String,
      },
      amountPaid: {
        type: String,
      },
      type: {
        type: String,
      },
      approved: {
        type: Boolean,
        default: false,
      },
      code: {
        type: String,
      },
      balance: {
        type: Number,
        default: 0,
      },
      paymentLogs: [
        {
          paymentMethod: {
            type: String,
            enum: ["MOMO", "CASH"],
          },
          paidBy: String,
          amount: Number,
          time: {
            type: Date,
            default: Date.now,
          },
          balance: Number,
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);
