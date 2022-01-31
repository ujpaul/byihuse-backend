const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const logSchema = new mongoose.Schema({
    userName: String,
    userType: String,
    action: String,
    model: String,
    succeded: Boolean,
}, {timestamps: true});

export default mongoose.model("log", logSchema);