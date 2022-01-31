import Wishlist from '../controllers/Wishlist';
import express from 'express';
const router = express.Router();

router.post('/', Wishlist.updateWishlist);
router.get('/', Wishlist.getUserWishlist);

module.exports = router;