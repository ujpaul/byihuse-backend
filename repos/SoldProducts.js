import SoldProducts from '../models/SoldProducts';
exports.getAllSoldProducts = async (req, res) => {
	try {
		const soldProducts = await SoldProducts.find();
		return soldProducts;
	} catch (err) {
		throw err;
	}
};
