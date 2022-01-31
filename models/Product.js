const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const productSchema = new mongoose.Schema(
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
    isMadeInRwanda: { type: Boolean },
    vat: { type: Boolean },
    price: {
      type: Number,
    },
    cost: {
      type: Number,
    },
    pictures: {
      pic1: String,
      pic2: String,
      pic3: String,
      pic4: String,
    },
    additionalServices: [
      {
        name: String,
        price: Number,
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    paymentMethod: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("product", productSchema);
