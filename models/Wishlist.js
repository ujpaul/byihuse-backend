const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const wishlistSchema = new mongoose.Schema({
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
            }
        }
    ]
}, {timestamps: true});

export default mongoose.model("wishlist", wishlistSchema);