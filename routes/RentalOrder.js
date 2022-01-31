import RentalOrder from '../controllers/RentalOrder';
import express from 'express';
import passport from 'passport';
import '../middleware/auth';
const router = express.Router();

router.post('/', RentalOrder.addOrder);
router.put('/:orderId/returned', passport.authenticate("jwt", { session : false }),  RentalOrder.returned);
router.put('/:orderId', passport.authenticate("jwt", { session : false }), RentalOrder.updateStatus);
router.put('/:orderId/paid-cash', passport.authenticate("jwt", { session : false }),  RentalOrder.paidCash);
router.get('/my-orders', passport.authenticate("jwt", { session : false }), RentalOrder.getMyOrders);
router.get('/', passport.authenticate("jwt", { session : false }), RentalOrder.getAllOrders);
module.exports = router;