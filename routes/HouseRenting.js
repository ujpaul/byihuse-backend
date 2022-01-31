import HouseRenting from "../controllers/HouseRenting";
import express from "express";
import passport from "passport";
import uploader from "../utils/uploader";
import "../middleware/auth";
const router = express.Router();

router.post("/order", uploader.single("idCard"), HouseRenting.rentalOrder);
router.post("/verify", HouseRenting.verifyMoMoPayment);
router.get(
  "/orders",
  passport.authenticate("jwt", { session: false }),
  HouseRenting.getHouseRentOrders
);
module.exports = router;
