const express = require("express");
const router = express.Router();
const shopsController = require("../controller/shopsController");
const imageController = require("../controller/imageController");
const authController = require("../controller/authController");

router.post(
  "add-point-of-sales",
  authController.protectTo,
  authController.adminPanelRole,
  imageController.uploadUserPhoto,
  imageController.uploadUserPhoto,
  shopsController.createShops
);

module.exports = router;
