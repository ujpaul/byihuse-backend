import SoldProducts from '../repos/SoldProducts';
import Response from '../utils/Responses';
exports.getAllSoldProducts = async (req, res) => {
	try {
		const results = await SoldProducts.getAllSoldProducts();
		Response.Success(res, 200, 'queried successfully', results);
	} catch (err) {
		console.log(err);
		Response.InternalServerError(res, 'We are having issues! please try again soon');
	}
};
