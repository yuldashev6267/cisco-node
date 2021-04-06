const express = require("express");
const router = express.Router();
const useReqController = require("../controller/userReqController");
const authController = require("../controller/authController");

router.post("/add-request", useReqController.addRequest);
router.use(authController.protectTo, authController.adminPanelRole("admin"));
router.get("/all-requests", useReqController.getAllRequests);
router.delete("/all-requests", useReqController.deleteAllRequests);
module.exports = router;
