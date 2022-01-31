import Cart from '../models/Cart';

exports.updateCart = async (cart) => {
    try {
        //updating existing cart
        if (cart._id !== null) {
            return await Cart.findByIdAndUpdate({
                    _id: cart._id
                }, {
                    products: cart.products
                },
                (err, success) => {
                    if (err) {
                        console.log(err);
                        return false;
                    }
                    return success;
                }
            );
        }
        //creating new cart
        return await Cart.create({
            userId: cart.userId,
            products: cart.products
        })

    } catch (err) {
        throw err;
    }
};

exports.getUserCart = async (userId) => {
    try {
        return await Cart.findOne({
                userId: userId
            })
            .populate('products')
            .exec()
            .then(res => {
                return res;
            })
            .catch(err => {
                return err;
            })


    } catch (error) {
        throw error;
    }
}