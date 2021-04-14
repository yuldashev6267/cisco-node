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
router.get(
  "/find-shop/:id",
  authController.protectTo,
  authController.adminPanelRole("admin"),
  shopsController.getShopById
);
router.post(
  "/add-point-of-sales",
  authController.protectTo,
  authController.adminPanelRole("admin"),
  imageController.uploadUserPhoto,
  imageController.resizeUserPhoto,
  shopsController.createShops
);

router.patch(
  "/update-shop/:id",
  authController.protectTo,
  authController.adminPanelRole("admin"),
  imageController.uploadUserPhoto,
  imageController.resizeUserPhoto,
  shopsController.updateShops
);

module.exports = router;
