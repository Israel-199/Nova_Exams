const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resource.controller");
const upload = require("../middleware/upload");

// Public routes
router.get("/", resourceController.getResources);
router.get("/:id", resourceController.getResource);

// Admin-only routes
router.post(
  "/",
  upload.single("file"), 
  resourceController.createResource
);

router.patch(
  "/:id",
  upload.single("file"),
  resourceController.updateResource
);

router.delete("/:id", resourceController.deleteResource);

module.exports = router;
