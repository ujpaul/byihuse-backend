import lawyers from "../controllers/Lawyers";
import express from "express";
import passport from "passport";
import uploader from "../utils/uploader";
import "../middleware/auth";
const router = express.Router();

router.post(
  "/register",
  uploader.fields([{ name: "document" }, { name: "image" }]),
  lawyers.lawyersOrder
);
router.post("/verify", lawyers.verifyMoMoPayment);
router.get("/in-district/:keyword/:type", lawyers.getLawyerByDistrict);
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  lawyers.getAllLawyers
);
module.exports = router;
