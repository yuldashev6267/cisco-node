const express = require("express");
const router = express.Router();
const useReqController = require("../controller/userReqController");
const authController = require("../controller/authController");

router.post("/add-request", useReqController.addRequest);
router.get(
  "/all-requests",
  authController.protectTo,
  authController.adminPanelRole("admin"),
  useReqController.getAllRequests
);
router.delete(
  "/all-requests",
  authController.protectTo,
  authController.adminPanelRole("admin"),
  useReqController.deleteAllRequests
);
module.exports = router;
