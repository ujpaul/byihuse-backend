const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const departmentSchema = new mongoose.Schema(
  {
    name: {
      en: String,
      fr: String,
      kiny: String,
      sw: String,
    },
    offersServices: Boolean,
    offersRental: Boolean,
    categories: [
      {
        type: ObjectId,
        ref: "category",
      },
    ],
    products: [
      {
        type: ObjectId,
        ref: "product",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("department", departmentSchema);
