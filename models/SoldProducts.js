const mongoose = require("mongoose");
const soldProductSchema = new mongoose.Schema(
  {
    customerNames: {
      type: String,
    },
    name: {
      type: String,
    },
    initialCost: {
      type: Number,
    },
    price: {
      type: Number,
    },
    vat: {
      type: Number,
    },
    profit: {
      type: Number,
    },
    taxOverProfit: {
      type: Number,
    },
    profitAfterTax: {
      type: Number,
    },
    customerRefund: {
      type: Number,
    },
    profitNet: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    payment: {
      type: String,
    },
    agentFees: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("soldProducts", soldProductSchema);
