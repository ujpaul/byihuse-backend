const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    streetNumber: String,
    city: String,
    country: String,
    agentCode: String,
    paymentOption: {
        type: String,
        enum: ['MOMO', 'CASH', 'DEBT']
    },
    MoMoPhoneNumber: String,
    delivery: Number,
    products: [{
        _id: {
            type: ObjectId,
            ref: 'product',
        },
        productPrice: Number,
        additionalServices: [{
            name: String,
            price: Number,
        }],
        quantity: Number
    }],
    totalAmmount: {
        type: Number
    },
    status: {
        status: {
            type: String,
            default: 'SENT',
            enum: ['SENT', 'RECEIVED', 'CANCELED','DELIVERY-START','DELIVERY-RECEIVED', 'ORDER-SERVED-AND-CLOSED'],
        },
        comment: String,
    },
    totalAmountPaid: {
        type: Number,
        default: 0
    },
    paymentLogs: [{
        amount: Number,
        time: {
            type: Date,
            default: Date.now
        },
        method: {
            type: String,
            enum: ['MOMO','CASH']
        },
        receivedBy: String,
    }],
    logs: [{
        name: String,
        role: String,
        action: String,
        comment: String,
        status: Boolean,
        time: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});
 
export default mongoose.model("order", orderSchema);