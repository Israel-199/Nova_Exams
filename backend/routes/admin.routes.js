const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const authenticateAdmin = require("../middlewares/authAdmin");

// Public route
router.post("/login", adminController.loginAdmin);

// Protected routes
router.get("/profile", authenticateAdmin, adminController.getProfile);
router.patch("/update-profile", authenticateAdmin, adminController.updateProfile);
router.patch("/change-password", authenticateAdmin, adminController.changePassword);

module.exports = router;
