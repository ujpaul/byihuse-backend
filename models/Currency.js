const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const currencySchema = new mongoose.Schema({
    name: String,
    symbol: String,
    currentValue: Number,
    logs: [{
        name: String,
        role: String,
        updatedAmount: Number,
        time: {
            type: Date,
            default: Date.now
        }
    }],
}, {timestamps: true});

export default mongoose.model("currency", currencySchema);