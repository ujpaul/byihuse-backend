const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const messageSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    subject: String,
    message: String,
    read: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});

export default mongoose.model("message", messageSchema);