const express = require("express");
const router = express.Router();
const shopsController = require("../controller/shopsController");
const imageController = require("../controller/imageController");
const authController = require("../controller/authController");
router.get("/get-all-shops", shopsController.getAllShops);
router.delete(
  "/delete-shop/:id",
  authController.protectTo,
  shopsController.deleteShop
);
router.post(
  "/add-point-of-sales",
  authController.protectTo,
  imageController.uploadUserPhoto,
  imageController.resizeUserPhoto,
  shopsController.createShops
);
// , authController.adminPanelRole("admin")
router.patch(
  "/update-shop/:id",
  authController.protectTo,
  shopsController.updateShops
);

module.exports = router;
