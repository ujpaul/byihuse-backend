const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const customerSchema = new mongoose.Schema(
	{
		refund: {
			type: Number
		},
		user: {
			type: ObjectId,
			ref: 'user'
		},
		phone: {
			type: String
		},
		email: {
			type: String
		}
	},
	{ timestamps: true }
);

export default mongoose.model('customerRefund', customerSchema);
