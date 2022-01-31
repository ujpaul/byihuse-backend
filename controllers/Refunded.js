import Refunded from '../repos/Refunded';
import Response from '../utils/Responses';
exports.getAllRefunded = async (req, res) => {
	try {
		const results = await Refunded.getAllRefunded();
		Response.Success(res, 200, 'queried successfully', results);
	} catch (err) {
		console.log(err);
		Response.InternalServerError(res, 'We are having issues! please try again soon');
	}
};
