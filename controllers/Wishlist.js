import Wishlist from '../repos/Wishlist';
import Response from '../utils/Responses';

exports.updateWishlist = async (req, res) => {
    try{
        const {wishlist} = req.body;
        const results = await Wishlist.updateWishlist(wishlist);
        Response.Success(res, 200, "updated successfully", results);
    }catch(err){
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
};

exports.getUserWishlist = async (req, res) => {
    try{
        const {userId} = req.user;
        const results = await Wishlist.getUserWishlist(userId);
        Response.Success(res, 200, "queried successfully", results);

    }catch(err){
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
}