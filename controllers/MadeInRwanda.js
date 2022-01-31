import Product from '../repos/MadeInRwanda';
import Response from '../utils/Responses';
exports.getAllMadeInRwandaProducts = async (req, res) => {
	try {
		const results = await Product.getAllMadeInRwandaProducts();
		Response.Success(res, 200, 'queried successfully', results);
	} catch (err) {
		console.log(err);
		Response.InternalServerError(res, 'We are having issues! please try again soon');
	}
};
