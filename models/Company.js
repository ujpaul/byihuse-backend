const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const companySchema = new mongoose.Schema(
  {
    name: String,
    logo: String,
    paymentMethod: {
      type: String,
    },
    products: [
      {
        type: ObjectId,
        ref: "product",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("company", companySchema);
