import SoldProducts from '../controllers/SoldProducts';
import express from 'express';
import passport from 'passport';
import '../middleware/auth';
const router = express.Router();
router.get('/', passport.authenticate('jwt', { session: false }), SoldProducts.getAllSoldProducts);
module.exports = router;
