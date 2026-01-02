const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resource.controller");

// Create resource (PDF or Video)
router.post("/", resourceController.createResource);

// Get all resources
router.get("/", resourceController.getResources);

// Get single resource
router.get("/:id", resourceController.getResource);

// Update resource
router.patch("/:id", resourceController.updateResource);

// Delete resource
router.delete("/:id", resourceController.deleteResource);

module.exports = router;
