import Cart from '../repos/Cart';
import Response from '../utils/Responses';

exports.updateCart = async (req, res) => {
    try {
        const {
            cart
        } = req.body;
        const results = await Cart.updateCart(cart);
        Response.Success(res, 200, "updated successfully", results);
    } catch (err) {
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
};

exports.getUserCart = async (req, res) => {
    try {
        const {
            userId
        } = req.user;
        const results = await Cart.getUserCart(userId);
        Response.Success(res, 200, "queried successfully", results);

    } catch (err) {
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
}