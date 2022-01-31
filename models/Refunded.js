const mongoose = require('mongoose');

const refundedSchema = new mongoose.Schema(
	{
		firstName: {
			type: String
		},
		lastName: {
			type: String
		},
		phone: {
			type: String
		},
		email: {
			type: String
		},
		refunded: {
			type: Number
		}
	},
	{ timestamps: true }
);

export default mongoose.model('refunded', refundedSchema);
