const express = require("express");
const router = express.Router();
const useReqController = require("../controller/userReqController");
const authController = require("../controller/authController");

router.post("/add-request", useReqController.addRequest);
router.get(
  "/all-requests",
  authController.protectTo,
  useReqController.getAllRequests
);
router.delete(
  "/all-requests",
  authController.protectTo,
  useReqController.deleteAllRequests
);
module.exports = router;
// , authController.adminPanelRole("admin")
