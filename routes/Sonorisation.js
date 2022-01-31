import Sonorisation from "../controllers/Sonorisation";
import express from "express";
import passport from "passport";
import uploader from "../utils/uploader";
import "../middleware/auth";
const router = express.Router();

router.post("/order", uploader.single("idCard"), Sonorisation.rentalOrder);
router.post("/verify", Sonorisation.verifyMoMoPayment);
router.get(
  "/orders",
  passport.authenticate("jwt", { session: false }),
  Sonorisation.getSonorisationRentOrders
);
module.exports = router;
