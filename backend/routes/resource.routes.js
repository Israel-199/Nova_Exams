const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resource.controller");
const upload = require("../middleware/upload");

// Public routes
router.get("/", resourceController.getResources);
router.get("/:id", resourceController.getResource);

router.post(
  "/",
  upload.fields([{ name: "pdfFile" }, { name: "videoFile" }]),
  resourceController.createResource
);

router.patch(
  "/:id",
  upload.fields([{ name: "pdfFile" }, { name: "videoFile" }]),
  resourceController.updateResource
);


router.delete("/:id", resourceController.deleteResource);

module.exports = router;
