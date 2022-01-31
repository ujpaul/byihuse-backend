import send from "../controllers/SendEmail";
import express from "express";
import passport from "passport";
import "../middleware/auth";
const router = express.Router();

router.post(
  "/",
  //   passport.authenticate("jwt", { session: false }),
  send.sendMail
  //   (req, res) => {
  //     res.send("sending email...");
  //   }
);
module.exports = router;
