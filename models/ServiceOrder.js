const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const serviceOrderSchema = new mongoose.Schema({
    service: {
        type: ObjectId,
        ref: 'service'
    },
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    address: String,
    details: String,
    agentCode: String,
    status: {
        status: {
            type: String,
            default: 'SENT',
            enum: ['SENT', 'RECEIVED', 'CANCELED','TECHNICIAN-ON-THE-WAY', 'TECHNICIAN-AT-SITE', 'JOB-DONE'],
        },
        comment: String,
    },
    expectedAmount: Number,
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
}, {timestamps: true});

export default mongoose.model("serviceOrder", serviceOrderSchema);