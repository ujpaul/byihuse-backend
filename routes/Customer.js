import Customer from '../controllers/CustomerRefund';
import express from 'express';
import passport from 'passport';
import '../middleware/auth';
const router = express.Router();
router.get('/', passport.authenticate('jwt', { session: false }), Customer.getAll);
router.get('/:customerId', Customer.getAllCustomerRefund);
// router.get('/refunded-customers', passport.authenticate('jwt', { session: false }), Customer.getAllRefunded);
router.put('/refund-customer/:customerId', passport.authenticate('jwt', { session: false }), Customer.refundCustomer);
module.exports = router;
