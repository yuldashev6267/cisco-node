const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
router.post("/create-admin", authController.createAdmin);
router.post("/login-admin", authController.login);
module.exports = router;
