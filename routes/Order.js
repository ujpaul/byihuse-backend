import Order from "../controllers/Order";
import express from "express";
import passport from "passport";
import "../middleware/auth";
const router = express.Router();

router.post("/", Order.addOrder);
// router.post('/sold-products', Order.saveSoldProducts);
router.put(
  "/:orderId",
  passport.authenticate("jwt", { session: false }),
  Order.updateStatus
);
router.put(
  "/:orderId/paid-cash",
  passport.authenticate("jwt", { session: false }),
  Order.paidCash
);
router.post("/payments/verify", Order.verifyMoMoPayment);
router.post("/payments/card", Order.chargeCard);
router.get(
  "/my-orders",
  passport.authenticate("jwt", { session: false }),
  Order.getMyOrders
);
router.get("/customer/refund/:customerId", Order.getAllCustomerRefund);
router.get("/", passport.authenticate("jwt", { session: false }), Order.getAll);
module.exports = router;
