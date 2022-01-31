import tech from "../controllers/Technician";
import express from "express";
import passport from "passport";
import uploader from "../utils/uploader";
import "../middleware/auth";
const router = express.Router();

router.post(
  "/register",
  uploader.fields([
    { name: "passport" },
    { name: "diploma" },
    { name: "cv" },
    { name: "previous" },
  ]),
  tech.lawyersOrder
);
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  tech.getAllTechnicians
);
router.get(
  "/all-orders",
  passport.authenticate("jwt", { session: false }),
  tech.getAllTechniciansOrder
);
router.post("/verify", tech.verifyMoMoPayment);
router.post("/verify-order", tech.verifyTechnicianOrderPayment);
router.post("/request", tech.orderTechnician);
router.get("/:type", tech.getTechnicianByType);
router.get("/technician/:id/", tech.getTechnicianById);
module.exports = router;
