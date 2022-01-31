import Category from '../controllers/Category';
import express from 'express';
import passport from 'passport';
import '../middleware/auth';
const router = express.Router();

router.post('/', passport.authenticate("jwt", { session : false }), Category.create);
router.put('/:categoryId', passport.authenticate("jwt", { session : false }), Category.update);
router.get('/', Category.getAllCategories);
router.get('/:categoryId/products', Category.getCategoryProducts);

module.exports = router;