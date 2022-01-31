import Decoration from "../controllers/DecorationRenting";
import express from "express";
import passport from "passport";
import uploader from "../utils/uploader";
import "../middleware/auth";
const router = express.Router();

router.post("/order", uploader.single("idCard"), Decoration.rentalOrder);
router.post("/verify", Decoration.verifyMoMoPayment);
router.get(
  "/orders",
  passport.authenticate("jwt", { session: false }),
  Decoration.getDecorationRentOrders
);
module.exports = router;
