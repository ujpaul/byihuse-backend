import Rental from "../controllers/Rental";
import express from "express";
import passport from "passport";
import "../middleware/auth";
import uploader from "../utils/uploader";
const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  uploader.fields([
    { name: "picture1" },
    { name: "picture2" },
    { name: "picture3" },
    { name: "picture4" },
  ]),
  Rental.create
);
router.post(
  "/customer-property",
  uploader.fields([
    { name: "picture1" },
    { name: "picture2" },
    { name: "picture3" },
    { name: "picture4" },
    { name: "picture5" },
    { name: "picture6" },
  ]),
  Rental.createCustomerProperty
);
router.post("/verify", Rental.verifyMoMoPayment);
router.put(
  "/:rentalId",
  passport.authenticate("jwt", { session: false }),
  Rental.update
);
// router.get('/:rentalId', Rental.getRentalDetails);
router.get("/", Rental.getAll);
router.post("/category", Rental.getAllByCategory);
router.post("/house/category", Rental.getHouseByCategory);
router.get("/check", async (req, res) => {
  res.send("Just checking");
});
module.exports = router;
