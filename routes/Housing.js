import Housing from "../controllers/Housing";
import express from "express";
// import passport from "passport";
import uploader from "../utils/uploader";
import "../middleware/auth";
const router = express.Router();

router.post("/request", uploader.single("contract"), Housing.request);
router.post("/house-request", Housing.payPhases);
router.post("/verify", Housing.verifyMoMoPayment);
router.get("/process/:truckingNumber", Housing.getConstructionProcess);
module.exports = router;
