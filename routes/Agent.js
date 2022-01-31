import Agent from "../controllers/Agent";
import express from "express";
// import passport from "passport";
import uploader from "../utils/uploader";
import "../middleware/auth";
const router = express.Router();

router.post("/register", uploader.single("ipatante"), Agent.register);
router.post("/verify", Agent.verifyMoMoPayment);
router.get("/balance/:id", Agent.getAgentBalance);
module.exports = router;
