const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonial.controller");
const upload = require("../middleware/upload");

router.post(
  "/",
  upload.single("image"), 
  testimonialController.createTestimonial
);

router.patch(
  "/:id",
  upload.single("image"), 
  testimonialController.updateTestimonial
);

router.get("/", testimonialController.getTestimonials);  
router.get("/:id", testimonialController.getTestimonial);
router.delete("/:id", testimonialController.deleteTestimonial);

module.exports = router;
