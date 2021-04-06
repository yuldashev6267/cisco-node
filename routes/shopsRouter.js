const express = require("express");
const router = express.Router();
const shopsController = require("../controller/shopsController");
const imageController = require("../controller/imageController");
const authController = require("../controller/authController");
router.get("/get-all-shops", shopsController.getAllShops);
router.use(authController.protectTo, authController.adminPanelRole("admin"));
router.delete("/delete-shop/:id", shopsController.deleteShop);
router.use(imageController.uploadUserPhoto, imageController.resizeUserPhoto);
router.post("/add-point-of-sales", shopsController.createShops);

router.patch("/update-shop/:id", shopsController.updateShops);

module.exports = router;
