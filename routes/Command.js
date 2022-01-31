import Command from "../controllers/Command";
import CommandOrder from "../controllers/CommandOrder";
import express from "express";
import passport from "passport";
import uploader from "../utils/uploader";
import "../middleware/auth";
const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  Command.getCommand
);
router.get(
  "/approved",
  passport.authenticate("jwt", { session: false }),
  Command.getApprovedCommand
);
router.post("/approved-for-client", Command.getApprovedCommandForClient);
router.post(
  "/assign-commande",
  passport.authenticate("jwt", { session: false }),
  uploader.fields([
    { name: "picture1" },
    { name: "picture2" },
    { name: "picture3" },
    { name: "picture4" },
  ]),
  Command.assignCommandToCustomer
);
router.post("/", Command.create);
router.post("/confirmation", Command.confirmedReceivedCommand);
router.post("/order", CommandOrder.commandOrder);
router.post("/payments/verify", CommandOrder.verifyMoMoPayment);
module.exports = router;
