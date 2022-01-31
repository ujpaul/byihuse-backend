import ServiceOrder from '../controllers/ServiceOrder';
import express from 'express';
import passport from 'passport';
import '../middleware/auth';
const router = express.Router();

router.post('/', ServiceOrder.addServiceOrder);
router.put('/:orderId', passport.authenticate("jwt", { session : false }), ServiceOrder.updateStatus);
router.put('/:orderId/expected-amount', passport.authenticate("jwt", { session : false }), ServiceOrder.updateExpectedAmount);
router.put('/:orderId/paid-cash', passport.authenticate("jwt", { session : false }),  ServiceOrder.paidCash);
router.get('/', passport.authenticate("jwt", { session : false }), ServiceOrder.getAll);
router.get('/', passport.authenticate("jwt", { session : false }), ServiceOrder.getMyOrders);
module.exports = router;