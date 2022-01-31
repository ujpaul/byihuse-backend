const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const rentalSchema = new mongoose.Schema(
  {
    department: {
      type: ObjectId,
      ref: "department",
    },
    company: {
      type: ObjectId,
      ref: "company",
    },
    names: String,
    type: String,
    email: String,
    phone: String,
    roadNumber: String,
    gateNumber: String,
    area: String,
    upi: String,
    location: String,
    artistType: String,
    experience: String,
    artistDescription: String,
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
    category: {
      type: String,
    },
    property: {
      type: String,
    },
    available: {
      type: Boolean,
      default: true,
    },
    price: {
      type: String,
    },
    pricePerDay: {
      type: String,
    },
    costPerDay: {
      type: String,
    },
    costPerHour: {
      type: String,
    },
    pictures: {
      pic1: String,
      pic2: String,
      pic3: String,
      pic4: String,
      pic5: String,
      pic6: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    amount: String,
    paymentStatus: String,
  },
  { timestamps: true }
);

export default mongoose.model("rental", rentalSchema);
