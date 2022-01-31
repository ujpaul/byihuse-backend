import Product from '../controllers/Product';
import express from 'express';
import passport from 'passport';
import '../middleware/auth';
import uploader from '../utils/uploader';
const router = express.Router();

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	uploader.fields([ { name: 'picture1' }, { name: 'picture2' }, { name: 'picture3' }, { name: 'picture4' } ]),
	Product.create
);
router.put('/:productId', passport.authenticate('jwt', { session: false }), Product.update);
router.get('/search/:keyword', Product.searchProducts);
router.get('/:productId', Product.getProductDetails);
router.delete('/:productId', Product.deleteProduct);
router.get('/', Product.getAll);
module.exports = router;
