import Refunded from '../models/Refunded';
exports.getAllRefunded = async (req, res) => {
	try {
		const refunded = await Refunded.find();
		console.log(refunded);
		return refunded;
	} catch (err) {
		throw err;
	}
};
