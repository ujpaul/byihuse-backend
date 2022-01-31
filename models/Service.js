const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const serviceSchema = new mongoose.Schema(
  {
    department: {
      type: ObjectId,
      ref: "department",
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
    price: {
      type: String,
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

export default mongoose.model("service", serviceSchema);
