import Wishlist from '../models/Wishlist';

exports.updateWishlist = async (wishlist) => {
    try {
        //updating existing wishlist
        if (wishlist._id !== null) {
            return await Wishlist.findByIdAndUpdate({
                    _id: wishlist._id
                }, {
                    products: wishlist.products
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
        //creating new wishlist
        return await Wishlist.create({
            userId: wishlist.userId,
            products: wishlist.products
        })

    } catch (err) {
        throw err;
    }
};

exports.getUserWishlist = async (userId) => {
    try {
        return await Wishlist.findOne({
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