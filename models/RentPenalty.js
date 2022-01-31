const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const rentPenaltySchema = new mongoose.Schema(
  {
    pickTime: { type: String },
    returnTime: { type: String },
    rental: { type: ObjectId, ref: "rental" },
    penalty: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("rentPenalty", rentPenaltySchema);
