import Cart from '../controllers/Cart';
import express from 'express';
import passport from 'passport';
import '../middleware/auth';
const router = express.Router();

router.post('/', passport.authenticate("jwt", { session : false }), Cart.updateCart);
router.get('/', passport.authenticate("jwt", { session : false }), Cart.getUserCart);

module.exports = router;