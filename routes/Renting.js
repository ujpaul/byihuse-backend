import express from "express";
import Rent from "../controllers/Renting";
import passport from "passport";
import "../middleware/auth";
import uploader from "../utils/uploader";
const router = express.Router();
router.get(
  "/orders",
  passport.authenticate("jwt", { session: false }),
  Rent.getAllRentalOrders
);
router.get("/", Rent.getAll);
router.get("/:id", Rent.getRentalById);
router.get("/rent-and-return-car/:id", Rent.getRentAndReturnCar);
router.post("/category", Rent.getRentalByCategory);
router.post(
  "/order",
  uploader.fields([
    { name: "contract" },
    { name: "idCard" },
    { name: "licence" },
  ]),
  Rent.rentalOrder
);
router.put("/rent-and-return-car", Rent.rentAndReturnCar);
router.post(
  "/rent-order",
  uploader.fields([
    { name: "contract" },
    { name: "idCard" },
    { name: "driverId" },
    { name: "driverLicence" },
  ]),
  Rent.rentOrder
);
router.post("/verify", Rent.verifyMoMoPayment);
module.exports = router;
