import Customer from '../models/CustomerRefund';
import Refunded from '../models/Refunded';
exports.getAll = async (req, res) => {
	try {
		return await Customer.find({ refund: { $gt: 0 } })
			.populate({ path: 'user' })
			.exec()
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err;
			});
	} catch (err) {
		throw err;
	}
};
exports.getCustomerRefund = async (customerId) => {
	try {
		return Customer.find({ user: customerId })
			.populate({ path: 'user' })
			.exec()
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err;
			});
		// return [ ...refunds, grouped, customer ];
	} catch (err) {
		throw err;
	}
};
exports.refundCustomer = async (customerId, firstName, lastName, email, phone, refunded) => {
	try {
		const updated = await Customer.updateMany(
			{
				user: customerId
			},
			{
				$set: {
					refund: 0
				}
			}
		);
		const customerRefunded = new Refunded({
			firstName: firstName,
			lastName: lastName,
			email: email,
			phone: phone,
			refunded: refunded
		});
		customerRefunded.save();
		return updated;
	} catch (err) {
		throw err;
	}
};
