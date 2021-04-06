const express = require("express");
const router = express.Router();
const shopsController = require("../controller/shopsController");
const imageController = require("../controller/imageController");
const authController = require("../controller/authController");

router.post(
  "/add-point-of-sales",
  authController.protectTo,
  authController.adminPanelRole("admin"),
  imageController.uploadUserPhoto,
  imageController.resizeUserPhoto,
  shopsController.createShops
);

router.get("/get-all-shops", shopsController.getAllShops);

router.patch(
  "/update-shop/:id",
  authController.protectTo,
  authController.adminPanelRole("admin"),
  shopsController.updateShops
);

router.delete(
  "/delete-shop/:id",
  authController.protectTo,
  authController.adminPanelRole("admin"),
  shopsController.deleteShop
);

module.exports = router;
