import Department from "../controllers/Department";

import Sold from "../models/CustomerRefund";
import express from "express";
import passport from "passport";
import "../middleware/auth";
const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  Department.create
);
router.put(
  "/:departmentId",
  passport.authenticate("jwt", { session: false }),
  Department.update
);
router.get("/", Department.getAllDepartments);
router.get("/:departmentId/categories", Department.getDepartmentCategories);
router.get("/all-data", Department.getAllData);
module.exports = router;
