const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const customerCommandSchema = new mongoose.Schema(
  {
    department: {
      type: ObjectId,
      ref: "department",
    },
    category: {
      type: ObjectId,
      ref: "category",
    },
    company: {
      type: ObjectId,
      ref: "company",
    },
    name: {
      en: String,
      fr: String,
      kiny: String,
      sw: String,
    },
    description: {
      en: String,
      fr: String,
      kiny: String,
      sw: String,
    },
    commandOwner: {
      type: String,
    },
    isMadeInRwanda: { type: Boolean },
    vat: { type: Boolean },
    price1: {
      type: Number,
    },
    price2: {
      type: Number,
    },
    price3: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    cost: {
      type: Number,
    },
    status: {
      type: String,
      default: "Not paid",
    },
    totalPaid: {
      type: Number,
      default: 0,
    },
    pictures: {
      pic1: String,
      pic2: String,
      pic3: String,
      pic4: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CustomrCommand", customerCommandSchema);
