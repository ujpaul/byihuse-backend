const mongoose = require("mongoose");

const dyrCleanerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("DryCleaner", dyrCleanerSchema);
