const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const categorySchema = new mongoose.Schema({
    name: {
        en: String,
        fr: String,
        kiny: String,
        sw: String,
        
    },
    department:{
        type: ObjectId,
        ref: 'department'
    },
    products: [
        {
            type: ObjectId,
            ref: 'product'
        }
    ]
}, {timestamps: true});

export default mongoose.model("category", categorySchema);