const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const cartSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'user'
    },
    products: [
        {
            type: ObjectId,
            ref: 'product',
            time: {
                type: Date,
                default: Date.now
            },
            quantity: String
        }
    ]
}, {timestamps: true});

export default mongoose.model("cart", cartSchema);