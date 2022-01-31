import Product from '../models/Product';
exports.getAllMadeInRwandaProducts = async () => {
	try {
		return await Product.find({ isMadeInRwanda: true })
			.populate('department', 'name')
			.populate('category', 'name')
			.populate('company')
			.exec()
			.then((res) => {
				return res;
			});
	} catch (error) {
		throw error;
	}
};
