import Customer from '../repos/CustomerRefund';
import Response from '../utils/Responses';
exports.getAll = async (req, res) => {
	try {
		const results = await Customer.getAll();
		Response.Success(res, 200, 'queried successfully', results);
	} catch (err) {
		console.log(err);
		Response.InternalServerError(res, 'We are having issues! please try again soon');
	}
};
exports.getAllCustomerRefund = async (req, res) => {
	try {
		const results = await Customer.getCustomerRefund(req.params.customerId);
		Response.Success(res, 200, 'queried successfully', results);
	} catch (err) {
		console.log(err);
		Response.InternalServerError(res, 'We are having issues! please try again soon');
	}
};
exports.refundCustomer = async (req, res) => {
	const { firstName, lastName, email, phone, refunded } = req.body;
	try {
		const results = await Customer.refundCustomer(
			req.params.customerId,
			firstName,
			lastName,
			email,
			phone,
			refunded
		);
		Response.Success(res, 200, 'Money refunded successfully', results);
	} catch (err) {
		console.log(err);
		Response.InternalServerError(res, 'We are having issues! please try again soon');
	}
};
