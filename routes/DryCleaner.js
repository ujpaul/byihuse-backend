import DryCleaner from "../controllers/DryCleaner";
import express from "express";
import passport from "passport";
import "../middleware/auth";
const router = express.Router();
router.post(
  "/add-service",
  passport.authenticate("jwt", { session: false }),
  DryCleaner.create
);
router.get(
  "/all-orders",
  passport.authenticate("jwt", { session: false }),
  DryCleaner.getAllOrders
);
router.put(
  "/update-status",
  passport.authenticate("jwt", { session: false }),
  DryCleaner.updateStatus
);
router.get("/services/:type", DryCleaner.getServiceByType);
router.get("/all-services", DryCleaner.getAllServices);
router.post("/make-order", DryCleaner.Order);
router.post("/verify-order", DryCleaner.verifyMoMoPayment);
router.get("/customer-order/:trackNumber", DryCleaner.getCustomerOrder);
module.exports = router;
